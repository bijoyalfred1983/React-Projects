/* @flow */

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const currentUserUrlPath = azURL('currentUser');
const statesUrlPath = azURL('states');

export const fetchData = (axios: any, URL: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'MY_PROFILE_REQUESTING' });

  try {
    const instance = axios.create({
      headers: { Accept: 'application/json' }
    });

    const response = await instance.get(URL);

    dispatch({ type: 'MY_PROFILE_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'MY_PROFILE_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchData = (state: ReduxState): boolean => {
  if (__DEV__) return true;
  if (state.category.readyStatus === 'MY_PROFILE_SUCCESS') return false;

  return true;
};

export const fetchMyProfileData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchData(getState())) {
    return dispatch(fetchData(axios, currentUserUrlPath));
  }
  return null;
};

// UPDATE PROFILE INFO

export const patchInfo = (
  axios: any,
  URL: string,
  info: Object
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'MY_PROFILE_PATCH_REQUESTING' });

  try {
    const instance = axios.create({
      headers: { Accept: 'application/json' }
    });

    const response = await instance.patch(URL, info);
    dispatch({ type: 'MY_PROFILE_PATCH_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({
      type: 'MY_PROFILE_PATCH_FAILURE',
      err: err.response.data.title
    });
  }
};

export const patchProfileInfo = /* istanbul ignore next */ (
  info: Object
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(patchInfo(axios, currentUserUrlPath, info));

// Getting USA states values

export const statesValues = (axios: any, URL: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'MY_PROFILE_STATES_REQUESTING' });

  try {
    const response = await axios.get(URL);
    dispatch({ type: 'MY_PROFILE_STATES_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({
      type: 'MY_PROFILE_STATES_FAILURE',
      err: err.response.data.title
    });
  }
};

/* istanbul ignore next */
const shouldFetchStateValues = (state: ReduxState): boolean => {
  if (state.category.readyStatus === 'MY_PROFILE_STATES_SUCCESS') return false;
  return true;
};

export const getStatesValues = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchStateValues(getState())) {
    dispatch(statesValues(axios, statesUrlPath));
  }
  return null;
};
