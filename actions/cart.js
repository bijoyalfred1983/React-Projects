/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

export const fetchPageData = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'CART_REQUESTING' });
  try {
    const response = await axios.get(azURL('cart'));
    dispatch({ type: 'CART_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'CART_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.cart.readyStatus === 'CART_SUCCESS') return false; // Preventing double fetching data

  return true;
};

const fetchCartData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchView(getState())) {
    return dispatch(fetchPageData());
  }
  return null;
};

export default fetchCartData;
