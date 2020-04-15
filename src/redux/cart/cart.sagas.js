import { takeLatest, call, put, all } from "redux-saga/effects";
import { userActionTypes } from "../user/user.types";
import { clearCart } from "./cart.actions";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* OnSignOutSucces() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCES, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(OnSignOutSucces)]);
}
