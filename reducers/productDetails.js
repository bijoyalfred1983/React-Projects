/* @flow */

import _ from 'lodash/fp';

import type { ProductData, Action } from '../types';

type State = ProductData;

const initialState = {
  readyStatus: 'PRODUCT_INVALID',
  err: null,
  viewInfo: {},
  cartSuccess: {},
  cartItemsPDP: [],
  cartSuccessNote: false,
  storeAvailability: false
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'PRODUCT_REQUESTING':
      return _.assign(state, {
        readyStatus: 'PRODUCT_REQUESTING'
      });
    case 'PRODUCT_FAILURE':
      return _.assign(state, {
        readyStatus: 'PRODUCT_FAILURE',
        err: action.err
      });
    case 'PRODUCT_SUCCESS':
      return _.assign(state, {
        readyStatus: 'PRODUCT_SUCCESS',
        cartSuccessNote: false,
        viewInfo: action.data
      });
    case 'CLEAR_PREVIOUS_PRODUCT_PAGE':
      return {
        ...state,
        viewInfo: {},
        readyStatus: 'PRODUCT_INVALID',
        cartItemsPDP: [],
        cartItems: []
      };
    case 'ADD_TO_CART_SUCCESS':
      return Object.assign({}, state, {
        cartSuccessNote: true,
        cartSuccess: action.data,
        cartItemsPDP: [...state.cartItemsPDP, action.skuNumber],
        productImage: action.image
      });
    case 'ADD_TO_CART_FAILURE':
      return _.assign(state, {
        readyStatus: 'PRODUCT_SUCCESS',
        err: action.err
      });
    case 'EMPTY_DATA':
      return _.assign(state, {
        cartSuccess: {},
        cartSuccessNote: false
      });
    case 'EMPTY_CART_ITEMS':
      return {
        ...state,
        cartItems: [],
        cartItemsPDP: []
      };
    case 'STORE_AVAIL_PRODUCT':
      return _.assign(state, {
        storeAvailability: true
      });
    default:
      return state;
  }
};
