import { userActionTypes } from "./user.types";

export const googleSignInStart = () => ({
  type: userActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: userActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSucces = (user) => ({
  type: userActionTypes.SIGN_IN_SUCCES,
  payload: user,
});

export const signInFailure = (error) => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START,
});

export const signOutSucces = () => ({
  type: userActionTypes.SIGN_OUT_SUCCES,
});

export const signOutFailure = (error) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (newUserData) => ({
  type: userActionTypes.SIGN_UP_START,
  payload: newUserData,
});

export const signUpSucces = () => ({
  type: userActionTypes.SIGN_UP_SUCCES,
});

export const signUpFailure = (error) => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
