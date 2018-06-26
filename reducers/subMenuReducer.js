/* @flow */

import _ from 'lodash/fp';

import type { subMenuData, Action } from '../types';

type State = subMenuData;

const initialState = {
  readyStatus: 'MOBILESUBMENU_INVALID',
  err: null,
  list: [],
  headingL1: null
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'MOBILESUBMENU_REQUESTING':
      return _.assign(state, {
        readyStatus: 'MOBILESUBMENU_REQUESTING'
      });
    case 'MOBILESUBMENU_FAILURE':
      return _.assign(state, {
        readyStatus: 'MOBILESUBMENU_FAILURE',
        err: action.err
      });
    case 'MOBILESUBMENU_SUCCESS':
      return _.assign(state, {
        readyStatus: 'MOBILESUBMENU_SUCCESS',
        list: action.data,
        headingL1: action.mostPopularLabel
      });
    default:
      return state;
  }
};
