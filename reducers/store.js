/* @flow */
import type { StoreData, Action } from '../types';

const initialState = {
  readyStatus: 'STORE_SEARCH_INVALID',
  setStoreStatus: 'SET_STORE_INVALID',
  nearByStoreStatus: 'NEAR_BY_STORES_INVALID',
  err: null,
  storeData: {},
  currentStore: '9801',
  nearByStoreData: {}
};

const store = (state: StoreData = initialState, action: Action): StoreData => {
  switch (action.type) {
    case 'STORE_SEARCH_REQUESTING':
      return {
        ...state,
        readyStatus: 'STORE_SEARCH_REQUESTING'
      };
    case 'STORE_SEARCH_FAILURE':
      return {
        ...state,
        readyStatus: 'STORE_SEARCH_FAILURE',
        err: action.err
      };
    case 'STORE_SEARCH_SUCCESS':
      return {
        ...state,
        readyStatus: 'STORE_SEARCH_SUCCESS',
        storeData: action.data
      };
    case 'SET_STORE_SUCCESS':
      return {
        ...state,
        currentStore: action.storeNumber,
        setStoreStatus: 'SET_STORE_SUCCESS'
      };
    case 'SET_STORE_FAILURE':
      return {
        ...state,
        err: action.err,
        setStoreStatus: 'SET_STORE_FAILURE'
      };
    case 'STORE_CLEAR_SEARCH_DATA':
      return {
        ...state,
        storeData: {},
        readyStatus: 'STORE_SEARCH_INVALID'
      };
    case 'NEAR_BY_STORES_SUCCESS':
      return {
        ...state,
        nearByStoreStatus: 'NEAR_BY_STORES_SUCCESS',
        nearByStoreData: action.data
      };
    case 'NEAR_BY_STORES_FAILURE':
      return {
        ...state,
        nearByStoreStatus: 'NEAR_BY_STORES_FAILURE',
        err: action.err
      };
    default:
      return state;
  }
};

export default store;
