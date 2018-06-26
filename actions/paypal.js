/* @flow */
import axios from 'axios';
import { push } from 'react-router-redux';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

//* ***************** PAYPAL LOOKUP ******************

const lookupURL = azURL('paypalLookup');

export const paypalLookup = (
  isCheckoutPageCall: boolean,
  URL: string = lookupURL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'PAYPAL_LOOKUP_REQUESTING' });
  try {
    const { data } = await axios.post(URL, { isCheckoutPageCall });
    sessionStorage.setItem('azCartOrderId', data.orderId);
    dispatch({ type: 'PAYPAL_LOOKUP_SUCCESS', data });
  } catch (err) {
    dispatch({ type: 'PAYPAL_LOOKUP_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchLookupData = (state: ReduxState): boolean => {
  if (__DEV__) return true;
  if (state.paypal.readyStatus === 'PAYPAL_LOOKUP_SUCCESS') return false;
  return true;
};

const handlePaypalLookup = /* istanbul ignore next */ (
  isCheckoutPageCall: boolean
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchLookupData(getState())) {
    return dispatch(paypalLookup(isCheckoutPageCall));
  }
  return null;
};

//* ***************** PAYPAL AUTHENTICATE ******************

const authURL = azURL('paypalAuth');

export const paypalAuth = (
  isCheckoutPageCall: boolean,
  payload: string,
  orderId: string,
  URL: string = authURL
): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'PAYPAL_AUTH_REQUESTING' });
  axios
    .post(URL, {
      isCheckoutPageCall,
      orderId,
      payload
    })
    .then(response => {
      const { data, status } = response;
      if (status === 200) {
        if (isCheckoutPageCall) {
          dispatch({ type: 'PAYPAL_CHECKOUT_AUTH_SUCCESS', data });
        } else {
          dispatch({ type: 'PAYPAL_CART_AUTH_SUCCESS', data });
          dispatch(push('/checkout'));
        }

        sessionStorage.removeItem('azCartOrderId');
      }
    })
    .catch(err => {
      dispatch({ type: 'PAYPAL_AUTH_FAILURE', err: err.message });
    });
};

/* istanbul ignore next */
const shouldFetchAuthData = (state: ReduxState): boolean => {
  if (__DEV__) return true;
  if (
    state.paypal.readyStatus === 'PAYPAL_CHECKOUT_AUTH_SUCCESS' ||
    state.paypal.readyStatus === 'PAYPAL_CART_AUTH_SUCCESS'
  )
    return false;
  return true;
};

const handlePaypalAuth = /* istanbul ignore next */ (
  isCheckoutPageCall: boolean,
  payload: string,
  orderId: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchAuthData(getState())) {
    return dispatch(paypalAuth(isCheckoutPageCall, payload, orderId));
  }
  return null;
};

export { handlePaypalLookup, handlePaypalAuth };
