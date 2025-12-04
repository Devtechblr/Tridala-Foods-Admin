import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Revenue from './pages/Revenue';
import Customers from './pages/Customers';
import Login from './pages/Login';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const inactivityTimer = useRef(null);
  const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const lastActivity = localStorage.getItem('lastActivity');
    
    if (authStatus === 'true') {
      // Check if session is still valid (not expired)
      if (lastActivity) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
        if (timeSinceLastActivity < INACTIVITY_TIMEOUT) {
          setIsAuthenticated(true);
          updateLastActivity();
        } else {
          // Session expired, logout
          handleLogout();
        }
      } else {
        setIsAuthenticated(true);
        updateLastActivity();
      }
    }
    setIsLoading(false);
  }, []);

  // Track user activity and reset inactivity timer
  useEffect(() => {
    if (!isAuthenticated) return;

    const updateActivity = () => {
      updateLastActivity();
      resetInactivityTimer();
    };

    // Events to track user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click', 'mousemove'];
    
    events.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    // Set initial timer
    resetInactivityTimer();

    // Cleanup
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [isAuthenticated]);

  const updateLastActivity = () => {
    localStorage.setItem('lastActivity', Date.now().toString());
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      alert('Your session has expired due to inactivity. Please login again.');
      handleLogout();
    }, INACTIVITY_TIMEOUT);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    updateLastActivity();
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('lastActivity');
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    setIsAuthenticated(false);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#2d5f3d'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        <Sidebar onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
