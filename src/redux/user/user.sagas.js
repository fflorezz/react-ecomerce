import { takeLatest, put, all, call, takeEvery } from "redux-saga/effects";

import { userActionTypes } from "./user.types";
import {
  googleProvider,
  auth,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  signInSucces,
  signInFailure,
  signOutSucces,
  signOutFailure,
  signUpFailure,
  signUpSucces,
} from "./user.actions";

function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(
      signInSucces({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* isUserAuth() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuth);
}

function* signOutAuth() {
  try {
    yield auth.signOut();
    yield put(signOutSucces());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

function* onSignOut() {
  yield takeEvery(userActionTypes.SIGN_OUT_START, signOutAuth);
}

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const userRef = yield call(createUserProfileDocument, user, {
      displayName,
    });
    if (userRef) {
      yield put(signUpSucces());
      yield alert("Sign up success!!!");
      yield isUserAuth();
    }
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOut),
    call(onSignUpStart),
  ]);
}
