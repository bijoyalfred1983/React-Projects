/* @flow */
import type { OrderConfirmationData, Action } from '../types';

const initialState = {
  readyStatus: 'ORDER_CONFIRMATION_INVALID',
  err: null,
  data: {
    disableBOPUSModal: false,
    showBOPUSModal: false
  }
};

const orderConfirmation = (
  state: OrderConfirmationData = initialState,
  action: Action
): OrderConfirmationData => {
  switch (action.type) {
    case 'ORDER_CONFIRMATION_REQUESTING':
      return {
        ...state,
        readyStatus: 'ORDER_CONFIRMATION_REQUESTING'
      };
    case 'ORDER_CONFIRMATION_FAILURE':
      return {
        ...state,
        readyStatus: 'ORDER_CONFIRMATION_FAILURE',
        err: action.err
      };
    case 'ORDER_CONFIRMATION_SUCCESS':
      return {
        ...state,
        readyStatus: 'ORDER_CONFIRMATION_SUCCESS',
        data: { ...state.data, ...action.data }
      };
    case 'ORDER_CONFIRMATION_DISABLE_BOPUS_MODAL':
      return {
        ...state,
        data: { ...state.data, ...{ disableBOPUSModal: true } }
      };
    case 'ORDER_CONFIRMATION_SHOW_BOPUS_MODAL':
      return {
        ...state,
        data: { ...state.data, ...{ showBOPUSModal: true } }
      };
    case 'ORDER_CONFIRMATION_CLOSE_BOPUS_MODAL':
      return {
        ...state,
        data: { ...state.data, ...{ showBOPUSModal: false } }
      };
    default:
      return state;
  }
};

export default orderConfirmation;
