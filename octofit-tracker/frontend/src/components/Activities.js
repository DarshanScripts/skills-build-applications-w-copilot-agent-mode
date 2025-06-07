import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Using direct codespace URL for the Django REST API endpoint
    fetch('https://[REPLACE-THIS-WITH-YOUR-CODESPACE-NAME]-8000.app.github.dev/api/activities/')
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

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading activities...</p>
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
        <h2 className="mb-0"><i className="bi bi-activity me-2"></i>Activities</h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add New Activity
        </button>
      </div>
      
      {activities.length > 0 ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Duration</th>
                    <th scope="col">User</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id || index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <span className="badge bg-primary">{activity.activity_type}</span>
                      </td>
                      <td>{activity.duration}</td>
                      <td>{typeof activity.user === 'object' ? activity.user.username : activity.user}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-outline-success">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm text-center p-5">
          <div className="card-body">
            <i className="bi bi-activity display-1 text-muted mb-3"></i>
            <h3>No Activities Found</h3>
            <p className="text-muted mb-4">Start tracking your fitness activities!</p>
            <button className="btn btn-lg btn-primary">
              <i className="bi bi-plus-circle me-2"></i>Add Your First Activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
