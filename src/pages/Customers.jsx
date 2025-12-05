import React, { useState } from 'react';
import { MdSearch, MdDownload } from 'react-icons/md';
import '../styles/Customers.css';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      phoneNumber: '+91 98765 43210',
      email: 'john.doe@example.com',
      joinedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      phoneNumber: '+91 98765 43211',
      email: 'jane.smith@example.com',
      joinedDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      phoneNumber: '+91 98765 43212',
      email: 'bob.johnson@example.com',
      joinedDate: '2024-03-10'
    },
    {
      id: 4,
      name: 'Alice Brown',
      phoneNumber: '+91 98765 43213',
      email: 'alice.brown@example.com',
      joinedDate: '2024-04-05'
    },
    {
      id: 5,
      name: 'Charlie Davis',
      phoneNumber: '+91 98765 43214',
      email: 'charlie.davis@example.com',
      joinedDate: '2024-05-18'
    },
    {
      id: 6,
      name: 'Emma Wilson',
      phoneNumber: '+91 98765 43215',
      email: 'emma.wilson@example.com',
      joinedDate: '2024-06-22'
    },
    {
      id: 7,
      name: 'David Miller',
      phoneNumber: '+91 98765 43216',
      email: 'david.miller@example.com',
      joinedDate: '2024-07-30'
    },
    {
      id: 8,
      name: 'Sarah Lee',
      phoneNumber: '+91 98765 43217',
      email: 'sarah.lee@example.com',
      joinedDate: '2024-08-14'
    },
    {
      id: 9,
      name: 'Michael Chen',
      phoneNumber: '+91 98765 43218',
      email: 'michael.chen@example.com',
      joinedDate: '2024-09-25'
    },
    {
      id: 10,
      name: 'Lisa Anderson',
      phoneNumber: '+91 98765 43219',
      email: 'lisa.anderson@example.com',
      joinedDate: '2024-10-08'
    }
  ]);

  // Download all filtered customers as CSV
  const downloadAllCustomersCSV = () => {
    const filteredCustomers = getFilteredCustomers();
    
    const csvRows = [
      ['ID', 'Name', 'Phone Number', 'Email', 'Joined Date']
    ];

    filteredCustomers.forEach(customer => {
      csvRows.push([
        customer.id,
        customer.name,
        customer.phoneNumber,
        customer.email,
        customer.joinedDate
      ]);
    });

    csvRows.push([]);
    csvRows.push(['Total Customers', filteredCustomers.length]);

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `customers_list_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter customers
  const getFilteredCustomers = () => {
    return customers.filter(customer => {
      const searchLower = searchTerm.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.phoneNumber.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchLower)
      );
    });
  };

  const filteredCustomers = getFilteredCustomers();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Customers</h1>
      </div>

      <div className="content-section">
        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-box">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, phone number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="btn-download-all"
            onClick={downloadAllCustomersCSV}
            title="Download customers list"
          >
            <MdDownload /> Download List
          </button>
        </div>

        {/* Customer Count Card */}
        <div className="customer-summary-card">
          <div className="summary-content">
            <h3>Total Customers</h3>
            <p className="customer-count">{filteredCustomers.length}</p>
          </div>
        </div>

        <div className="card">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td><strong>{customer.name}</strong></td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.email}</td>
                      <td>{new Date(customer.joinedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">No customers found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
