import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

axios.defaults.baseURL = 'https://registerlogin01.onrender.com';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (token) {
      verifyToken();
      fetchMembers();
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await axios.get('/api/members', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/members', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.target);
      const response = await axios.post('/api/login', {
        email: formData.get('email'),
        password: formData.get('password')
      });

      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      await fetchMembers();
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.target);
      await axios.post('/api/register', {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
      });

      // Redirect to login after successful registration
      setSuccess('Registration successful! Please login with your credentials.');
      setView('login');
      e.target.reset();
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.target);
      const response = await axios.post('/api/members', {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone')
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMembers([...members, response.data.member]);
      e.target.reset();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add member');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;

    try {
      await axios.delete(`/api/members/${memberId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMembers(members.filter(member => member._id !== memberId));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete member');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setMembers([]);
  };

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>{view === 'login' ? 'Login' : 'Register'}</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={view === 'login' ? handleLogin : handleRegister}>
            {view === 'register' && (
              <div className="form-group">
                <label>Username</label>
                <input type="text" name="username" required />
              </div>
            )}
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" required />
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Please wait...' : (view === 'login' ? 'Login' : 'Register')}
            </button>
          </form>
          
          <p className="switch-auth">
            {view === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => {
                setView(view === 'login' ? 'register' : 'login');
                setError('');
                setSuccess('');
              }}
              className="link-button"
            >
              {view === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Member Management System</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        {error && <div className="error-message">{error}</div>}
        
        <div className="add-member-section">
          <h2>Add New Member</h2>
          <form onSubmit={handleAddMember} className="member-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Member'}
            </button>
          </form>
        </div>

        <div className="members-section">
          <h2>Members ({members.length})</h2>
          <div className="members-grid">
            {members.map(member => (
              <div key={member._id} className="member-card">
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p><strong>Email:</strong> {member.email}</p>
                  {member.phone && <p><strong>Phone:</strong> {member.phone}</p>}
                  <p><strong>Added by:</strong> {member.addedBy?.username}</p>
                  <p><strong>Added on:</strong> {new Date(member.createdAt).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => handleDeleteMember(member._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
