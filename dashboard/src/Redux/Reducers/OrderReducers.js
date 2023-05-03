import {
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  CANCELLED_ORDER_LIST_FAIL,
  CANCELLED_ORDER_LIST_REQUEST,
  CANCELLED_ORDER_LIST_SUCCESS,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_SUCCESS,
  AMOUNT_REFUNDED_MAIL_FAIL,
  AMOUNT_REFUNDED_MAIL_REQUEST,
  AMOUNT_REFUNDED_MAIL_SUCCESS,
} from "../Constants/OrderConstants";

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// CANCELLED ORDERS LIST
export const cancelledOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case CANCELLED_ORDER_LIST_REQUEST:
      return { loading: true };
    case CANCELLED_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case CANCELLED_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ORDER DETAILS
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ORDER DELIVERED
export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

// CHANGE ORDER STATUS
export const orderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_STATUS_REQUEST:
      return { loading: true };
    case ORDER_STATUS_SUCCESS:
      return { loading: false, success: true };
    case ORDER_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// ORDER CANCELLED AND AMOUNT REFUNDED MAIL SENT
export const orderCancelledMailReducer = (state = {}, action) => {
  switch (action.type) {
    case AMOUNT_REFUNDED_MAIL_REQUEST:
      return { loading: true };
    case AMOUNT_REFUNDED_MAIL_SUCCESS:
      return { loading: false, success: true };
    case AMOUNT_REFUNDED_MAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};