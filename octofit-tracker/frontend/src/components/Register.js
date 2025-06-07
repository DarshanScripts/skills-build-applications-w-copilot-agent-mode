import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // In a real application, we would use a proper registration endpoint
      // For now, we'll simulate by checking if the username exists
      const checkResponse = await fetch(`${API_BASE_URL}/users/`);
      
      if (checkResponse.ok) {
        const users = await checkResponse.json();
        const userExists = users.some(u => 
          u.username === formData.username || u.email === formData.email
        );
        
        if (userExists) {
          setError('Username or email already exists');
        } else {
          // In a real application, we would POST to a registration endpoint
          // This is just a simulation
          alert('Registration successful! In a real app, this would create a new user.');
          navigate('/login');
        }
      } else {
        setError(`Registration failed: ${checkResponse.statusText}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3 className="mb-0">
                <i className="bi bi-person-plus me-2"></i>
                Register for OctoFit Tracker
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
                    <p className="text-muted mt-2">Creating your account...</p>
                  </div>
                )}
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                      <label htmlFor="username">Username</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                      <label htmlFor="email">Email address</label>
                    </div>
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                  </div>
                </div>
                
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="agreeTerms"
                    required
                    disabled={loading}
                  />
                  <label className="form-check-label" htmlFor="agreeTerms">
                    I agree to the <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Create Account
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="mb-0">Already have an account? <Link to="/login" className="text-primary fw-bold">Login</Link></p>
              </div>
            </div>
            <div className="card-footer bg-light text-center py-3">
              <div className="small text-muted">Join our community of fitness enthusiasts at Mergington High School</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
