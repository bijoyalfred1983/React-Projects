/* @flow */

import _ from 'lodash/fp';

import type { HeroContentData, Action } from '../types';

type State = HeroContentData;

const initialState = {
  readyStatus: 'HERO_INVALID',
  err: null,
  viewInfo: []
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'HERO_REQUESTING':
      return _.assign(state, {
        readyStatus: 'HERO_REQUESTING'
      });
    case 'HERO_FAILURE':
      return _.assign(state, {
        readyStatus: 'HERO_FAILURE',
        err: action.err
      });
    case 'HERO_SUCCESS': {
      return _.assign(state, {
        readyStatus: 'HERO_SUCCESS',
        viewInfo: action.data
      });
    }
    default:
      return state;
  }
};
