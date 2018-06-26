/* @flow */

import _ from 'lodash/fp';

import type { DealProductData, Action } from '../types';

type State = DealProductData;

const initialState = {
  readyStatus: 'DEAL_PRODUCT_INVALID',
  err: null,
  viewInfo: {}
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'DEAL_PRODUCT_REQUESTING':
      return _.assign(state, {
        readyStatus: 'DEAL_PRODUCT_REQUESTING'
      });
    case 'DEAL_PRODUCT_FAILURE':
      return _.assign(state, {
        readyStatus: 'DEAL_PRODUCT_FAILURE',
        err: action.err
      });
    case 'DEAL_PRODUCT_SUCCESS':
      return _.assign(state, {
        readyStatus: 'DEAL_PRODUCT_SUCCESS',
        viewInfo: action.data
      });
    default:
      return state;
  }
};
