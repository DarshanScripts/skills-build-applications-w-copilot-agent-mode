import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Using direct codespace URL for the Django REST API endpoint
    fetch('https://[REPLACE-THIS-WITH-YOUR-CODESPACE-NAME]-8000.app.github.dev/api/users/')
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

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading users...</p>
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
        <h2 className="mb-0"><i className="bi bi-people me-2"></i>Users</h2>
        <div className="input-group" style={{ maxWidth: '300px' }}>
          <input type="text" className="form-control" placeholder="Search users..." />
          <button className="btn btn-outline-primary" type="button">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
      
      {users.length > 0 ? (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-primary">
                  <tr>
                    <th scope="col" width="10%">#</th>
                    <th scope="col" width="20%">Username</th>
                    <th scope="col" width="30%">Email</th>
                    <th scope="col" width="20%">Status</th>
                    <th scope="col" width="20%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || user._id || index}>
                      <td>
                        <div className="avatar-circle bg-primary">
                          {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                        </div>
                      </td>
                      <td className="fw-bold">{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary" data-bs-toggle="tooltip" title="View Profile">
                            <i className="bi bi-person"></i>
                          </button>
                          <button className="btn btn-outline-info" data-bs-toggle="tooltip" title="Message">
                            <i className="bi bi-chat"></i>
                          </button>
                          <button className="btn btn-outline-success" data-bs-toggle="tooltip" title="Add to Team">
                            <i className="bi bi-people"></i>
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
            <i className="bi bi-person-slash display-1 text-muted mb-3"></i>
            <h3>No Users Found</h3>
            <p className="text-muted">There are no registered users in the system.</p>
          </div>
        </div>
      )}
      
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
      
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

export default Users;
