/* @flow */
import type { RecallsData, Action } from '../types';

const initialState = {
  readyStatus: 'RECALLS_INVALID',
  err: null
};

const recalls = (
  state: RecallsData = initialState,
  action: Action
): RecallsData => {
  switch (action.type) {
    case 'RECALLS_REQUESTING':
      return {
        ...state,
        readyStatus: 'RECALLS_REQUESTING'
      };
    case 'RECALLS_FAILURE':
      return {
        ...state,
        readyStatus: 'RECALLS_FAILURE',
        err: action.err
      };
    case 'RECALLS_SUCCESS':
      return {
        ...state,
        readyStatus: 'RECALLS_SUCCESS',
        data: { ...state.data, ...action.data }
      };
    case 'RECALLS_DETAILS_FAILURE':
      return {
        ...state,
        readyStatus: 'RECALLS_DETAILS_FAILURE',
        err: action.err
      };
    case 'RECALLS_DETAILS_SUCCESS':
      return {
        ...state,
        readyStatus: 'RECALLS_DETAILS_SUCCESS',
        data: { ...state.data, ...action.data }
      };
    default:
      return state;
  }
};

export default recalls;
