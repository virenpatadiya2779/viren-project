import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function SuperAdminRouter({ component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Route
      {...rest}
      component={(props) => {
        if (userInfo && userInfo.isSuperAdmin) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/`} />;
        }
      }}
    />
  );
}

export default SuperAdminRouter;
