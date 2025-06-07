import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // For demonstration purposes, we'll use a simplified login check
      // In a real application, we would use a proper authentication endpoint
      const response = await fetch(`${API_BASE_URL}/users/`);
      
      if (response.ok) {
        const users = await response.json();
        const user = users.find(u => u.username === username);
        
        if (user) {
          // In a real app, we would NEVER check passwords on the frontend
          // This is just for demonstration as our backend doesn't have a real authentication endpoint
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', JSON.stringify(user));
          setIsAuthenticated(true);
          navigate('/');
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError(`Login failed: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3 className="mb-0">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login to OctoFit Tracker
              </h3>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {loading && (
                  <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-2">Verifying credentials...</p>
                  </div>
                )}
                
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <label htmlFor="username">Username</label>
                </div>
                
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-primary">Forgot password?</a>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="mb-0">Don't have an account? <Link to="/register" className="text-primary fw-bold">Register</Link></p>
              </div>
            </div>
            <div className="card-footer bg-light text-center py-3">
              <div className="small text-muted">Mergington High School OctoFit Tracker</div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <p className="text-muted small">For demo purposes, you can use any username</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
