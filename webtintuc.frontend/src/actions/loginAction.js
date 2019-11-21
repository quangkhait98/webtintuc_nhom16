import { createAction } from "redux-actions";

export const loginFacebookRequest = createAction("LOGIN_FACEBOOK_REQUEST");
export const loginFacebookError = createAction("LOGIN_FACEBOOK_ERROR");
export const loginFacebookSuccess = createAction("LOGIN_FACEBOOK_SUCCESS");
export const loginFacebook = () => {
  return async (dispatch, getState) => {
    dispatch(loginFacebookRequest());
    console.log('aaaaaaaaa')
    await fetch(`http://localhost:8001/auth/facebook`)
      .then(response => response.json())
      .then(data => dispatch(loginFacebookSuccess(data)))
      .catch(error => dispatch(loginFacebookError(error)));
  };
};
