/* @flow */

import _ from 'lodash/fp';

import type { TopNavData, Action } from '../types';

type State = TopNavData;

const initialState = {
  readyStatus: 'CREATE_INVALID',
  err: null,
  subCatData: {},
  level2Data: {},
  level2MostPop: {},
  headingL1: null,
  level2: {},
  headingL2: null,
  subPath: ''
};

const getMostPop = state => {
  console.log('most pop', state);
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SUBCAT_SUCCESS':
      return _.assign(state, {
        readyStatus: 'SUBCAT_SUCCESS',
        subCatData: action.data,
        subPath: action.subQuery
      });
    case 'SUBCAT_FAILURE':
      return _.assign(state, {
        readyStatus: 'SUBCAT_FAILURE',
        err: action.err
      });
    case 'FETCH_SUBMENU':
      return _.assign(state, {
        readyStatus: 'FETCH_SUBMENU_SUCCES',
        level2Data: action.data,
        headingL1: action.label
      });

    case 'FETCH_SUBMENU_2':
      return _.assign(state, {
        readyStatus: 'FETCH_SUBMENU_2_SUCCES',
        level3Data: action.data,
        headingL2: action.label
      });

    case 'FETCH_MOST_POP':
      return _.assign(state, {
        mostPop: getMostPop(state)
      });

    case 'RESET_NAV_DATA':
      return _.assign(state, {
        subCatData: {}
      });
    default:
      return state;
  }
};
