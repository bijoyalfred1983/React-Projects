/* @flow */
import type { HeaderData, Action } from '../types';

const initialState = {
  readyStatus: 'HEADER_INVALID',
  miniCartReadyStatus: 'MINICART_INVALID',
  err: null,
  headerData: {
    miniCartMap: {}
  },
  miniCartSuccessNote: false
};

let headerData = {};
const header = (
  state: HeaderData = initialState,
  action: Action
): HeaderData => {
  switch (action.type) {
    case 'HEADER_REQUESTING':
      return {
        ...state,
        readyStatus: 'HEADER_REQUESTING'
      };
    case 'HEADER_FAILURE':
      return {
        ...state,
        readyStatus: 'HEADER_FAILURE',
        err: action.err
      };
    case 'HEADER_SUCCESS':
      return {
        ...state,
        readyStatus: 'HEADER_SUCCESS',
        headerData: action.data
      };
    case 'MINICART_REQUESTING':
      return {
        ...state,
        miniCartReadyStatus: 'MINICART_REQUESTING'
      };
    case 'MINICART_FAILURE':
      return {
        ...state,
        miniCartReadyStatus: 'MINICART_FAILURE',
        err: action.err
      };
    case 'MINICART_SUCCESS':
      headerData = { ...state.headerData };
      headerData.miniCartMap = action.data;
      return {
        ...state,
        miniCartSuccessNote: true,
        miniCartReadyStatus: 'MINICART_SUCCESS',
        headerData
      };
    default:
      return {
        ...state,
        miniCartSuccessNote: false
      };
  }
};

export default header;
