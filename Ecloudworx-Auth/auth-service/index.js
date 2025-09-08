const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 7100;
const JWT_SECRET = 'your_jwt_secret'; // Change for production

app.use(bodyParser.json());
app.use(cors());

// SQLite DB setup
const db = new sqlite3.Database('./users.db');

// Create users table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      is_approved INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Helper to create JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

// Signup endpoint
app.post('/auth/signup', (req, res) => {
  const {name, email, password, role} = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const isApproved = role === 'Expert' ? 0 : 1; // Experts await approval

  db.run('INSERT INTO users (name, email, password, role, is_approved) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashedPassword, role, isApproved], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Email already registered' });
        }
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      return res.status(201).json({ userId: this.lastID, message: 'User registered successfully, awaiting approval if Expert' });
    });
});

// Login endpoint
app.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (user.role === 'Expert' && user.is_approved === 0) {
      return res.status(403).json({ message: 'Expert registration not approved yet' });
    }
    const token = generateToken(user);
    return res.status(200).json({ token, role: user.role });
  });
});

// Token validation endpoint
app.get('/auth/validate', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ valid: false, message: 'Missing auth token' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ valid: false, message: 'Invalid token' });
    return res.status(200).json({ valid: true, userId: decoded.id, role: decoded.role });
  });
});

// Get user profile by id
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT id, name, email, role, is_approved, created_at FROM users WHERE id = ?', [id], (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  });
});

// Update user role (Admin only)
app.put('/users/:id/role', (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  if (!['Admin', 'Expert', 'Reader'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }
  db.run('UPDATE users SET role = ? WHERE id = ?', [role, id], function(err) {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User role updated successfully' });
  });
});

// Approve/Deny Expert registration (Admin only)
app.post('/users/approve-expert', (req, res) => {
  const { userId, approve } = req.body;
  if (typeof approve !== 'boolean') {
    return res.status(400).json({ message: 'Approve must be boolean' });
  }
  db.run('UPDATE users SET is_approved = ? WHERE id = ? AND role = ?', [approve ? 1 : 0, userId, 'Expert'], function(err) {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ message: 'Expert user not found' });
    res.status(200).json({ message: `Expert registration ${approve ? 'approved' : 'denied'}` });
  });
});

// Deactivate user (Admin only)
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deactivated successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Auth & User Management Service listening on port ${PORT}`);
});
