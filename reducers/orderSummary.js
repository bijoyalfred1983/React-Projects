/* @flow */
import type { OrderSummaryData, Action } from '../types';

const initialState = {
  readyStatus: 'ORDER_SUMMARY_INVALID',
  err: null,
  orderSummaryData: {},
  checkoutData: {},
  checkoutError: 'SAMPLE',
  promoMessage: false
};

const orderSummary = (
  state: OrderSummaryData = initialState,
  action: Action
): OrderSummaryData => {
  switch (action.type) {
    case 'ORDER_SUMMARY_REQUESTING':
      return {
        ...state,
        readyStatus: 'ORDER_SUMMARY_REQUESTING'
      };
    case 'ORDER_SUMMARY_FAILURE':
      return {
        ...state,
        readyStatus: 'ORDER_SUMMARY_FAILURE',
        err: action.err
      };
    case 'ORDER_SUMMARY_SUCCESS':
      return {
        ...state,
        readyStatus: 'ORDER_SUMMARY_SUCCESS',
        orderSummaryData: action.data,
        promoMessage: true
      };
    case 'EMPTY_DATA':
      return {
        ...state,
        err: null,
        promoMessage: false
      };
    default:
      return state;
  }
};

export default orderSummary;
