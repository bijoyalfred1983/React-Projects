// @flow
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const API_URL = azURL('currentUserResetPwd');
// Export this for unit testing more easily
export const submitForm = (
  axios: any,
  values: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'SUBMITFORGOT_REQUESTING' });
  try {
    const res = await axios.post(URL, values); // backend
    dispatch({ type: 'SUBMITRESET_SUCCESS', data: res.data });
  } catch (err) {
    dispatch({ type: 'SUBMITRESET_FAILURE', err: err.message });
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetch = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'SUBMITRESET_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const submitResetFormAction = /* istanbul ignore next */ (
  values: Object
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  /* istanbul ignore next */
  if (shouldFetch(getState())) {
    /* istanbul ignore next */
    return dispatch(submitForm(axios, values));
  }
  /* istanbul ignore next */
  return null;
};
