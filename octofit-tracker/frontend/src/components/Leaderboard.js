import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Using direct codespace URL for the Django REST API endpoint
    fetch('https://[REPLACE-THIS-WITH-YOUR-CODESPACE-NAME]-8000.app.github.dev/api/leaderboard/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading leaderboard...</p>
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
        <h2 className="mb-0"><i className="bi bi-trophy me-2"></i>Leaderboard</h2>
        <div className="btn-group">
          <button className="btn btn-outline-primary">
            <i className="bi bi-calendar-week me-2"></i>Weekly
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-calendar-month me-2"></i>Monthly
          </button>
          <button className="btn btn-outline-primary">
            <i className="bi bi-calendar3 me-2"></i>All-time
          </button>
        </div>
      </div>
      
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-primary">
                <tr>
                  <th scope="col" width="10%">Rank</th>
                  <th scope="col" width="15%">Avatar</th>
                  <th scope="col" width="35%">User</th>
                  <th scope="col" width="20%">Score</th>
                  <th scope="col" width="20%">Achievement</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard
                    .sort((a, b) => b.score - a.score)
                    .map((entry, index) => (
                      <tr key={entry.id || index} className={index < 3 ? 'table-' + (index === 0 ? 'warning' : index === 1 ? 'light' : 'info') : ''}>
                        <th scope="row">
                          {index < 3 ? (
                            <span className={'badge rounded-pill bg-' + (index === 0 ? 'warning' : index === 1 ? 'secondary' : 'info')}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} {index + 1}
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-light text-dark">{index + 1}</span>
                          )}
                        </th>
                        <td>
                          <div className="avatar-circle bg-primary">
                            {entry.user && typeof entry.user === 'object' && entry.user.username ? 
                              entry.user.username.charAt(0).toUpperCase() : 'U'}
                          </div>
                        </td>
                        <td>
                          {entry.user && typeof entry.user === 'object' && entry.user.username ? 
                            entry.user.username : 'Unknown User'}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1 me-2" style={{height: '10px'}}>
                              <div 
                                className="progress-bar bg-success" 
                                role="progressbar" 
                                style={{width: `${Math.min(100, (entry.score / (leaderboard[0]?.score || 100) * 100))}%`}}
                                aria-valuenow={entry.score}
                                aria-valuemin="0" 
                                aria-valuemax={leaderboard[0]?.score || 100}>
                              </div>
                            </div>
                            <span className="fw-bold">{entry.score}</span>
                          </div>
                        </td>
                        <td>
                          {index === 0 ? (
                            <span className="badge bg-warning text-dark">Fitness Champion 👑</span>
                          ) : index === 1 ? (
                            <span className="badge bg-secondary">Silver Athlete</span>
                          ) : index === 2 ? (
                            <span className="badge bg-info text-dark">Bronze Performer</span>
                          ) : (
                            <span className="badge bg-light text-dark">Participant</span>
                          )}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <i className="bi bi-trophy display-1 text-muted d-block mb-3"></i>
                      <h4>No leaderboard data available</h4>
                      <p className="text-muted">Start tracking activities to appear on the leaderboard!</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default Leaderboard;
