/* @flow */
import type { Dispatch, ThunkAction, GetState } from '../types';
import azURL from '../config/serviceAPI';

const CHECKOUT_URL = azURL('checkoutDetails');
const SHIPPING_URL = azURL('shippingAddress');
const SRVALIDATION_URL = azURL('srValidation');
const UPDATE_DELIVERY_URL = azURL('updateDeliveryMethod');

export const fetchCheckOutDetails = (axios: any): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'CHECKOUT_REQUESTING' });
  try {
    const response = await axios.get(CHECKOUT_URL); // backend
    dispatch({ type: 'CHECKOUT_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'CHECKOUT_FAILURE', err: err.message });
  }
};

export const validateAddress = (
  axios: any,
  address: Object
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(SHIPPING_URL, address); // backend
    dispatch({
      type: 'FEDX_VALIDATION_SUCCESS',
      data: response.data,
      enteredAddress: address
    });
  } catch (err) {
    dispatch({ type: 'FEDX_VALIDATION_FAILURE', err });
  }
};
/* istanbul ignore next */
export const getCheckOutDetails = /* istanbul ignore next */ (): ThunkAction /* istanbul ignore next */ => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchCheckOutDetails(axios));

/* istanbul ignore next */
export const invokeFedxValidation = /* istanbul ignore next */ (
  address
): ThunkAction /* istanbul ignore next */ => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(validateAddress(axios, address));

export const setLayout = (layout): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'SET_LAYOUT', layout });
};

export const shoprunnerTokenValidation = (
  axios: any,
  token: string
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const sendToken =
      token.length > 0
        ? {
            action: 'srSignIn',
            sr_token: token
          }
        : {
            action: 'srSignOut',
            sr_token: ''
          };
    const response = await axios.post(SRVALIDATION_URL, sendToken);
    dispatch({ type: 'SRVALIDATION_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'SRVALIDATION_FAILURE', err: err.message });
  }
};

export const setDeliveryOption = (
  axios: any,
  selectedOption,
  method: string
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(UPDATE_DELIVERY_URL, {
      shippingMethodSelected: selectedOption
    });
    dispatch({ type: 'UPDATE_DELIVERY_SUCCESS', data: response.data, method });
  } catch (err) {
    dispatch({ type: 'UPDATE_DELIVERY_FAILURE', err });
  }
};

export const validateSRToken = (
  token
): ThunkAction /* istanbul ignore next */ => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(shoprunnerTokenValidation(axios, token));

export const SetCardType = (data: any) => (dispatch: Dispatch) => {
  dispatch({ type: 'SET_CARD_TYPE', data });
};

export default getCheckOutDetails;

export const updateDeliveryMethod = (
  selectedOption,
  method
): ThunkAction /* istanbul ignore next */ => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(setDeliveryOption(axios, selectedOption, method));

export const setFormData = (
  checkCoutData
): ThunkAction => /* istanbul ignore next */ (dispatch: Dispatch) => {
  const addressForm = {
    firstName: `${checkCoutData.firstName}`,
    lastName: `${checkCoutData.lastName}`,
    phoneNumber: `${checkCoutData.phoneNumber}`,
    email: `${checkCoutData.email}`,
    AddressLine1: `${checkCoutData.address1}`,
    AddressLine2: `${checkCoutData.address2}`,
    zipCode: `${checkCoutData.postalCode}`,
    state: `${checkCoutData.state}`,
    city: `${checkCoutData.city}`
  };
  dispatch({ type: 'SET_FORM_DATA', addressForm });
};
