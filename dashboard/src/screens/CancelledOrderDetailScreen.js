import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import CancelledOrderDetailMain from "../components/orders/CancelledOrderDetailMain";

const CancelledOrderDetailScreen = ({ match }) => {
  const orderId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <CancelledOrderDetailMain orderId={orderId} />
      </main>
    </>
  );
};

export default CancelledOrderDetailScreen;
