import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Orders = (props) => {
  const { orders } = props;

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Total</th>
          <th scope='col'>Paid</th>
          <th scope='col'>Date</th>
          <th>Status</th>
          <th scope='col' className='text-end'>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order._id}>
            <td>
              <b>{order.user?.name}</b>
            </td>
            <td>{order.user?.email}</td>
            <td>₹{order.totalPrice}</td>
            <td>
              {order.paymentMethod !== 'POD (Pay On Delivery)' ? (
                order.isPaid ? (
                  <span className='badge rounded-pill alert-success'>
                    Paid At {moment(order.paidAt).format('MMM Do YY')}
                  </span>
                ) : (
                  <span className='badge rounded-pill alert-danger'>
                    Not Paid
                  </span>
                )
              ) : (
                <span className='badge rounded-pill alert-success'>N/A</span>
              )}
            </td>
            <td>{moment(order.createdAt).format('MMM Do YY')}</td>
            <td>
              {/* {order.isDelivered ? (
                <span className="badge btn-success">Delivered</span>
              ) : (
                <span className="badge btn-dark">Not delivered</span>
              )} */}
              {order.status === 'Delivered' ? (
                <span className='badge btn-success'>{order.status}</span>
              ) : order.status === 'Cancelled' ? (
                <span className='badge btn-danger'>{order.status}</span>
              ) : (
                <span className='badge btn-info'>{order.status}</span>
              )}
            </td>
            <td className='d-flex justify-content-end align-item-center'>
              <Link to={`/order/${order._id}`} className='text-success'>
                <i className='fas fa-eye'></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
