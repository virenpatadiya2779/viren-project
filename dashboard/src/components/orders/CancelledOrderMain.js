import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import CancelledOrders from "./CancelledOrders";
import { useSelector, useDispatch } from "react-redux";
import { cancelledOrdersList } from "../../Redux/Actions/OrderActions";


const CancelledOrderMain = () => {
  
  const cancelledOrderList = useSelector((state) => state.cancelledOrderList);
  const { loading, error, orders } = cancelledOrderList;

  const [search, setResult] = useState("")

  const searchDataHandel = (e) => {
    let curele = e.toLowerCase();
    let ele = orders.filter((order) => (order.user.name).toLowerCase().includes(curele) || (order.user.email).toLowerCase().includes(curele));
    if(ele) {
      return setResult(ele);
    } else {
      return setResult("");
    }
  }
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(cancelledOrdersList());
  },[dispatch])


  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            {/* <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
                onChange={(e)=>{searchDataHandel(e.target.value)}}
              />
            </div> */}
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div> */}
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div> */}
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              search ? (
                <CancelledOrders orders={search} />

              ) : (
                <CancelledOrders orders={orders} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CancelledOrderMain;
