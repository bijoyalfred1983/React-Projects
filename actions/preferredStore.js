/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

export const fetchPreferredStore = (): ThunkAction => async (
  dispatch: Dispatch
) => {
  // dispatch({ type: 'FETCH_PREFERRED_STORE_REQUESTING' });
  try {
    const response = await axios.get(azURL('preferredStore'));
    dispatch({ type: 'FETCH_PREFERRED_STORE_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({
      type: 'FETCH_PREFERRED_STORE_FAILURE',
      err: err && err.message
    });
  }
};

/* istanbul ignore next */
const shouldFetchData = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.preferredStore.readyStatus === 'FETCH_PREFERRED_STORE_SUCCESS')
    return false; // Preventing double fetching data

  return true;
};

export const fetchPreferredStoreData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchData(getState())) {
    return dispatch(fetchPreferredStore());
  }
  return null;
};
