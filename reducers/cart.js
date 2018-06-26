/* @flow */
import type { CartData, Action } from '../types';

const initialState = {
  readyStatus: 'CART_INVALID',
  err: null,
  cartData: {},
  orderSummary: {},
  cartVerifyData: {},
  cartItemError: {}
};

let cartData = {};
const cart = (state: CartData = initialState, action: Action): CartData => {
  switch (action.type) {
    case 'CART_REQUESTING':
      return {
        ...state,
        readyStatus: 'CART_REQUESTING'
      };
    case 'CART_FAILURE':
      return {
        ...state,
        readyStatus: 'CART_FAILURE',
        err: action.err
      };
    case 'CART_SUCCESS':
      return {
        ...state,
        readyStatus: 'CART_SUCCESS',
        cartData: action.data
      };
    case 'REMOVECART_FAILURE':
      return {
        ...state,
        readyStatus: 'CART_SUCCESS',
        err: action.err
      };
    case 'REMOVECART_SUCCESS':
      cartData = { ...state.cartData };
      cartData.commerceItemsList = state.cartData.commerceItemsList.filter(
        item => action.id !== item.commerceItemId
      );
      return {
        ...state,
        readyStatus: 'CART_SUCCESS',
        cartData,
        removeData: action.data
      };
    default:
      return state;
  }
};

export default cart;
