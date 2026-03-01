const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Play slot machine
router.post('/slots', async (req, res) => {
  try {
    const { userId, betAmount } = req.body;
    
    if (!userId || !betAmount) {
      return res.status(400).json({ error: 'Missing userId or betAmount' });
    }

    // Random result (1 = win, 0 = lose)
    const isWin = Math.random() > 0.5;
    const winnings = isWin ? betAmount * 2 : 0;
    const result = isWin ? 'win' : 'lose';
    
    // Update user chips
    await pool.query(
      'UPDATE users SET chips = chips - $1 + $2 WHERE id = $3',
      [betAmount, winnings, userId]
    );
    
    // Record game
    await pool.query(
      'INSERT INTO games (user_id, game_type, bet_amount, result, winnings) VALUES ($1, $2, $3, $4, $5)',
      [userId, 'slots', betAmount, result, winnings]
    );
    
    res.json({ result, winnings, betAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Play blackjack (basic)
router.post('/blackjack', async (req, res) => {
  try {
    const { userId, betAmount } = req.body;
    
    if (!userId || !betAmount) {
      return res.status(400).json({ error: 'Missing userId or betAmount' });
    }

    // Simple blackjack logic
    const isWin = Math.random() > 0.45;
    const winnings = isWin ? betAmount * 1.5 : 0;
    const result = isWin ? 'win' : 'lose';
    
    await pool.query(
      'UPDATE users SET chips = chips - $1 + $2 WHERE id = $3',
      [betAmount, winnings, userId]
    );
    
    await pool.query(
      'INSERT INTO games (user_id, game_type, bet_amount, result, winnings) VALUES ($1, $2, $3, $4, $5)',
      [userId, 'blackjack', betAmount, result, winnings]
    );
    
    res.json({ result, winnings, betAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get game history
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM games WHERE user_id = $1 ORDER BY played_at DESC LIMIT 50',
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;