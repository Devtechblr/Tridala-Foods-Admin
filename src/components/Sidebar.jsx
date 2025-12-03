import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdInventory, MdShoppingCart, MdLogout } from 'react-icons/md';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: '/', icon: MdDashboard, label: 'Dashboard' },
    { path: '/products', icon: MdInventory, label: 'Products' },
    { path: '/orders', icon: MdShoppingCart, label: 'Orders' }
  ];

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    alert('Logged out successfully!');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="company-logo">
          <img src="/TridalaLogo.jpg" alt="Tridala Nutra Foods" className="logo-image" />
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <item.icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <MdLogout className="logout-icon" />
          <span className="logout-label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
