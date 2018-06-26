/* @flow */
import type { rewardsPageData, Action } from '../types';

const initialState = {
  readyStatus: 'REWARDS_PAGE_INVALID',
  err: null,
  data: {}
};

const rewardsPage = (state: rewardsPageData = initialState, action: Action) => {
  switch (action.type) {
    case 'REWARDS_PAGE_REQUESTING':
      return {
        ...state,
        readyStatus: 'REWARDS_PAGE__REQUESTING'
      };
    case 'REWARDS_PAGE__FAILURE':
      return {
        ...state,
        readyStatus: 'REWARDS_PAGE__FAILURE',
        err: action.err
      };
    case 'REWARDS_PAGE_SUCCESS':
      return {
        ...state,
        readyStatus: 'REWARDS_PAGE_SUCCESS',
        data: { ...action.data }
      };
    default:
      return state;
  }
};

export default rewardsPage;
