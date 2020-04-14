import ShopActionsTypes from "./shop.types";

export const fetchCollectionSucces = (collectionsMap) => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCES,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionsTypes.FECTH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_START_ASYNC,
});
