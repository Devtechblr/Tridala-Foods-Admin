import React from 'react';
import { MdShoppingCart, MdInventory, MdPeople, MdCurrencyRupee } from 'react-icons/md';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome to Tridala Nutra Foods Admin Panel</p>
      </div>

      <div className="content-section">
        <div className="card">
          <div className="dashboard-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)' }}>
                <MdShoppingCart />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">1,234</h3>
                <p className="stat-label">Total Orders</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #2d5f3d 0%, #1a472a 100%)' }}>
                <MdInventory />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">456</h3>
                <p className="stat-label">Products</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)' }}>
                <MdCurrencyRupee />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">₹45,678</h3>
                <p className="stat-label">Revenue</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #2d5f3d 0%, #1a472a 100%)' }}>
                <MdPeople />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">89</h3>
                <p className="stat-label">Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
