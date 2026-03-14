import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3000;

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

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
