import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/activities/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger my-3" role="alert">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <div className="row">
        {activities.length > 0 ? (
          activities.map(activity => (
            <div className="col-md-4 mb-4" key={activity.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.activity_type}</h5>
                  <p className="card-text">Duration: {activity.duration}</p>
                  <p className="card-text">User: {activity.user}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No activities found. Start tracking your fitness activities!</p>
            <button className="btn btn-primary">Add Activity</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
