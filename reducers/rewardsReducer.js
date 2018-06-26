/* @flow */
import type { rewardsData, Action } from '../types';

const initialState = {
  readyStatus: 'APPLY_REWARDS_INVALID',
  err: null,
  data: {}
};

const rewards = (
  state: rewardsData = initialState,
  action: Action
): rewardsData => {
  switch (action.type) {
    case 'APPLY_REWARDS_REQUESTING':
      return {
        ...state,
        readyStatus: 'APPLY_REWARDS_REQUESTING'
      };
    case 'APPLY_REWARDS_FAILURE':
      return {
        ...state,
        readyStatus: 'APPLY_REWARDS_FAILURE',
        err: action.err
      };
    case 'APPLY_REWARDS_SUCCESS':
      return {
        ...state,
        readyStatus: 'APPLY_REWARDS_SUCCESS',
        data: { ...state.data, ...action.data }
      };
    case 'REMOVE_REWARDS_SUCCESS':
      return {
        ...state,
        readyStatus: 'REMOVE_REWARDS_SUCCESS',
        data: { ...state.data, ...action.data }
      };
    default:
      return state;
  }
};

export default rewards;
