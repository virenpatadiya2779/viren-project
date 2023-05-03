import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AdminInfo from "../components/users/AdminInfo";

const AdminInfoScreen= () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AdminInfo />
      </main>
    </>
  );
};

export default AdminInfoScreen;