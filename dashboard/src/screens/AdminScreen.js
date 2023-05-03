import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";

import AdminInfo from "../components/users/AdminInfo";
import AdminComponent from "../components/users/AdminComponent";

const AdminScreen= () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AdminComponent></AdminComponent>
        
      </main>
    </>
  );
};

export default AdminScreen;