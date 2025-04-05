import React from 'react';

const Dashboard = () => {

  const handleLogout = () => {
    // Remove only the currentUser from localStorage, and not other user-related data
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      localStorage.removeItem('currentUser');  // Only remove currentUser
    }

    window.location.href = '/login'; // redirect to login page after logout
  };

  const username = localStorage.getItem('currentUser') || 'User';

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome, {username}!</h2>
      <p>This is your dashboard.</p>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  heading: {
    color: '#333',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Dashboard;