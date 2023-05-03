import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import CancelledOrderMain from "../components/orders/CancelledOrderMain";

const CancelledOrderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <CancelledOrderMain />
      </main>
    </>
  );
};

export default CancelledOrderScreen;
