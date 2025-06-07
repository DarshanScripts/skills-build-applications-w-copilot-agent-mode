import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Using direct codespace URL for the Django REST API endpoint
    fetch('https://[REPLACE-THIS-WITH-YOUR-CODESPACE-NAME]-8000.app.github.dev/api/workouts/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading workouts...</p>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger shadow-sm my-3" role="alert">
      <h4 className="alert-heading"><i className="bi bi-exclamation-triangle-fill me-2"></i> Error</h4>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container mt-4 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0"><i className="bi bi-heart-pulse me-2"></i>Workouts</h2>
        <div>
          <div className="btn-group me-2">
            <button className="btn btn-outline-primary active">
              <i className="bi bi-grid-3x3-gap me-1"></i> Grid
            </button>
            <button className="btn btn-outline-primary">
              <i className="bi bi-list me-1"></i> List
            </button>
          </div>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>Create Workout
          </button>
        </div>
      </div>
      
      {workouts.length > 0 ? (
        <div className="row">
          {workouts.map((workout, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={workout.id || workout._id || index}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{workout.name}</h5>
                  <span className="badge bg-light text-success">
                    {Math.floor(Math.random() * 60) + 15} min
                  </span>
                </div>
                <div className="card-body">
                  <div className="d-flex mb-3">
                    <span className="badge rounded-pill bg-primary me-1">
                      {workout.name.includes('Strength') ? 'Strength' : 
                       workout.name.includes('Cycling') ? 'Cardio' : 
                       workout.name.includes('Swimming') ? 'Swimming' :
                       workout.name.includes('Running') ? 'Running' : 
                       workout.name.includes('Crossfit') ? 'Crossfit' : 'General'}
                    </span>
                    <span className="badge rounded-pill bg-secondary me-1">
                      {Math.random() > 0.5 ? 'Beginner' : Math.random() > 0.5 ? 'Intermediate' : 'Advanced'}
                    </span>
                    <span className="badge rounded-pill bg-info text-dark">
                      {Math.floor(Math.random() * 500) + 100} cal
                    </span>
                  </div>
                  
                  <p className="card-text">{workout.description}</p>
                  
                  <div className="progress mb-3" style={{ height: '10px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                      aria-valuenow="25" 
                      aria-valuemin="0" 
                      aria-valuemax="100">
                    </div>
                  </div>
                  
                  <div className="d-flex mb-4">
                    <div className="me-4">
                      <small className="text-muted d-block">Difficulty</small>
                      <div className="d-flex">
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className={`bi ${Math.random() > 0.5 ? 'bi-star-fill' : 'bi-star'} text-warning`}></i>
                        <i className={`bi ${Math.random() > 0.3 ? 'bi-star-fill' : 'bi-star'} text-warning`}></i>
                        <i className={`bi ${Math.random() > 0.2 ? 'bi-star-fill' : 'bi-star'} text-warning`}></i>
                        <i className={`bi ${Math.random() > 0.1 ? 'bi-star-fill' : 'bi-star'} text-warning`}></i>
                      </div>
                    </div>
                    <div>
                      <small className="text-muted d-block">Popularity</small>
                      <span className="fw-bold text-success">
                        {Math.floor(Math.random() * 1000) + 10} users
                      </span>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-success">
                      <i className="bi bi-play-circle me-2"></i>Start Workout
                    </button>
                    <div className="btn-group">
                      <button className="btn btn-outline-primary">
                        <i className="bi bi-heart"></i>
                      </button>
                      <button className="btn btn-outline-primary">
                        <i className="bi bi-share"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light text-muted">
                  <small>Created by Coach {Math.random() > 0.5 ? 'Paul Octo' : 'Jessica Cat'}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card shadow-sm text-center p-5">
          <div className="card-body">
            <i className="bi bi-heart-pulse display-1 text-muted mb-3"></i>
            <h3>No Workouts Available</h3>
            <p className="text-muted mb-4">Create your own workout routine to get started!</p>
            <button className="btn btn-lg btn-success">
              <i className="bi bi-plus-circle me-2"></i>Create Your First Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workouts;
