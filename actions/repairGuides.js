/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import { fetchVehicleData } from './myVehicle';
import azURL from '../config/serviceAPI';

export const fetchRepairGuides = (vehicleId: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'FETCH_REPAIRGUIDS_REQUESTING' });
  try {
    const response = await axios.get(
      `${azURL('vehicleRepairGuide')}/${vehicleId || ''}`
    );
    dispatch({ type: 'FETCH_REPAIRGUIDS_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({
      type: 'FETCH_REPAIRGUIDS_FAILURE',
      err: err && err.message
    });
  }
};

export const fetchRepairGuidesChapters = (
  pageId: string
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'FETCH_REPAIRGUIDS_CHAAPTERS_REQUESTING' });
  try {
    const response = await axios.get(
      `${azURL('repairGuideChapterInfo')}/${pageId || ''}`
    );
    dispatch({
      type: 'FETCH_REPAIRGUIDS_CHAAPTERS_SUCCESS',
      data: response.data
    });
  } catch (err) {
    dispatch({
      type: 'FETCH_REPAIRGUIDS_CHAAPTERS_FAILURE',
      err: err && err.message
    });
  }
};

/* istanbul ignore next */
const shouldFetchData = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.repairGuides.readyStatus === 'FETCH_REPAIRGUIDS_SUCCESS')
    return false; // Preventing double fetching data

  return true;
};

export const fetchRepairGuidesData = /* istanbul ignore next */ (
  vehicleId: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchData(getState())) {
    return dispatch(fetchRepairGuides(vehicleId));
  }
  return null;
};

export const fetchRepairGuidesChaptersData = /* istanbul ignore next */ (
  pageId: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (getState().myVehicle.readyStatus !== 'GET_VEHICLE_SUCCESS') {
    dispatch(fetchVehicleData());
  }
  return dispatch(fetchRepairGuidesChapters(pageId));
};
