/* @flow */
import _ from 'lodash/fp';
import type { AppData, Action } from '../types';

type State = AppData;

const initialState = {
  isHeaderPresent: true,
  isFooterPresent: true,
  userAuthenticated: false
};

const appData = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'HEADER_STATE_FAILURE':
      return {
        ...state,
        isHeaderPresent: true
      };
    case 'HEADER_STATE_SUCCESS':
      return {
        ...state,
        isHeaderPresent: action.status
      };
    case 'FOOTER_STATE_FAILURE':
      return {
        ...state,
        isFooterPresent: true
      };
    case 'FOOTER_STATE_SUCCESS':
      return {
        ...state,
        isFooterPresent: action.status
      };
    case 'STATICLABEL_FAILURE':
      return _.assign(state, {
        readyStatus: 'STATICLABEL_FAILURE',
        err: action.err
      });
    case 'STATICLABEL_SUCCESS':
      return _.assign(state, {
        readyStatus: 'STATICLABEL_SUCCESS',
        staticLabelData: action.data
      });
    case 'UPDATE_AUTHENTICATION':
      return { ...state, userAuthenticated: action.sessionAuthState };
    default:
      return state;
  }
};
export default appData;
