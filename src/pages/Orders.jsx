import React, { useState } from 'react';
import { MdVisibility, MdClose, MdCheckCircle, MdPending, MdAutorenew, MdArrowDropDown, MdSearch, MdDownload, MdSort } from 'react-icons/md';
import '../styles/Orders.css';

const Orders = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [orders, setOrders] = useState([
    { 
      id: '#1234', 
      customer: 'John Doe', 
      date: '2025-12-01', 
      amount: '₹1,299', 
      status: 'Delivered',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      address: '123 Main Street, Bangalore, Karnataka - 560001',
      items: [
        { name: 'Millet Idly Mix', quantity: 2, price: '₹299', weight: '500g' },
        { name: 'Moringa Nutri Bar', quantity: 3, price: '₹450', weight: '250g' },
        { name: 'Coffee Cubes', quantity: 1, price: '₹250', weight: '200g' }
      ],
      paymentMethod: 'UPI',
      trackingId: 'TRK1234567890'
    },
    { 
      id: '#1235', 
      customer: 'Jane Smith', 
      date: '2025-12-02', 
      amount: '₹899', 
      status: 'Pending',
      email: 'jane.smith@example.com',
      phone: '+91 98765 43211',
      address: '456 Park Avenue, Mumbai, Maharashtra - 400001',
      items: [
        { name: 'Millet Chikki', quantity: 2, price: '₹399', weight: '250g' },
        { name: 'Chutney Powder', quantity: 1, price: '₹250', weight: '200g' }
      ],
      paymentMethod: 'Credit Card',
      trackingId: 'TRK1234567891'
    },
    { 
      id: '#1236', 
      customer: 'Bob Johnson', 
      date: '2025-12-02', 
      amount: '₹1,499', 
      status: 'Processing',
      email: 'bob.johnson@example.com',
      phone: '+91 98765 43212',
      address: '789 Lake Road, Chennai, Tamil Nadu - 600001',
      items: [
        { name: 'Health Mix', quantity: 2, price: '₹599', weight: '1kg' },
        { name: 'Moringa Soup Powder', quantity: 1, price: '₹450', weight: '500g' }
      ],
      paymentMethod: 'Cash on Delivery',
      trackingId: 'TRK1234567892'
    },
    { 
      id: '#1237', 
      customer: 'Alice Brown', 
      date: '2025-12-03', 
      amount: '₹599', 
      status: 'Delivered',
      email: 'alice.brown@example.com',
      phone: '+91 98765 43213',
      address: '321 Hill Street, Pune, Maharashtra - 411001',
      items: [
        { name: 'Coffee Cubes', quantity: 2, price: '₹500', weight: '200g' }
      ],
      paymentMethod: 'Debit Card',
      trackingId: 'TRK1234567893'
    },
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Pending':
        return 'status-pending';
      case 'Processing':
        return 'status-processing';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <MdCheckCircle />;
      case 'Pending':
        return <MdPending />;
      case 'Processing':
        return <MdAutorenew />;
      default:
        return null;
    }
  };

  const handleViewOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Download single order as CSV
  const downloadOrderCSV = (order) => {
    const csvContent = [
      ['Order Details'],
      ['Order ID', order.id],
      ['Customer', order.customer],
      ['Email', order.email],
      ['Phone', order.phone],
      ['Address', order.address],
      ['Date', order.date],
      ['Status', order.status],
      ['Payment Method', order.paymentMethod],
      ['Tracking ID', order.trackingId],
      [''],
      ['Order Items'],
      ['Product', 'Weight', 'Quantity', 'Price'],
      ...order.items.map(item => [item.name, item.weight, item.quantity, item.price]),
      [''],
      ['Total Amount', order.amount]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `order_${order.id}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download filtered orders as CSV
  const downloadAllFilteredOrders = () => {
    const filteredOrders = getFilteredAndSortedOrders();
    
    const csvRows = [
      ['Order ID', 'Customer', 'Email', 'Phone', 'Date', 'Amount', 'Status', 'Payment Method', 'Items Count']
    ];

    filteredOrders.forEach(order => {
      csvRows.push([
        order.id,
        order.customer,
        order.email,
        order.phone,
        order.date,
        order.amount,
        order.status,
        order.paymentMethod,
        order.items.length
      ]);
    });

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and sort orders
  const getFilteredAndSortedOrders = () => {
    let filtered = orders.filter(order => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower) ||
        order.date.includes(searchTerm)
      );
    });

    // Sort logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.customer.localeCompare(b.customer);
        case 'name-desc':
          return b.customer.localeCompare(a.customer);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'month':
          return new Date(a.date).getMonth() - new Date(b.date).getMonth();
        case 'year':
          return new Date(a.date).getFullYear() - new Date(b.date).getFullYear();
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredOrders = getFilteredAndSortedOrders();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
      </div>

      <div className="content-section">
        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box-wrapper">
            <div className="search-box">
              <MdSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by order ID, customer, email, status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="btn-download-all"
              onClick={downloadAllFilteredOrders}
              title="Download filtered orders"
            >
              <MdDownload /> Download Results
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
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>

        <div className="card">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td><strong>{order.id}</strong></td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>{order.amount}</td>
                      <td>
                        {order.status === 'Delivered' ? (
                          <div className="status-badge-wrapper">
                            <span className="status-icon">{getStatusIcon(order.status)}</span>
                            <span className={`status-badge ${getStatusClass(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        ) : (
                          <div className="status-dropdown-wrapper">
                            <span className="status-icon">{getStatusIcon(order.status)}</span>
                            <select 
                              className={`status-select ${getStatusClass(order.status)}`}
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            >
                              {order.status === 'Pending' && (
                                <option value="Pending" className="option-pending">Pending</option>
                              )}
                              <option value="Processing" className="option-processing">Processing</option>
                              <option value="Delivered" className="option-delivered">Delivered</option>
                            </select>
                            <MdArrowDropDown className="dropdown-arrow" />
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-action" 
                            onClick={() => handleViewOrder(order.id)}
                          >
                            {expandedOrderId === order.id ? (
                              <>
                                <MdClose /> Close
                              </>
                            ) : (
                              <>
                                <MdVisibility /> View
                              </>
                            )}
                          </button>
                          <button 
                            className="btn-download"
                            onClick={() => downloadOrderCSV(order)}
                            title="Download order details"
                          >
                            <MdDownload />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedOrderId === order.id && (
                      <tr className="order-details-row">
                        <td colSpan="6">
                          <div className="order-details-container">
                            <div className="order-details-header">
                              <h3>Order Details - {order.id}</h3>
                            </div>
                            
                            <div className="order-details-grid">
                              {/* Customer Information */}
                              <div className="details-section">
                                <h4>Customer Information</h4>
                                <div className="detail-item">
                                  <span className="detail-label">Name:</span>
                                  <span className="detail-value">{order.customer}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Email:</span>
                                  <span className="detail-value">{order.email}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Phone:</span>
                                  <span className="detail-value">{order.phone}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Address:</span>
                                  <span className="detail-value">{order.address}</span>
                                </div>
                              </div>

                              {/* Order Information */}
                              <div className="details-section">
                                <h4>Order Information</h4>
                                <div className="detail-item">
                                  <span className="detail-label">Order ID:</span>
                                  <span className="detail-value">{order.id}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Order Date:</span>
                                  <span className="detail-value">{order.date}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Status:</span>
                                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                                    {order.status}
                                  </span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Payment Method:</span>
                                  <span className="detail-value">{order.paymentMethod}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Tracking ID:</span>
                                  <span className="detail-value">{order.trackingId}</span>
                                </div>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="details-section order-items-section">
                              <h4>Order Items</h4>
                              <table className="items-table">
                                <thead>
                                  <tr>
                                    <th>Product</th>
                                    <th>Weight</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.items.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item.name}</td>
                                      <td>{item.weight}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.price}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="order-total">
                                <strong>Total Amount: {order.amount}</strong>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
