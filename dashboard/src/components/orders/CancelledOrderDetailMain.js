import React, { useEffect, useState } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast"; 
import { toast } from "react-toastify";
import {
  deliverOrder,
  getOrderDetails,
  changeOrderStatus,
  amountRefundMail,
  // cancelledOrdersList
} from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 5000,
  toastId: "amountRefunded"
};

const CancelledOrderDetailMain = (props) => {
  const [status, setStatus] = useState("Order Placed")
  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const refundMail = useSelector((state) => state.refundMail);
  const { loading: loadingMail, success: successMail } = refundMail;

  const orderStatus = useSelector((state) => state.orderStatus);
  const { loading: loadingStatus, success: successStatus } = orderStatus;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successStatus, successMail]);

  const refundHandler = () => {
    dispatch(amountRefundMail(order));
    // dispatch(cancelledOrdersList())
    toast.success("Amount Refunded", ToastObjects);
    // dispatch(deliverOrder(order));
    // dispatch(changeOrderStatus(order, "Delivered"))
  };

  const statusHandler = () => {
    dispatch(changeOrderStatus(order, status))
  }

  return (
    <section className="content-main">
      <Toast />
      <div className="content-header">
        <Link to="/cancelledOrders" className="btn btn-dark text-white">
          Back To Cancelled Orders
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-black;">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-black mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
              {/* <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="Order Placed">Change status</option>
                  <option value="Awaiting Payment">Awaiting payment</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                </select>
                {
                  !loadingStatus
                    ? <Link className="btn btn-success ms-2" to="#" onClick={statusHandler}>
                        <i className="fas fa-print"></i>
                      </Link>
                    : <div className="ms-2">
                        <Loading />
                      </div>
                }
              </div> */}
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.isRefunded ? (
                    <button className="btn btn-success col-12" disabled>
                      AMOUNT REFUNDED
                    </button>
                  ) : (
                    <>
                      {loadingMail && <Loading />}
                      <button
                        onClick={refundHandler}
                        className="btn btn-dark col-12"
                      >
                        REFUND AMOUNT
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CancelledOrderDetailMain;
