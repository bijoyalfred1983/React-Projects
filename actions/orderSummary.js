/* @flow */
import axios from 'axios';
import { push } from 'react-router-redux';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

export const fetchData = (url: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'ORDER_SUMMARY_REQUESTING' });

  try {
    const response = await axios.get(url);
    dispatch({ type: 'ORDER_SUMMARY_SUCCESS', data: response.data });
    dispatch({ type: 'CHECKOUT_PROMO_UPDATE_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'ORDER_SUMMARY_FAILURE', err: err.message });
  }
};

export const fetchVerifyCartData = (): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'CART_VERIFY_REQUESTING' });
  try {
    const response = await axios.get(azURL('cart'));
    dispatch({ type: 'CART_VERIFY_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'CART_VERIFY_FAILURE', err: err.message });
  }
};

export const checkOut = (
  url: string,
  paypalReq: boolean
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'CHECKOUT_VERIFY_REQUESTING' });
  try {
    const response = await axios.get(url);
    // dispatch({ type: 'CHECKOUT_VERIFY_SUCCESS', data: response.data });
    if (
      response.status === 200 &&
      response.data &&
      response.data.orderEligibleForCheckout
    ) {
      if (paypalReq) {
        return true;
      }
      dispatch(push('/checkout'));
      return true;
    }
    dispatch(fetchVerifyCartData());
    dispatch({ type: 'CHECKOUT_VERIFY_SUCCESS', data: response.data });
    return false;
  } catch (err) {
    dispatch({ type: 'CHECKOUT_VERIFY_FAILURE', err });
    return false;
  }
};

export const emptyErrorData = () => (dispatch: Dispatch) =>
  dispatch({ type: 'EMPTY_DATA' });

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'ORDER_SUMMARY_SUCCESS') return false; // Preventing double fetching data

  return true;
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchCheckout = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'ORDER_SUMMARY_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const fetchOrderSummaryData = /* istanbul ignore next */ (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  if (shouldFetchView(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchData(azURL('cartOrderSummary')));
  }

  /* istanbul ignore next */
  return null;
};

export const fetchCheckout = /* istanbul ignore next */ (
  paypalReq: boolean = false
): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  /* istanbul ignore next */
  if (shouldFetchCheckout(getState())) {
    /* istanbul ignore next */
    return dispatch(checkOut(azURL('verifyOrderCheckout'), paypalReq));
  }

  /* istanbul ignore next */
  return null;
};
