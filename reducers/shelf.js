/* @flow */

import type { ShelfData, Action } from '../types';

type State = ShelfData;

const initialState = {
  readyStatus: 'PARTS_INVALID',
  isList: true,
  parts: {},
  skuIds: [],
  relatedParts: {},
  relatedProducts: {},
  err: null,
  cartSuccess: {},
  cartItems: [],
  cartSuccessNote: false,
  productImageUrl: ''
};

const shelf = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SET_VIEW':
      return {
        ...state,
        isList: action.view,
        readyStatus: 'SET_VIEW_SUCCESS'
      };
    case 'PARTS_SUCCESS':
      return {
        ...state,
        parts: action.data,
        readyStatus: 'PARTS_SUCCESS',
        cartSuccessNote: false,
        cartSuccess: {}
      };
    case 'CLEAR_PREVIOUS_PAGE':
      return {
        ...state,
        cartSuccessNote: false,
        parts: {}
      };

    case 'PARTS_FAILURE':
      return {
        ...state,
        readyStatus: 'PARTS_FAILURE',
        err: action.err,
        cartSuccessNote: false,
        cartSuccess: {}
      };
    case 'PARTS_REQUESTING':
      return {
        ...state,
        readyStatus: 'PARTS_REQUESTING',
        cartSuccess: {}
      };
    case 'ADD_TO_CART_SUCCESS':
      return {
        ...state,
        cartSuccess: action.data,
        readyStatus: 'ADD_TO_CART_SUCCESS',
        cartSuccessNote: true,
        productImageUrl: action.productImageUrl,
        productData: action.productData,
        cartItems: [...state.cartItems, action.skuNumber]
      };
    case 'EMPTY_DATA':
      return {
        ...state,
        cartSuccessNote: false,
        cartSuccess: {}
      };
    case 'EMPTY_CART_ITEMS':
      return {
        ...state,
        readyStatus: 'PARTS_INVALID',
        isList: true,
        parts: {},
        skuIds: [],
        relatedParts: {},
        relatedProducts: {},
        err: null,
        cartSuccess: {},
        cartItems: [],
        cartSuccessNote: false,
        productImageUrl: ''
      };
    default:
      return state;
  }
};

export default shelf;
