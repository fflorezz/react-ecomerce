import { takeLatest, call, put, all } from "redux-saga/effects";

import ShopActionsTypes from "./shop.types";
import { firestore } from "../../firebase/firebase.utils";
import { convertCollectionsSnapshotToMap } from "./../../firebase/firebase.utils";
import { fetchCollectionSucces, fetchCollectionsFailure } from "./shop.actions";

function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapShot = yield collectionRef.get();
    const colllectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapShot
    );
    yield put(fetchCollectionSucces(colllectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionsTypes.FETCH_COLLECTIONS_START_ASYNC,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
