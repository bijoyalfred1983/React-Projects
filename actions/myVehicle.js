/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

export const fetchVehicleData = (): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'GET_VEHICLE_REQUESTING' });
  try {
    const response = await axios.get(azURL('getMyVehicle'));
    dispatch({ type: 'GET_VEHICLE_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'GET_VEHICLE_FAILURE', err: err && err.message });
  }
};

export const removeVehicleData = (
  vehicleId: string,
  isPreferredVehicle: boolean
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'REMOVE_VEHICLE_REQUESTING' });
  try {
    const response = await axios.delete(
      `${azURL('getMyVehicle')}/${vehicleId}`
    );
    dispatch({ type: 'REMOVE_VEHICLE_SUCCESS', data: response.data });
    if (isPreferredVehicle) {
      dispatch({ type: 'MYVEHICLE_REMOVE_SUCCESS' });
    }
    dispatch(fetchVehicleData());
  } catch (err) {
    dispatch({ type: 'REMOVE_VEHICLE_FAILURE', err: err && err.message });
  }
};

export const updatePreferredVehicle = (
  vehicleId: string
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(
      azURL('updatePreferredVehicle'),
      `vehicleID=${vehicleId}`
    );
    dispatch({ type: 'UPDATE_VEHICLE_SUCCESS', data: response.data });
    dispatch(fetchVehicleData());
  } catch (err) {
    dispatch({ type: 'UPDATE_VEHICLE_FAILURE', err: err && err.message });
  }
};

export const fetchVehicleDataById = (vehicleId: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(fetchVehicleData()).then(() => {
      dispatch({ type: 'GET_VEHICLE_BY_ID_SUCCESS', vehicleId });
    });
  } catch (err) {
    dispatch({ type: 'GET_VEHICLE_BY_ID_FAILURE', err: err && err.message });
  }
};

/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.myVehicle.readyStatus === 'GET_VEHICLE_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const fetchVehicle = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchView(getState())) {
    return dispatch(fetchVehicleData());
  }
  return null;
};

export const removeVehicle = /* istanbul ignore next */ (
  vehicleId: string,
  isPreferredVehicle: boolean
): ThunkAction => /* istanbul ignore next */ (dispatch: Dispatch) =>
  dispatch(removeVehicleData(vehicleId, isPreferredVehicle));

export const setAsCurrentVehicle = /* istanbul ignore next */ (
  vehicleId: string
): ThunkAction => /* istanbul ignore next */ (dispatch: Dispatch) =>
  dispatch(updatePreferredVehicle(vehicleId));

export const ymmeShelfTrigger = (value): ThunkAction => (
  dispatch: Dispatch
) => {
  dispatch({ type: 'YMME_SHELF_TRIGGER', ymmeTrigger: value });
};

export const fetchVehicleById = /* istanbul ignore next */ (
  vehicleId: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchView(getState())) {
    return dispatch(fetchVehicleDataById(vehicleId));
  }
  return null;
};
