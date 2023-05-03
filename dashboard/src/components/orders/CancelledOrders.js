import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import NoResult from "../../screens/NoResult";


const ToastObjects = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  toastId: "Id Copied To Clipboard"
};

const CancelledOrders = (props) => {
  const { orders } = props;
  return (
    <>
      <Toast />
      {
        orders.length > 0
          ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Total</th>
                  <th scope="col">Payment Id</th>
                  <th scope="col">Paid</th>
                  <th scope="col">Date</th>
                  <th>Status</th>
                  <th scope="col" className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <b>{order.user.name}</b>
                    </td>
                    <td>{order.user.email}</td>
                    <td>₹{order.totalPrice}</td>
                    <td 
                      onClick={() => {
                        navigator.clipboard.writeText(order.paymentResult.id);
                        toast.success("Id Copied To Clipboard", ToastObjects);
                      }}
                    >
                      {order.paymentResult.id}</td>
                    <td>
                      {order.paymentMethod !== "POD (Pay On Delivery)" ? (order.isPaid ? (
                        <span className="badge rounded-pill alert-success">
                          Paid At {moment(order.paidAt).format("MMM Do YY")}
                        </span>
                      ) : (
                        <span className="badge rounded-pill alert-danger">
                          Not Paid
                        </span>
                      )) :
                      (
                        <span className="badge rounded-pill alert-success">
                          N/A
                        </span>
                      )
                      }
                    </td>
                    <td>{moment(order.createdAt).format("MMM Do YY")}</td>
                    <td>
                      {order.isDelivered ? (
                        <span className="badge btn-success">Delivered</span>
                      ) : (
                        <span className="badge btn-dark">Not delivered</span>
                      )}
                    </td>
                    <td className="d-flex justify-content-end align-item-center">
                      <Link to={`/cancelledOrder/${order._id}`} className="text-success">
                        <i className="fas fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))}

                
              </tbody>
            </table>
          )
        : (
          <div className="container my-5">
            <div className="row justify-content-center align-items-center">
              <img
                style={{ width: "100%", height: "300px", objectFit: "contain" }}
                src="/images/noOrder.webp"
                alt="Not-found"
              />
              {/* <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
                <Link to="/" className="text-white text-decoration-none">
                  Home page
                </Link>
              </button> */}
            </div>
          </div>
          )
      }
      
    </>
  );
};

export default CancelledOrders;
