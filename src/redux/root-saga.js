import { all, call } from "redux-saga/effects";
import { fetchCollectionsStart } from "./shop/shop.sagas";

function* rootSaga() {
  yield all([call(fetchCollectionsStart)]);
}

export default rootSaga;
