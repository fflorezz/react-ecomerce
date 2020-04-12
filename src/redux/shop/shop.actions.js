import ShopActionsTypes from "./shop.types";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "./../../firebase/firebase.utils";

export const fetchCollectionSucces = (collectionsMap) => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCES,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionsTypes.FECTH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");

    collectionRef
      .get()
      .then((snapshot) => {
        const colllectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionSucces(colllectionsMap));
      })
      .catch((err) => dispatch(fetchCollectionsFailure(err.message)));
  };
};
