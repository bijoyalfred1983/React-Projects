/* @flow */

import type { TrackOrderData, Action } from '../types';

const initialState = {
  readyStatus: 'TRACK_ORDER_INVALID',
  err: null
};

const trackOrder = (
  state: TrackOrderData = initialState,
  action: Action
): TrackOrderData => {
  switch (action.type) {
    case 'TRACK_ORDER_REQUESTING':
      return {
        ...state,
        readyStatus: 'TRACK_ORDER_REQUESTING'
      };
    case 'TRACK_ORDER_SUCCESS':
      return {
        ...state,
        readyStatus: 'TRACK_ORDER_SUCCESS',
        err: null
      };
    case 'TRACK_ORDER_FAILURE':
      return {
        ...state,
        readyStatus: 'TRACK_ORDER_FAILURE',
        err: action.err
      };
    default:
      return state;
  }
};

export default trackOrder;
