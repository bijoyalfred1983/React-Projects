/* @flow */
import type { PreferredStoreData, Action } from '../types';

const initialState = {
  readyStatus: 'FETCH_PREFERRED_STORE_INVALID',
  err: '',
  storeDetails: {},
  currentDayTime: {}
};

const preferredStore = (
  state: PreferredStoreData = initialState,
  action: Action
): PreferredStoreData => {
  switch (action.type) {
    case 'FETCH_PREFERRED_STORE_REQUESTING':
      return {
        ...state,
        readyStatus: 'FETCH_PREFERRED_STORE_REQUESTING'
      };
    case 'FETCH_PREFERRED_STORE_FAILURE':
      return {
        ...state,
        readyStatus: 'FETCH_PREFERRED_STORE_FAILURE',
        err: action.err
      };
    case 'FETCH_PREFERRED_STORE_SUCCESS': {
      const storeDetails = action.data && action.data.storeDetails;
      let currentDayTime = {};
      if (storeDetails && storeDetails.storeFullHours) {
        currentDayTime = storeDetails.storeFullHours[storeDetails.currentDay];
      }
      return {
        ...state,
        readyStatus: 'FETCH_PREFERRED_STORE_SUCCESS',
        storeDetails: action.data && action.data.storeDetails,
        currentDayTime,
        err: ''
      };
    }
    default:
      return state;
  }
};

export default preferredStore;
