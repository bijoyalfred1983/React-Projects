/* @flow */

import _ from 'lodash/fp';

import type { DealsSplitContentData, Action } from '../types';

type State = DealsSplitContentData;

const initialState = {
  readyStatus: 'DEALSSPLIT_INVALID',
  err: null,
  viewInfo: {}
};

const contentDeals = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'DEALSSPLIT_REQUESTING':
      return _.assign(state, {
        readyStatus: 'DEALSSPLIT_REQUESTING'
      });
    case 'DEALSSPLIT_FAILURE':
      return _.assign(state, {
        readyStatus: 'DEALSSPLIT_FAILURE',
        err: action.err
      });
    case 'DEALSSPLIT_SUCCESS':
      return _.assign(state, {
        readyStatus: 'DEALSSPLIT_SUCCESS',
        viewInfo: action.data
      });
    case 'DEALSREBATES_REQUESTING':
      return _.assign(state, {
        readyStatus: 'DEALSREBATES_REQUESTING'
      });
    case 'DDEALSREBATES_FAILURE':
      return _.assign(state, {
        readyStatus: 'DEALSREBATEST_FAILURE',
        err: action.err
      });
    case 'DEALSREBATES_SUCCESS':
      return _.assign(state, {
        readyStatus: 'DEALSREBATES_SUCCESS',
        viewInfo: action.data
      });
    case 'SELECT_FIRST_LEVEL_ITEM':
      return {
        ...state,
        ...{
          viewInfo: {
            ...state.viewInfo,
            ...{ selectedFirstLevelItem: action.item }
          }
        }
      };
    default:
      return state;
  }
};

export default contentDeals;
