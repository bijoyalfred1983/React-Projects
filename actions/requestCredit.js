/* @flow */
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const API_URL = azURL('requestCredit');

// Export this for unit testing more easily
export const fetchUsers = (
  axios: any,
  values: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'REQUEST_CREDIT_REQUESTING' });

  try {
    const res = await axios.post(URL, values); // backend
    dispatch({ type: 'REQUEST_CREDIT_SUCCESS', data: res.data });
  } catch (err) {
    dispatch({ type: 'REQUEST_CREDIT_FAILURE', err });
  }
};

const shouldFetch = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'REQUEST_CREDIT_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const submitFormAction = /* istanbul ignore next */ (
  values: any
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  /* istanbul ignore next */
  if (shouldFetch(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchUsers(axios, values));
  }

  /* istanbul ignore next */
  return null;
};
