/* @flow */
import type { Dispatch, GetState, ThunkAction } from '../types';
import azURL from '../config/serviceAPI';
// import rewardsData from '../containers/CheckOut/Rewards/rewardsData';

const urlPath = azURL('rewards');

export const fetchRewards = (
  axios: any,
  action: string,
  URL: string = urlPath
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'APPLY_REWARDS_REQUESTING' });
  try {
    console.log('URL', URL);
    let response = {};
    if (action === 'APPLY') {
      response = await axios.post(URL);
      // response = { data: rewardsData };
      dispatch({ type: 'APPLY_REWARDS_SUCCESS', data: response.data });
    } else if (action === 'REMOVE') {
      response = await axios.delete(URL);
      dispatch({ type: 'REMOVE_REWARDS_SUCCESS', data: response.data });
    }
  } catch (err) {
    dispatch({ type: 'APPLY_REWARDS_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
export const applyRewards = (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchRewards(axios, 'APPLY'));

/* istanbul ignore next */
export const removeRewards = (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchRewards(axios, 'REMOVE'));
