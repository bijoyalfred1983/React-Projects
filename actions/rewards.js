/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

export const fetchRewardsPageData = (): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'REWARDS_PAGE_REQUESTING' });
  try {
    const response = await axios.get(azURL('rewardsPage'));
    dispatch({ type: 'REWARDS_PAGE_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'REWARDS_PAGE_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.cart.readyStatus === 'REWARDS_PAGE_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const fetchRewardsData = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchView(getState())) {
    return dispatch(fetchRewardsPageData());
  }
  return null;
};

export default fetchRewardsPageData;
