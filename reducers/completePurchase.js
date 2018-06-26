/* @flow */
import type { Action } from '../types';

const initialState = {
  readyStatus: 'ORDER_SUMMARY_INVALID',
  err: null,
  completePurchaseData: {}
};

const completePurchase = (state: initialState, action: Action) => {
  switch (action.type) {
    case 'COMPLETE_REQUESTING':
      return {
        ...state,
        readyStatus: 'COMPLETE_REQUESTING'
      };
    case 'COMPLETE_FAILURE':
      return {
        ...state,
        readyStatus: 'COMPLETE_FAILURE',
        err: action.err
      };
    case 'COMPLETE_SUCCESS':
      return {
        ...state,
        readyStatus: 'COMPLETE_SUCCESS',
        completePurchaseData: action.data
      };
    default:
      return {
        ...state
      };
  }
};

export default completePurchase;
