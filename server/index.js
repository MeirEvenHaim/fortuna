import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('orders.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    }
});

// Initialize tables
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Routes
app.post('/api/orders', (req, res) => {
    try {
        const { firstName, phone, email, city } = req.body;

        if (!firstName || !phone || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const query = `
      INSERT INTO orders (firstName, phone, email, city)
      VALUES (?, ?, ?, ?)
    `;

        db.run(query, [firstName, phone, email, city || null], function (err) {
            if (err) {
                console.error('Error creating order:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                orderId: this.lastID
            });
        });

    } catch (error) {
        console.error('Error in order route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
