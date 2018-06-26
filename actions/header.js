/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

export const headerData = (): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'HEADER_REQUESTING' });
  try {
    const response = await axios.get(azURL('header'));
    dispatch({ type: 'HEADER_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'HEADER_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.cart.readyStatus === 'HEADER_SUCCESS') return false; // Preventing double fetching data

  return true;
};

const fetchHeaderData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchView(getState())) {
    return dispatch(headerData());
  }
  return null;
};

export default fetchHeaderData;
