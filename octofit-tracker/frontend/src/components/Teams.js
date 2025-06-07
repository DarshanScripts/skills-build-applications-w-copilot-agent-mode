import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/teams/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading teams...</p>
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
        <h2 className="mb-0"><i className="bi bi-people me-2"></i>Teams</h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Create New Team
        </button>
      </div>
      
      {teams.length > 0 ? (
        <div className="row">
          {teams.map(team => (
            <div className="col-md-6 mb-4" key={team.id || team._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{team.name}</h5>
                  <div className="badge rounded-pill bg-light text-primary">
                    {team.members && team.members.length || 0} members
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">Team Members</h6>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-person-plus me-1"></i> Join
                    </button>
                  </div>
                  
                  {team.members && team.members.length > 0 ? (
                    <div className="list-group shadow-sm">
                      {team.members.slice(0, 5).map((member, index) => (
                        <div key={member.id || member._id || index} className="list-group-item d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle bg-primary me-3">
                              {member.username ? member.username.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span>{member.username || 'Unknown User'}</span>
                          </div>
                          <span className="badge bg-primary rounded-pill">{
                            index === 0 ? 'Captain' : 'Member'
                          }</span>
                        </div>
                      ))}
                      
                      {team.members.length > 5 && (
                        <div className="list-group-item text-center">
                          <button className="btn btn-sm btn-link">
                            View {team.members.length - 5} more members
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <i className="bi bi-people display-4 text-muted mb-3"></i>
                      <p className="mb-0">No team members yet. Be the first to join!</p>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <h6 className="fw-bold mb-3">Team Stats</h6>
                    <div className="d-flex justify-content-around text-center">
                      <div>
                        <div className="stat-circle bg-primary mb-2">
                          <i className="bi bi-trophy"></i>
                        </div>
                        <div className="small">Rank</div>
                        <div className="fw-bold">{Math.floor(Math.random() * 10) + 1}</div>
                      </div>
                      <div>
                        <div className="stat-circle bg-success mb-2">
                          <i className="bi bi-activity"></i>
                        </div>
                        <div className="small">Activities</div>
                        <div className="fw-bold">{Math.floor(Math.random() * 50) + 10}</div>
                      </div>
                      <div>
                        <div className="stat-circle bg-info mb-2">
                          <i className="bi bi-graph-up"></i>
                        </div>
                        <div className="small">Points</div>
                        <div className="fw-bold">{Math.floor(Math.random() * 1000) + 100}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card shadow-sm text-center p-5">
          <div className="card-body">
            <i className="bi bi-people display-1 text-muted mb-3"></i>
            <h3>No Teams Available</h3>
            <p className="text-muted mb-4">Create a new team to get started with group fitness tracking!</p>
            <button className="btn btn-lg btn-primary">
              <i className="bi bi-plus-circle me-2"></i>Create Your First Team
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .stat-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default Teams;
