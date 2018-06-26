/* @flow */

import type { OrderDetailsData, Action } from '../types';

const initialState = {
  readyStatus: 'ORDER_DETAILS_INVALID',
  err: null
};

const orderDetails = (
  state: OrderDetailsData = initialState,
  action: Action
): OrderDetailsData => {
  switch (action.type) {
    case 'ORDER_DETAILS_REQUESTING':
      return {
        ...state,
        readyStatus: 'ORDER_DETAILS_REQUESTING'
      };
    case 'ORDER_DETAILS_FAILURE':
      return {
        ...state,
        readyStatus: 'ORDER_DETAILS_FAILURE',
        err: action.err
      };
    case 'ORDER_DETAILS_SUCCESS':
      return {
        ...state,
        readyStatus: 'ORDER_DETAILS_SUCCESS',
        data: { ...state.data, ...action.data }
      };

    default:
      return state;
  }
};

export default orderDetails;
