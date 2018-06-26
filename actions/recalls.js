/* @flow */

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const urlPath = azURL('getMyVehicle');

export const fetchRecallList = (
  axios: any,
  vehicleId: number,
  host: any
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(host);
    dispatch({ type: 'RECALLS_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'RECALLS_FAILURE', err: err.message });
  }
};

export const fetchRecallDetails = (
  axios: any,
  vehicleId: number,
  recallNumber: string,
  recallDate: string,
  host: any
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(host);
    dispatch({ type: 'RECALLS_DETAILS_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'RECALLS_DETAILS_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchRecallListData = (state: ReduxState): boolean => {
  if (__DEV__) return true;
  if (state.category.readyStatus === 'RECALLS_SUCCESS') return false;

  return true;
};

/* istanbul ignore next */
const shouldFetchRecallDetailsData = (state: ReduxState): boolean => {
  if (__DEV__) return true;
  if (state.category.readyStatus === 'RECALLS_SUCCESS') return false;

  return true;
};

export const fetchRecallListData = /* istanbul ignore next */ (
  vehicleId
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchRecallListData(getState())) {
    const recallsURL = `${urlPath}/${vehicleId}/recalls`;
    return dispatch(fetchRecallList(axios, vehicleId, recallsURL));
  }
  return null;
};

export const fetchRecallsDetailsData = /* istanbul ignore next */ (
  vehicleId,
  recallNumber,
  recallDate
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchRecallDetailsData(getState())) {
    const recallsURL = `${urlPath}/${vehicleId}/recalls/${recallNumber}?recallDate=${recallDate}`;
    return dispatch(
      fetchRecallDetails(axios, vehicleId, recallNumber, recallDate, recallsURL)
    );
  }
  return null;
};
