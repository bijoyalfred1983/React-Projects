/* @flow */
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';
// import { fetchPageData } from './cart';
import { fetchOrderSummaryData } from './orderSummary';
// import { promoCodeCheckOutDetails } from './checkout';
import fetchMiniCartData from './miniCart';

const API_URL = azURL('quantityCart');
const API_URL2 = azURL('swapPickUp');
const API_URL3 = azURL('promoCodeApply');
const API_URL4 = azURL('promoCodeRemove');
const API_URL5 = azURL('header');

export const headerData = (axios: any): ThunkAction => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.get(API_URL5);
    dispatch({ type: 'CART_MINICART_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'CART_MINICART_FAILURE', err: err.message });
  }
};

export const emptyCartPageData = () => (dispatch: Dispatch) =>
  dispatch({ type: 'CLEAR_CART_PAGE_DATA' });

// Export this for unit testing more easily
export const updateQuantity = (
  axios: any,
  values: any,
  id: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'ITEMQUANTITY_REQUESTING' });
  try {
    const res = await axios.patch(`${URL}/${id}`, values); // backend
    dispatch({
      type: 'ITEMQUANTITY_SUCCESS',
      values: values.quantity,
      id,
      data: res.data
    });
    dispatch(fetchOrderSummaryData());
    dispatch(fetchMiniCartData());
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'ITEMQUANTITY_FAILURE',
      id,
      err
    });
  }
};

export const removeCart = (
  axios: any,
  id: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'REMOVECART_REQUESTING' });
  try {
    const res = await axios.delete(`${URL}/${id}`); // backend
    dispatch({ type: 'REMOVECART_SUCCESS', id, data: res.data });
    dispatch(fetchOrderSummaryData());
    dispatch(fetchMiniCartData());
  } catch (err) {
    dispatch({ type: 'REMOVECART_FAILURE', id, err });
  }
};

export const promoCodeApply = (
  axios: any,
  value: any,
  URL: string = API_URL3
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'PROMOCODE_APPLY_REQUESTING' });
  try {
    const res = await axios.post(`${URL}`, value); // backend
    dispatch({ type: 'PROMOCODE_APPLY_SUCCESS', data: res.data });
    dispatch(fetchOrderSummaryData());
    // dispatch(promoCodeCheckOutDetails());
  } catch (err) {
    dispatch({ type: 'PROMOCODE_APPLY_FAILURE', err });
  }
};

export const storeChange = (
  axios: any,
  values: any,
  id: any,
  URL: string = API_URL2
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'STORECHANGE_REQUESTING' });
  try {
    const res = await axios.patch(`${URL}/${id}`, values); // backend
    dispatch({ type: 'STORECHANGE_SUCCESS', id, data: res.data });
  } catch (err) {
    dispatch({ type: 'STORECHANGE_FAILURE', id, err });
  }
};

export const promoCodeRemove = (
  axios: any,
  values: any,
  id: any,
  URL: string = API_URL4
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'PROMOCODE_REMOVE_REQUESTING' });
  try {
    const res = await axios.post(`${URL}`, values); // backend
    dispatch({ type: 'PROMOCODE_REMOVE_SUCCESS', id, data: res.data });
    dispatch(fetchOrderSummaryData());
  } catch (err) {
    dispatch({ type: 'PROMOCODE_REMOVE_FAILURE', id, err: err.message });
  }
};

/* istanbul ignore next */
const shouldQuantityFetch = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'ITEMQUANTITY_SUCCESS') return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
const shouldQuantityRemove = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'CART_SUCCESS') return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
const shouldPromoCall = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'PROMOCODE_APPLY_SUCCESS') return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
const shouldStoreChange = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'STORECHANGE_SUCCESS') return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
const shouldPromoRemove = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'PROMOCODE_REMOVE_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const fetchQuantityUpdate = /* istanbul ignore next */ (
  values: Object,
  id: any
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  /* istanbul ignore next */
  if (shouldQuantityRemove(getState())) {
    /* istanbul ignore next */
    return dispatch(updateQuantity(axios, values, id));
  }
  /* istanbul ignore next */
  return null;
};

export const removeCall = /* istanbul ignore next */ (id: any): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldQuantityFetch(getState())) {
    /* istanbul ignore next */
    return dispatch(removeCart(axios, id));
  }
  /* istanbul ignore next */
  return null;
};

export const promoCall = /* istanbul ignore next */ (
  value: any
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  /* istanbul ignore next */
  if (shouldPromoCall(getState())) {
    /* istanbul ignore next */
    return dispatch(promoCodeApply(axios, value));
  }
  /* istanbul ignore next */
  return null;
};

export const storePickup = /* istanbul ignore next */ (
  value: any,
  id: any
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  /* istanbul ignore next */
  if (shouldStoreChange(getState())) {
    /* istanbul ignore next */
    return dispatch(storeChange(axios, value, id));
  }
  /* istanbul ignore next */
  return null;
};

export const promoRemoveCall = /* istanbul ignore next */ (
  value: any
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  /* istanbul ignore next */
  if (shouldPromoRemove(getState())) {
    /* istanbul ignore next */
    return dispatch(promoCodeRemove(axios, value));
  }
  /* istanbul ignore next */
  return null;
};

export const removePromo = () => (dispatch: Dispatch) =>
  dispatch({ type: 'RESET_PROMO_CART' });
