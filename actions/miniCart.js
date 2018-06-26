/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

// const urlPath = azURL('miniCart');

export const miniCartData = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'MINICART_REQUESTING' });
  try {
    const response = await axios.get(azURL('miniCart')); // backend
    dispatch({ type: 'MINICART_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'MINICART_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.header.miniCartReadyStatus === 'MINICART_SUCCESS') return false; // Preventing double fetching data

  return true;
};

const fetchMiniCartData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchView(getState())) {
    return dispatch(miniCartData());
  }
  return null;
};

export default fetchMiniCartData;
