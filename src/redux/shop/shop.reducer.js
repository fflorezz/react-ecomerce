import ShopActionsTypes from "./shop.types";

const INITIAL_STATE = {
  collections: null,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionsTypes.FETCH_COLLECTIONS_SUCCES:
      return {
        ...state,
        collections: action.payload,
      };
    case ShopActionsTypes.FECTH_COLLECTIONS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
