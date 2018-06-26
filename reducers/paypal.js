/* @flow */

import type { PaypalData, Action } from '../types';

const initialState = {
  readyStatus: 'PAYPAL_INVALID',
  err: null,
  data: {}
};

const paypal = (
  state: PaypalData = initialState,
  action: Action
): PaypalData => {
  switch (action.type) {
    case 'PAYPAL_LOOKUP_REQUESTING':
      return {
        ...state,
        readyStatus: 'PAYPAL_LOOKUP_REQUESTING'
      };
    case 'PAYPAL_LOOKUP_FAILURE':
      return {
        ...state,
        readyStatus: 'PAYPAL_LOOKUP_FAILURE',
        err: action.err
      };
    case 'PAYPAL_LOOKUP_SUCCESS':
      return {
        ...state,
        readyStatus: 'PAYPAL_LOOKUP_SUCCESS',
        data: action.data,
        err: null
      };
    case 'PAYPAL_AUTH_REQUESTING':
      return {
        ...state,
        readyStatus: 'PAYPAL_AUTH_REQUESTING'
      };
    case 'PAYPAL_AUTH_FAILURE':
      return {
        ...state,
        readyStatus: 'PAYPAL_AUTH_FAILURE',
        err: action.err
      };
    case 'PAYPAL_CHECKOUT_AUTH_SUCCESS':
      return {
        ...state,
        readyStatus: 'PAYPAL_CHECKOUT_AUTH_SUCCESS',
        data: action.data,
        err: null
      };
    case 'PAYPAL_CART_AUTH_SUCCESS':
      return {
        ...state,
        readyStatus: 'PAYPAL_CART_AUTH_SUCCESS',
        data: action.data,
        err: null
      };
    default:
      return state;
  }
};

export default paypal;
