/* @flow */
import _ from 'lodash/fp';
import type { BVDataType, Action } from '../types';

const initialState = {
  readyStatus: 'BV_INVALID',
  err: null,
  bvConfig: {}
};

export default (
  state: BVDataType = initialState,
  action: Action
): BVDataType => {
  switch (action.type) {
    case 'BV_REQUESTING':
      return _.assign(state, {
        readyStatus: 'BV_REQUESTING'
      });
    case 'BV_FAILURE':
      return _.assign(state, {
        readyStatus: 'BV_FAILURE',
        err: action.err
      });
    case 'BV_SUCCESS':
      return _.assign(state, {
        readyStatus: 'BV_SUCCESS',
        bvConfig: action.data
      });
    default:
      return state;
  }
};
