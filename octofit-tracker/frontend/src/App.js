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
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                {isAuthenticated ? (
                  <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        
        <div className="mt-4">
          {apiStatus.loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Connecting to backend API...</p>
            </div>
          ) : apiStatus.error ? (
            <div className="alert alert-danger" role="alert">
              {apiStatus.error}
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
                <div className="text-center">
                  <h1>Welcome to OctoFit Tracker</h1>
                  <p className="lead">
                    Track your fitness activities, join teams, and compete on the leaderboard!
                  </p>
                  <img 
                    src="/logo192.png" 
                    alt="OctoFit Logo" 
                    className="img-fluid mt-3" 
                    style={{ maxWidth: '200px' }} 
                  />
                </div>
              } />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
