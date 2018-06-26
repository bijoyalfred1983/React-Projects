/* @flow */
import type { CartData, Action } from '../types';

export const addressSRErrorMessage = `  Unfortunately, the shipping address you entered is not eligible for ShopRunner shipping. To complete your order: Change your shipping address AND Click Checkout to continue with AutoZone shipping.`;
const initialState = {
  readyStatus: 'CHECKOUT_INVALID',
  err: null,
  cartData: {},
  checkOutData: {},
  paymentLayout: 'CARD',
  fedExDetails: {},
  fedExValidated: false,
  formValueAdded: false,
  shopRunnerDetails: {},
  orderSummary: {},
  shippingMethods: {},
  fedExError: '',
  isAddressError: false,
  enteredAddress: {},
  form: {},
  BillingFormValues: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    Address1: '',
    Address2: '',
    zipCode: '',
    state: ''
  },
  AddressFormValues: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    Address1: '',
    Address2: '',
    zipCode: '',
    state: '',
    terms: true
  },
  nddError: null
};

export const getFedExError = action => {
  let message = '';
  if (action && action.data) {
    message =
      action.data.shopRunnerDetails &&
      !action.data.shopRunnerDetails.shippingAddressEligibleForSR
        ? addressSRErrorMessage
        : '';
  }
  return message;
};

const checkout = (state: CartData = initialState, action: Action): CartData => {
  switch (action.type) {
    case 'CHECKOUT_REQUESTING':
      return {
        ...state,
        readyStatus: 'CHECKOUT_REQUESTING'
      };
    case 'CHECKOUT_FAILURE':
      return {
        ...state,
        readyStatus: 'CHECKOUT_FAILURE',
        err: action.err
      };
    case 'CHECKOUT_SUCCESS':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS',
        checkOutData: action.data,
        BillingFormValues: initialState.BillingFormValues,
        shopRunnerDetails: action.data.shopRunnerDetails,
        orderSummary: action.data.orderSummaryVO,
        shippingMethods: action.data.shippingMethods,
        lineItemList: action.data.lineItemsListVO
      };
    case 'UPDATE_DELIVERY_SUCCESS':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS',
        orderSummary: action.data.orderSummary,
        shippingMethodSelected: action.data.shippingMethodSelected,
        method: action.method ? action.method : state.method,
        nddError: null,
        lineItemList: action.data.lineItemsListVO
      };
    case 'UPDATE_DELIVERY_FAILURE':
      return {
        ...state,
        err: action.err,
        nddError: action.err.response.data.title
      };
    case 'SET_LAYOUT':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS',
        paymentLayout: action.layout
      };
    case 'SET_CARD_TYPE':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS',
        cardType: action.data
      };
    case 'LOAD_FORM_DATA':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS',
        paymentLayout: action.layout
      };
    case 'FEDX_VALIDATION_SUCCESS':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS',
        fedExDetails: action.data,
        fedExValidated: !action.data.suggestedAddress,
        shopRunnerDetails: action.data.shopRunnerDetails,
        orderSummary: action.data.orderSummary,
        lineItemList: action.data.lineItemsListVO,
        shippingMethods: action.data.shippingMethods,
        enteredAddress: action.enteredAddress,
        fedExError: getFedExError(action),
        isAddressError:
          action.data.shopRunnerDetails &&
          !action.data.shopRunnerDetails.shippingAddressEligibleForSR
      };
    case 'FEDX_VALIDATION_FAILURE':
      return {
        ...state,
        fedExError:
          action.err.response.data.title ||
          (action.err.response.data['o:errorPath'] &&
            action.err.response.data['o:errorPath'].title),
        isAddressError: true
      };
    case 'SET_FORM_DATA':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS',
        formValues: action.addressForm,
        formValueAdded: true,
        form: { AddressFormValues: action.addressForm }
      };
    case 'SRVALIDATION_SUCCESS':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS'
      };
    case 'CHECKOUT_PROMO_UPDATE_SUCCESS':
      return {
        ...state,
        readyStatus: 'CHECKOUT_PROMO_UPDATE_SUCCESS',
        orderSummary: action.data,
        promoMessage: true
      };
    case 'CHECKOUT_PROMO_UPDATE_FAILURE':
      return {
        ...state,
        readyStatus: 'CHECKOUT_PROMO_UPDATE_FAILURE',
        err: action.err
      };
    case 'SET_STATE':
      return {
        ...state,
        readyStatus: 'CHECKOUT_SUCCESS',
        form: { AddressFormValues: { state: action.value } }
      };
    default:
      return state;
  }
};

export default checkout;
