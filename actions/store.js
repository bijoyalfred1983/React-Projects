/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL, { yextCompleteURL, yextAPIKey } from '../config/serviceAPI';
import fetchHeaderData from './header';

const urlPath = yextCompleteURL('yextGeoSearch');
const key = yextAPIKey;

export const fetchData = (
  location: string,
  URL: string = urlPath,
  apiKey: string = key
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'STORE_SEARCH_REQUESTING' });
  try {
    const url = `${URL}?location=${location}&api_key=${apiKey}&v=20180227&radius=150`;
    const instance = axios.create({ withCredentials: false });
    const response = await instance.get(url);
    dispatch({ type: 'STORE_SEARCH_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'STORE_SEARCH_FAILURE', err: err.message });
  }
};

export const setStore = (storeNumber: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  // dispatch({ type: 'SET_STORE_REQUESTING' });
  try {
    await axios.post(azURL('preferredStore'), { storeNumber }); // backend
    dispatch({ type: 'SET_STORE_SUCCESS', storeNumber });
    dispatch(fetchHeaderData());
  } catch (err) {
    dispatch({ type: 'SET_STORE_FAILURE', err: err.message });
  }
};

export const fetchNearByStoreData = (
  storeNumber: string,
  range: number,
  skuId: string
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(azURL('findNearByStores'), {
      storeNumber,
      range,
      skuId
    });
    dispatch({ type: 'NEAR_BY_STORES_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'NEAR_BY_STORES_FAILURE', err: err && err.message });
  }
};

/* istanbul ignore next */
const shouldFetchData = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.cart.readyStatus === 'STORE_SEARCH_SUCCESS') return false; // Preventing double fetching data

  return true;
};

const fetchSearchData = /* istanbul ignore next */ (
  location: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchData(getState())) {
    return dispatch(fetchData(location));
  }
  return null;
};

export const setStoreNumber = /* istanbul ignore next */ (
  storeNumber: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchData(getState())) {
    return dispatch(setStore(storeNumber));
  }
  return null;
};

export const fetchNearByData = /* istanbul ignore next */ (
  storeNumber: string,
  range: number,
  skuId: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchData(getState())) {
    return dispatch(fetchNearByStoreData(storeNumber, range, skuId));
  }
  return null;
};

export const clearSearchResult = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch
) => {
  dispatch({ type: 'STORE_CLEAR_SEARCH_DATA' });
};

export default fetchSearchData;
