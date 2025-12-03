import React from 'react';
import { MdAdd, MdVisibility, MdEdit } from 'react-icons/md';
import '../styles/Orders.css';

const Orders = () => {
  const orders = [
    { id: '#1234', customer: 'John Doe', date: '2025-12-01', amount: '₹1,299', status: 'Delivered' },
    { id: '#1235', customer: 'Jane Smith', date: '2025-12-02', amount: '₹899', status: 'Pending' },
    { id: '#1236', customer: 'Bob Johnson', date: '2025-12-02', amount: '₹1,499', status: 'Processing' },
    { id: '#1237', customer: 'Alice Brown', date: '2025-12-03', amount: '₹599', status: 'Delivered' },
  ];

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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
        <button className="btn-primary">
          <MdAdd /> New Order
        </button>
      </div>

      <div className="content-section">
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
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-action">
                        <MdVisibility /> View
                      </button>
                      <button className="btn-action">
                        <MdEdit /> Edit
                      </button>
                    </td>
                  </tr>
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
