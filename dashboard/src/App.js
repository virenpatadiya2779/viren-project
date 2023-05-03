import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import CancelledOrderScreen from "./screens/CancelledOrderScreen";
import CancelledOrderDetailScreen from "./screens/CancelledOrderDetailScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders, cancelledOrdersList } from "./Redux/Actions/OrderActions";
// import UserInfo from "./components/users/userInfo";
import Userinfoscreen from "./screens/Userinfoscreen";
import AdminInfoScreen from "./screens/AdminInfoScreen";
import AdminScreen from "./screens/AdminScreen";
import SuperAdminRouter from "./SuperAdminRouter";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listOrders());
      dispatch(cancelledOrdersList());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/cancelledOrders" component={CancelledOrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/cancelledOrder/:id" component={CancelledOrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <SuperAdminRouter path="/Admin" component={AdminScreen} />
          <PrivateRouter path="/userInfo/:id" component={Userinfoscreen} />
          <PrivateRouter path="/adminInfo/:id" component={AdminInfoScreen} />
          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
