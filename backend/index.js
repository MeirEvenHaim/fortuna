import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fortuna_super_secret_key_123';

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
// Using pool instead of single connection for better reliability
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'fortuna_user',
  password: process.env.DB_PASSWORD || 'fortunapassword',
  database: process.env.DB_NAME || 'fortuna_orders',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Use the promise wrapper for simpler async/await query handling
const db = pool.promise();

// Initialize tables
async function initializeTables() {
    try {
        await db.query(`
          CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            city VARCHAR(255),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        await db.query(`
          CREATE TABLE IF NOT EXISTS customers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR(255),
            phone VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            city VARCHAR(255),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        await db.query(`
          CREATE TABLE IF NOT EXISTS comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            entityType VARCHAR(50) NOT NULL,
            entityId INT NOT NULL,
            text TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        await db.query(`
          CREATE TABLE IF NOT EXISTS feedbacks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            rating INT NOT NULL,
            favoriteStage VARCHAR(255),
            favoriteCard VARCHAR(255),
            lessConnected TEXT,
            wouldRecommend ENUM('yes', 'no', ''),
            message TEXT,
            name VARCHAR(255),
            phone VARCHAR(255),
            email VARCHAR(255),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        await db.query(`
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            role ENUM('user', 'admin') DEFAULT 'user',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        await db.query(`
          CREATE TABLE IF NOT EXISTS courses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            thumbnailUrl VARCHAR(500),
            videoUrl VARCHAR(500),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        await db.query(`
          CREATE TABLE IF NOT EXISTS user_courses (
            userId INT NOT NULL,
            courseId INT NOT NULL,
            purchasedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (userId, courseId),
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
          )
        `);

        await db.query(`
          CREATE TABLE IF NOT EXISTS community_posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            authorAlias VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            upvotes INT DEFAULT 0,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        await db.query(`
          CREATE TABLE IF NOT EXISTS community_comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            postId INT NOT NULL,
            authorAlias VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (postId) REFERENCES community_posts(id) ON DELETE CASCADE
          )
        `);

        await db.query(`
          CREATE TABLE IF NOT EXISTS payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            currency VARCHAR(10) DEFAULT 'ILS',
            provider VARCHAR(50) NOT NULL,
            status VARCHAR(50) DEFAULT 'completed',
            transactionRef VARCHAR(255),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
          )
        `);

        console.log('Database tables initialized successfully in MySQL.');
    } catch (err) {
        console.error('Error initializing tables:', err);
    }
}

// Call the initialization function
initializeTables();

// Routes
// --- Orders ---
app.post('/api/orders', async (req, res) => {
    try {
        const { firstName, phone, email, city } = req.body;

        if (!firstName || !phone || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const query = 'INSERT INTO orders (firstName, phone, email, city) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [firstName, phone, email, city || null]);

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            orderId: result.insertId
        });
    } catch (error) {
        console.error('Error in order route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM orders ORDER BY createdAt DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, phone, email, city } = req.body;

        if (!firstName || !phone || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const query = 'UPDATE orders SET firstName = ?, phone = ?, email = ?, city = ? WHERE id = ?';
        const [result] = await db.query(query, [firstName, phone, email, city || null, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({
            success: true,
            message: 'Order updated successfully'
        });
    } catch (error) {
         console.error('Error in order update:', error);
         res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM orders WHERE id = ?';
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (error) {
         console.error('Error in order deletion:', error);
         res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Customers ---
app.post('/api/customers', async (req, res) => {
    try {
        const { firstName, lastName, phone, email, city } = req.body;

        if (!firstName || !email) {
            return res.status(400).json({ error: 'First name and email are required' });
        }

        const query = 'INSERT INTO customers (firstName, lastName, phone, email, city) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [firstName, lastName || null, phone || null, email, city || null]);

        res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            customerId: result.insertId
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        // Error code ER_DUP_ENTRY is specific to MySQL duplicate key violation constraint
        if (error.code === 'ER_DUP_ENTRY') {
             return res.status(409).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/customers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM customers ORDER BY createdAt DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, email, city } = req.body;

        if (!firstName || !email) {
            return res.status(400).json({ error: 'First name and email are required' });
        }

        const query = 'UPDATE customers SET firstName = ?, lastName = ?, phone = ?, email = ?, city = ? WHERE id = ?';
        const [result] = await db.query(query, [firstName, lastName || null, phone || null, email, city || null, id]);

        if (result.affectedRows === 0) {
             return res.status(404).json({ error: 'Customer not found' });
        }

        res.json({
            success: true,
            message: 'Customer updated successfully'
        });
    } catch (error) {
         console.error('Error in customer update:', error);
         if (error.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({ error: 'Email already exists' });
         }
         res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM customers WHERE id = ?';
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
             return res.status(404).json({ error: 'Customer not found' });
        }

        res.json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
         console.error('Error in customer deletion:', error);
         res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Comments ---
app.post('/api/comments', async (req, res) => {
    try {
        const { entityType, entityId, text } = req.body;

        if (!entityType || !text) {
            return res.status(400).json({ error: 'Invalid or missing required fields' });
        }

        const query = 'INSERT INTO comments (entityType, entityId, text) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [entityType, entityId !== undefined ? entityId : 0, text]);

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            commentId: result.insertId
        });
    } catch (error) {
        console.error('Error in comment creation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/comments', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM comments ORDER BY createdAt DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/comments/:entityType/:entityId', async (req, res) => {
    try {
        const { entityType, entityId } = req.params;

        const query = 'SELECT * FROM comments WHERE entityType = ? AND entityId = ? ORDER BY createdAt DESC';
        const [rows] = await db.query(query, [entityType, entityId]);
        
        res.json(rows);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Comment text is required' });
        }

        const query = 'UPDATE comments SET text = ? WHERE id = ?';
        const [result] = await db.query(query, [text, id]);

        if (result.affectedRows === 0) {
             return res.status(404).json({ error: 'Comment not found' });
        }

        res.json({
            success: true,
            message: 'Comment updated successfully'
        });
    } catch (error) {
         console.error('Error in comment update:', error);
         res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM comments WHERE id = ?';
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
             return res.status(404).json({ error: 'Comment not found' });
        }

        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
         console.error('Error in comment deletion:', error);
         res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Feedbacks ---
app.post('/api/feedbacks', async (req, res) => {
    try {
        const { rating, favoriteStage, favoriteCard, lessConnected, wouldRecommend, message, name, phone, email } = req.body;

        if (rating === undefined || !favoriteStage || !favoriteCard || !wouldRecommend || !message) {
            return res.status(400).json({ error: 'Missing required feedback fields' });
        }

        const query = `
            INSERT INTO feedbacks 
            (rating, favoriteStage, favoriteCard, lessConnected, wouldRecommend, message, name, phone, email) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [rating, favoriteStage, favoriteCard, lessConnected || null, wouldRecommend, message, name || null, phone || null, email || null]);

        res.status(201).json({
            success: true,
            message: 'Feedback submitted successfully',
            feedbackId: result.insertId
        });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/feedbacks', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM feedbacks ORDER BY createdAt DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching feedbacks:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/feedbacks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, favoriteStage, favoriteCard, lessConnected, wouldRecommend, message, name, phone, email } = req.body;

        if (rating === undefined || !favoriteStage || !favoriteCard || !wouldRecommend || !message) {
            return res.status(400).json({ error: 'Missing required feedback fields' });
        }

        const query = `
            UPDATE feedbacks 
            SET rating = ?, favoriteStage = ?, favoriteCard = ?, lessConnected = ?, wouldRecommend = ?, message = ?, name = ?, phone = ?, email = ?
            WHERE id = ?
        `;
        const [result] = await db.query(query, [rating, favoriteStage, favoriteCard, lessConnected || null, wouldRecommend, message, name || null, phone || null, email || null, id]);

        if (result.affectedRows === 0) {
             return res.status(404).json({ error: 'Feedback not found' });
        }

        res.json({
            success: true,
            message: 'Feedback updated successfully'
        });
    } catch (error) {
         console.error('Error in feedback update:', error);
         res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/feedbacks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM feedbacks WHERE id = ?';
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
             return res.status(404).json({ error: 'Feedback not found' });
        }

        res.json({
            success: true,
            message: 'Feedback deleted successfully'
        });
    } catch (error) {
         console.error('Error in feedback deletion:', error);
         res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Authentication & Users ---
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token.' });
        req.user = user;
        next();
    });
}

app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required.' });

        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(409).json({ error: 'Email already exists.' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await db.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        const token = jwt.sign({ id: result.insertId, email, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
        
        res.status(201).json({ success: true, token, user: { id: result.insertId, name, email, role: 'user' } });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });

        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ error: 'Invalid credentials.' });

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials.' });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Courses ---
app.get('/api/courses', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, title, description, price, thumbnailUrl FROM courses ORDER BY createdAt DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Course not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/user/courses', authenticateToken, async (req, res) => {
    try {
        const query = `
            SELECT c.* FROM courses c
            JOIN user_courses uc ON c.id = uc.courseId
            WHERE uc.userId = ?
        `;
        const [rows] = await db.query(query, [req.user.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Community ---
app.get('/api/community/posts', async (req, res) => {
    try {
        const [posts] = await db.query('SELECT * FROM community_posts ORDER BY createdAt DESC');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/community/posts', async (req, res) => {
    try {
        const { authorAlias, content } = req.body;
        if (!authorAlias || !content) return res.status(400).json({ error: 'Alias and content required.' });
        
        const [result] = await db.query('INSERT INTO community_posts (authorAlias, content) VALUES (?, ?)', [authorAlias, content]);
        
        // Fetch the created post to return it
        const [posts] = await db.query('SELECT * FROM community_posts WHERE id = ?', [result.insertId]);
        res.status(201).json({ success: true, post: posts[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/community/posts/:postId/upvote', async (req, res) => {
    try {
        const { postId } = req.params;
        await db.query('UPDATE community_posts SET upvotes = upvotes + 1 WHERE id = ?', [postId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/community/comments', async (req, res) => {
     try {
         const { postId, authorAlias, content } = req.body;
         if (!postId || !authorAlias || !content) return res.status(400).json({ error: 'Post ID, alias, and content required.' });

         const [result] = await db.query('INSERT INTO community_comments (postId, authorAlias, content) VALUES (?, ?, ?)', [postId, authorAlias, content]);
         
         // Fetch the created comment
         const [comments] = await db.query('SELECT * FROM community_comments WHERE id = ?', [result.insertId]);
         res.status(201).json({ success: true, comment: comments[0] });
     } catch (err) {
         res.status(500).json({ error: 'Internal server error' });
     }
});

app.get('/api/community/posts/:postId/comments', async (req, res) => {
     try {
         const { postId } = req.params;
         const [comments] = await db.query('SELECT * FROM community_comments WHERE postId = ? ORDER BY createdAt ASC', [postId]);
         res.json(comments);
     } catch (err) {
         res.status(500).json({ error: 'Internal server error' });
     }
});

// --- Payments (Mock) ---
app.post('/api/payments/checkout', authenticateToken, async (req, res) => {
    try {
        const { amount, currency, provider, courseId } = req.body; 
        
        // 1. Record payment
        const [payment] = await db.query(
            'INSERT INTO payments (userId, amount, currency, provider, transactionRef) VALUES (?, ?, ?, ?, ?)',
            [req.user.id, amount, currency || 'ILS', provider, 'MOCK_TX_' + Date.now()]
        );

        // 2. Grant access to course
        if (courseId) {
            await db.query('INSERT IGNORE INTO user_courses (userId, courseId) VALUES (?, ?)', [req.user.id, courseId]);
        }

        res.status(201).json({ success: true, paymentId: payment.insertId, transactionRef: 'MOCK_TX_' + Date.now() });
    } catch (err) {
        console.error('Payment error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
