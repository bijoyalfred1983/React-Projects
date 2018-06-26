/* @flow */
import type { CartUpdateData, Action } from '../types';

const initialState = {
  readyStatus: 'ITEMQUANTITY_INVALID',
  err: null,
  orderSummaryData: {},
  checkoutData: {},
  quantityData: {},
  removeData: {},
  storeData: {},
  promoData: {},
  promoMessage: false,
  commerceId: '',
  cartSuccessNote: false,
  cartMiniCartData: {},
  checkoutMessageData: {}
};

let count = 1;
let cartVerifyData = {};
let cartItemError = {};
const cartUpdate = (
  state: CartUpdateData = initialState,
  action: Action
): CartUpdateData => {
  count += 1;
  switch (action.type) {
    case 'ITEMQUANTITY_FAILURE':
      return {
        ...state,
        readyStatus: 'ITEMQUANTITY_FAILURE',
        err: action.err,
        errorValue: count,
        commerceId: action.id,
        cartSuccessNote: true
      };
    case 'ITEMQUANTITY_SUCCESS':
      return {
        ...state,
        readyStatus: 'ITEMQUANTITY_SUCCESS',
        quantityData: action.data,
        quantityValue: action.values,
        commerceId: action.id,
        cartSuccessNote: true,
        err: null
      };
    case 'STORECHANGE_FAILURE':
      return {
        ...state,
        readyStatus: 'STORECHANGE_FAILURE',
        err: action.err,
        commerceId: action.id
      };
    case 'STORECHANGE_SUCCESS':
      return {
        ...state,
        readyStatus: 'STORECHANGE_SUCCESS',
        storeData: action.data,
        commerceId: action.id,
        err: null
      };
    case 'CHECKOUT_VERIFY_FAILURE':
      return {
        ...state,
        readyStatus: 'CHECKOUT_VERIFY_FAILURE',
        err: action.err
      };
    case 'CHECKOUT_VERIFY_SUCCESS':
      return {
        ...state,
        readyStatus: 'CHECKOUT_VERIFY_SUCCESS',
        promoMessage: true,
        checkoutMessageData: action.data
      };
    case 'PROMOCODE_APPLY_FAILURE':
      return {
        ...state,
        readyStatus: 'PROMOCODE_APPLY_FAILURE',
        promoMessage: true,
        err: action.err
      };
    case 'PROMOCODE_APPLY_SUCCESS':
      return {
        ...state,
        readyStatus: 'PROMOCODE_APPLY_SUCCESS',
        promoMessage: true,
        promoData: action.data,
        err: null
      };
    case 'RESET_PROMO_CART':
      return {
        ...state,
        promoMessage: false,
        promoData: {},
        checkoutMessageData: {},
        err: null,
        errorValue: null
      };
    case 'PROMOCODE_REMOVE_FAILURE':
      return {
        ...state,
        readyStatus: 'PROMOCODE_REMOVE_FAILURE',
        promoMessage: true,
        err: action.err
      };
    case 'PROMOCODE_REMOVE_SUCCESS':
      return {
        ...state,
        readyStatus: 'PROMOCODE_REMOVE_SUCCESS',
        promoMessage: true,
        // promoData: action.data,
        err: null
      };
    case 'CART_MINICART_FAILURE':
      return {
        ...state,
        readyStatus: 'CART_MINICART_FAILURE',
        err: action.err
      };
    case 'CART_MINICART_SUCCESS':
      return {
        ...state,
        readyStatus: 'CART_MINICART_SUCCESS',
        cartMiniCartData: action.data.miniCartMap
      };
    case 'CART_VERIFY_REQUESTING':
      return {
        ...state,
        readyStatus: 'CART_VERIFY_REQUESTING'
      };
    case 'CART_VERIFY_SUCCESS':
      cartVerifyData = action.data;
      cartItemError = cartVerifyData.commerceItemsList.filter(
        item => item.itemHasError
      );
      return {
        ...state,
        readyStatus: 'CART_SUCCESS',
        cartItemError
      };
    case 'CART_VERIFY_FAILURE':
      return {
        ...state,
        readyStatus: 'CART_VERIFY_FAILURE',
        err: action.err
      };
    case 'CLEAR_CART_PAGE_DATA':
      return {
        ...state,
        err: null,
        promoMessage: false,
        cartSuccessNote: false,
        promoData: {}
      };
    case 'EMPTY_DATA':
      return {
        ...state,
        err: null,
        promoMessage: false,
        cartSuccessNote: false
      };
    default:
      return state;
  }
};

export default cartUpdate;
