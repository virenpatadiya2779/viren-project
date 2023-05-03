import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import UserInfo from "../components/users/userInfo";

const Userinfoscreen= () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserInfo></UserInfo>
        
      </main>
    </>
  );
};

export default Userinfoscreen;