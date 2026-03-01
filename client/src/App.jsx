import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [chips, setChips] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // Register user
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setChips(response.data.user.chips || 1000);
      setIsRegistering(false);
    } catch (error) {
      alert('Registration failed: ' + error.response?.data?.error);
    }
  };

  // Login user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setChips(response.data.user.chips || 1000);
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.error);
    }
  };

  // Play slots
  const playSlots = async () => {
    if (chips < 10) {
      alert('Not enough chips! Minimum bet is 10 chips.');
      return;
    }
    
    try {
      const response = await axios.post(`${API_URL}/games/slots`, {
        userId: user.id,
        betAmount: 10
      });
      
      setChips(chips - 10 + response.data.winnings);
      alert(`${response.data.result.toUpperCase()}! You won ${response.data.winnings} chips!`);
    } catch (error) {
      alert('Error playing slots: ' + error.message);
    }
  };

  // Get leaderboard
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  if (!user) {
    return (
      <div className="App">
        <div className="auth-container">
          <h1>🎰 Social Casino</h1>
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Have an account? Login' : 'Need an account? Register'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>🎰 Social Casino</h1>
        <div className="user-info">
          <p>Welcome, {user.username}!</p>
          <p>💰 Chips: {chips}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        <section className="games">
          <h2>Play Games</h2>
          <button onClick={playSlots} className="game-btn slots-btn">
            🎰 Play Slots (Bet 10 chips)
          </button>
        </section>

        <section className="leaderboard">
          <h2>🏆 Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Chips</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr key={player.id}>
                  <td>{index + 1}</td>
                  <td>{player.username}</td>
                  <td>{player.chips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;