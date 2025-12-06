import React, { useState } from 'react';
import { MdSearch, MdDownload, MdSort, MdCalendarToday, MdEvent } from 'react-icons/md';
import '../styles/Revenue.css';

const Revenue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [revenues, setRevenues] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      productName: 'Millet Idly Mix',
      date: '2025-12-01',
      paymentMode: 'UPI',
      totalAmount: '₹299'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      productName: 'Coffee Cubes',
      date: '2025-12-02',
      paymentMode: 'Credit Card',
      totalAmount: '₹250'
    },
    {
      id: 3,
      customerName: 'Bob Johnson',
      productName: 'Moringa Nutri Bar',
      date: '2025-12-02',
      paymentMode: 'Cash on Delivery',
      totalAmount: '₹150'
    },
    {
      id: 4,
      customerName: 'Alice Brown',
      productName: 'Health Mix',
      date: '2025-12-03',
      paymentMode: 'Debit Card',
      totalAmount: '₹599'
    },
    {
      id: 5,
      customerName: 'Charlie Davis',
      productName: 'Millet Chikki',
      date: '2025-12-03',
      paymentMode: 'UPI',
      totalAmount: '₹199'
    },
    {
      id: 6,
      customerName: 'Emma Wilson',
      productName: 'Chutney Powder',
      date: '2025-12-04',
      paymentMode: 'Credit Card',
      totalAmount: '₹250'
    },
    {
      id: 7,
      customerName: 'David Miller',
      productName: 'Moringa Soup Powder',
      date: '2025-11-28',
      paymentMode: 'UPI',
      totalAmount: '₹450'
    },
    {
      id: 8,
      customerName: 'Sarah Lee',
      productName: 'Coffee Cubes',
      date: '2025-11-29',
      paymentMode: 'Cash on Delivery',
      totalAmount: '₹250'
    }
  ]);

  // Month names for the month filter
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Generate year list (last 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // Download single revenue entry as CSV
  const downloadRevenueCSV = (revenue) => {
    const csvContent = [
      ['Revenue Entry'],
      ['Customer Name', revenue.customerName],
      ['Product Name', revenue.productName],
      ['Date', revenue.date],
      ['Payment Mode', revenue.paymentMode],
      ['Total Amount', revenue.totalAmount]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `revenue_${revenue.id}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download all filtered revenue entries as CSV
  const downloadAllRevenueCSV = () => {
    const filteredRevenues = getFilteredAndSortedRevenues();
    
    const csvRows = [
      ['ID', 'Customer Name', 'Product Name', 'Date', 'Payment Mode', 'Total Amount']
    ];

    filteredRevenues.forEach(revenue => {
      csvRows.push([
        revenue.id,
        revenue.customerName,
        revenue.productName,
        revenue.date,
        revenue.paymentMode,
        revenue.totalAmount
      ]);
    });

    // Calculate total
    const total = filteredRevenues.reduce((sum, revenue) => {
      const amount = parseFloat(revenue.totalAmount.replace('₹', '').replace(',', ''));
      return sum + amount;
    }, 0);

    csvRows.push([]);
    csvRows.push(['Total Revenue', '', '', '', '', `₹${total.toLocaleString('en-IN')}`]);

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `revenue_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and sort revenues
  const getFilteredAndSortedRevenues = () => {
    let filtered = revenues.filter(revenue => {
      const searchLower = searchTerm.toLowerCase();
      const revenueDate = new Date(revenue.date);
      const revenueMonth = String(revenueDate.getMonth() + 1).padStart(2, '0');
      const revenueYear = String(revenueDate.getFullYear());

      // Search filter
      const matchesSearch = (
        revenue.customerName.toLowerCase().includes(searchLower) ||
        revenue.productName.toLowerCase().includes(searchLower) ||
        revenue.paymentMode.toLowerCase().includes(searchLower) ||
        revenue.date.includes(searchTerm) ||
        revenue.totalAmount.includes(searchTerm)
      );

      // Month filter
      const matchesMonth = selectedMonth === '' || revenueMonth === selectedMonth;

      // Year filter
      const matchesYear = selectedYear === '' || revenueYear === selectedYear;

      return matchesSearch && matchesMonth && matchesYear;
    });

    // Sort logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.customerName.localeCompare(b.customerName);
        case 'name-desc':
          return b.customerName.localeCompare(a.customerName);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredRevenues = getFilteredAndSortedRevenues();

  // Calculate total revenue
  const totalRevenue = filteredRevenues.reduce((sum, revenue) => {
    const amount = parseFloat(revenue.totalAmount.replace('₹', '').replace(',', ''));
    return sum + amount;
  }, 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Revenue</h1>
      </div>

      <div className="content-section">
        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box-wrapper">
            <div className="search-box">
              <MdSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by customer, product, payment mode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="btn-download-all"
              onClick={downloadAllRevenueCSV}
              title="Download revenue report"
            >
              <MdDownload /> Download Report
            </button>
          </div>
          
          <div className="sort-box">
            <MdSort className="sort-icon" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>

          <div className="filter-box">
            <MdCalendarToday className="filter-icon" />
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="filter-select"
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-box">
            <MdEvent className="filter-icon" />
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={String(year)}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="revenue-summary-card">
          <div className="summary-content">
            <h3>Total Revenue</h3>
            <p className="total-amount">₹{totalRevenue.toLocaleString('en-IN')}</p>
            <span className="entries-count">{filteredRevenues.length} entries</span>
          </div>
        </div>

        <div className="card">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Product Name</th>
                  <th>Date</th>
                  <th>Payment Mode</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRevenues.length > 0 ? (
                  filteredRevenues.map((revenue) => (
                    <tr key={revenue.id}>
                      <td>{revenue.customerName}</td>
                      <td>{revenue.productName}</td>
                      <td>{revenue.date}</td>
                      <td>{revenue.paymentMode}</td>
                      <td><strong>{revenue.totalAmount}</strong></td>
                      <td>
                        <button 
                          className="btn-download"
                          onClick={() => downloadRevenueCSV(revenue)}
                          title="Download entry"
                        >
                          <MdDownload />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">No revenue entries found</td>
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

export default Revenue;
