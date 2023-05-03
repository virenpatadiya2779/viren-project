import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { 
  userListReducer,
  userLoginReducer,
  userDetailReducer,
  userToAdminReducer,
  userRemoveReducer,
} from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
  orderStatusReducer,
  cancelledOrderListReducer,
  orderCancelledMailReducer
} from "./Reducers/OrderReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetail: userDetailReducer,
  userAdmin: userToAdminReducer,
  userRemove: userRemoveReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  cancelledOrderList: cancelledOrderListReducer,
  refundMail: orderCancelledMailReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
  orderStatus: orderStatusReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
