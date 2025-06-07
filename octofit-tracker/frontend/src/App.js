import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import Login from './components/Login';
import Register from './components/Register';
import { API_BASE_URL } from './config';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [apiStatus, setApiStatus] = useState({ loading: true, error: null });
  
  // Check if API is accessible
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}`);
        if (response.ok) {
          setApiStatus({ loading: false, error: null });
        } else {
          setApiStatus({ loading: false, error: `API error: ${response.status}` });
        }
      } catch (error) {
        setApiStatus({ 
          loading: false, 
          error: `Cannot connect to backend API at ${API_BASE_URL}. Please make sure the server is running.` 
        });
      }
    };
    
    checkApiStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src="/favicon.ico" alt="OctoFit Logo" height="30" className="me-2" />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <i className="bi bi-activity me-1"></i> Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="bi bi-trophy me-1"></i> Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="bi bi-people me-1"></i> Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="bi bi-person me-1"></i> Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="bi bi-heart-pulse me-1"></i> Workouts
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                {isAuthenticated ? (
                  <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-1"></i> Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        <i className="bi bi-person-plus me-1"></i> Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <div className="container my-4 flex-grow-1">
          {apiStatus.loading ? (
            <div className="text-center my-5 py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 lead">Connecting to backend API...</p>
            </div>
          ) : apiStatus.error ? (
            <div className="alert alert-danger shadow-sm" role="alert">
              <h4 className="alert-heading"><i className="bi bi-exclamation-triangle-fill me-2"></i> Connection Error</h4>
              <p>{apiStatus.error}</p>
              <hr />
              <p className="mb-0">Please check if the backend server is running and try again.</p>
            </div>
          ) : (
            <Routes>
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/users" element={<Users />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
              />
              <Route 
                path="/register" 
                element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
              />
              <Route path="/" element={
                <div className="text-center my-5 fade-in">
                  <img 
                    src="/logo192.png" 
                    alt="OctoFit Logo" 
                    className="img-fluid mb-4" 
                    style={{ maxWidth: '150px' }} 
                  />
                  <h1 className="display-4 mb-3">Welcome to OctoFit Tracker</h1>
                  <p className="lead mb-4">
                    Track your fitness activities, join teams, and compete on the leaderboard!
                  </p>
                  <div className="row justify-content-center mt-5">
                    <div className="col-md-4 mb-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-activity display-4 text-primary mb-3"></i>
                          <h3 className="card-title">Track Activities</h3>
                          <p className="card-text">Log your runs, workouts, and other physical activities.</p>
                          <Link to="/activities" className="btn btn-primary">Get Started</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-people display-4 text-primary mb-3"></i>
                          <h3 className="card-title">Join Teams</h3>
                          <p className="card-text">Collaborate with classmates in fitness challenges.</p>
                          <Link to="/teams" className="btn btn-primary">Find Teams</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-trophy display-4 text-primary mb-3"></i>
                          <h3 className="card-title">Compete</h3>
                          <p className="card-text">Climb the leaderboard and earn achievements.</p>
                          <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } />
            </Routes>
          )}
        </div>
        
        {/* Footer */}
        <footer className="bg-light py-4 mt-auto">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start">
                <p className="mb-0">&copy; {new Date().getFullYear()} OctoFit Tracker - Mergington High School</p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <p className="mb-0">Created by Paul Octo &amp; Jessica Cat</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
