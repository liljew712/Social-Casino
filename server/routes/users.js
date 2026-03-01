const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await pool.query(
      'SELECT id, username, email, chips, created_at FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, chips FROM users ORDER BY chips DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add friend
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    
    const result = await pool.query(
      'INSERT INTO friendships (user_id_1, user_id_2) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
      [Math.min(userId, friendId), Math.max(userId, friendId)]
    );
    
    res.status(201).json({ message: 'Friend added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;