import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCES:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_OUT_FAILURE:
    case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case userActionTypes.SIGN_OUT_SUCCES:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case userActionTypes.SIGN_UP_SUCCES:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
