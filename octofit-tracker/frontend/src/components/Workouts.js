import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/workouts/`)
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

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger my-3" role="alert">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <div className="col-lg-6 mb-4" key={workout.id}>
              <div className="card h-100">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">{workout.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description}</p>
                  <button className="btn btn-outline-success">Start Workout</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No workouts available. Create your own workout routine!</p>
            <button className="btn btn-success">Create Workout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
