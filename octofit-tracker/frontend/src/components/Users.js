import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/users/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger my-3" role="alert">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <div className="row">
        {users.length > 0 ? (
          users.map(user => (
            <div className="col-md-4 mb-4" key={user.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.username}</h5>
                  <p className="card-text">Email: {user.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
