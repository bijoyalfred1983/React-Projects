import type { Action } from '../types';

const initialState = {
  readyStatus: 'CHECKOUT_INVALID',
  err: null,
  completePurchaseData: {}
};

const complete = (state: any = initialState, action: Action) => {
  switch (action.type) {
    case 'COMPLETE_REQUESTING':
      return {
        ...state,
        readyStatus: 'CHECKOUT_REQUESTING'
      };
    case 'COMPLETE_FAILURE':
      return {
        ...state,
        readyStatus: 'CHECKOUT_FAILURE',
        err: action.err
      };
    case 'COMPLETE_SUCCESS':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS',
        completePurchaseData: action.data
      };
    case 'LITLEPAY_ERROR':
      return {
        ...state,
        readyStatus: 'LITLEPAY_ERROR',
        errorMessage: action.data
      };
    default:
      return state;
  }
};

export default complete;
