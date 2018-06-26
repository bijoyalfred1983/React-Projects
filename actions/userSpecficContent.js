/* @flow */

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const API_URL = azURL('personalizedContentBlock');

// Export this for unit testing more easily
export const fetchUserContent = (
  axios: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'USER_REQUESTING', userId });

  try {
    const res = await axios.get(`${URL}`);

    dispatch({ type: 'USER_CONTENT_SUCCESS', data: res.data });
  } catch (err) {
    dispatch({ type: 'USER_CONTENT_FAILURE', err: err.message });
  }
};

// Using for preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchUserContent = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  const { userContent } = state;

  // Preventing dobule fetching data in production
  if (userContent && userContent.readyStatus === 'USER_CONTENT_SUCCESS')
    return false;

  return true;
};

/* istanbul ignore next */
export const fetchUserContentIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldFetchUserContent(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchUserContent(axios));
  }

  /* istanbul ignore next */
  return null;
};
