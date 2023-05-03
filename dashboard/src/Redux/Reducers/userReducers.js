import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_RESET,
  USER_DETAIL_SUCCESS,
  USER_STATUS_CHANGE_FAIL,
  USER_STATUS_CHANGE_REQUEST,
  USER_STATUS_CHANGE_SUCCESS,
  USER_REMOVE_FAIL,
  USER_REMOVE_REQUEST,
  USER_REMOVE_SUCCESS,
} from "../Constants/UserContants";

// LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// ALL USER
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// GET USER BY ID
export const userDetailReducer = (state = { users: {} }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { loading: true };
    case USER_DETAIL_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAIL_RESET:
      return { users: {} };
    default:
      return state;
  }
};

// CHANGE USER TO ADMIN
export const userToAdminReducer = (state = {} , action) => {
  switch (action.type) {
    case USER_STATUS_CHANGE_REQUEST:
      return { ...state, loading: true };
    case USER_STATUS_CHANGE_SUCCESS:
      return { ...state, loading: false, success: true };
    case USER_STATUS_CHANGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// REMOVE USER
export const userRemoveReducer = (state = {} , action) => {
  switch (action.type) {
    case USER_REMOVE_REQUEST:
      return { ...state, loading: true };
    case USER_REMOVE_SUCCESS:
      return { ...state, loading: false, success: true };
    case USER_REMOVE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};