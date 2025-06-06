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

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger my-3" role="alert">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row">
        {teams.length > 0 ? (
          teams.map(team => (
            <div className="col-md-6 mb-4" key={team.id}>
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <h6>Members:</h6>
                  <ul className="list-group">
                    {team.members && team.members.length > 0 ? (
                      team.members.map(member => (
                        <li key={member.id} className="list-group-item">{member.username}</li>
                      ))
                    ) : (
                      <li className="list-group-item">No members yet</li>
                    )}
                  </ul>
                  <div className="mt-3">
                    <button className="btn btn-outline-primary btn-sm">Join Team</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No teams available. Create a new team to get started!</p>
            <button className="btn btn-primary">Create Team</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
