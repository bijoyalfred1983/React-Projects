/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const serviceHistoryObj = {
  addingEmptyNewItem: 'true',
  brand: '',
  partProvider: '',
  partCost: '',
  partNumber: '',
  laborProvider: '',
  laborCost: '',
  otherItem: '',
  otherCost: '',
  additionalInfo: ''
};

export const addServiceHistory = (
  addServiceData: Object
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    await axios.post(azURL('addServiceHistory'), addServiceData);
    dispatch({ type: 'ADD_SERVICE_HISTORY_SUCCESS' });
  } catch (err) {
    dispatch({
      type: 'ADD_SERVICE_HISTORY_FAILURE',
      err: err && err.message
    });
  }
};

export const fetchServiceHistory = (vehicleId: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.get(
      `${azURL('getMyVehicle')}/${vehicleId}/serviceHistory`
    );
    dispatch({ type: 'FETCH_SERVICE_HISTORY_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({
      type: 'FETCH_SERVICE_HISTORY_FAILURE',
      err: err && err.message
    });
  }
};

/* istanbul ignore next */
const shouldFetchVehicleData = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.cart.readyStatus === 'GET_VEHICLE_SUCCESS') return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
const shouldFetchServiceData = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.cart.readyStatus === 'FETCH_SERVICE_HISTORY_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const addServiceHistoryData = /* istanbul ignore next */ (
  addServiceData: Object
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (addServiceData.serviceItemId) {
    if (shouldFetchServiceData(getState())) {
      const serviceHistoryData = Object.assign(
        {},
        serviceHistoryObj,
        addServiceData,
        { addingEmptyNewItem: 'false' }
      );
      return dispatch(addServiceHistory(serviceHistoryData));
    }
    return null;
  } else if (shouldFetchVehicleData(getState())) {
    const serviceHistoryData = Object.assign(
      {},
      serviceHistoryObj,
      addServiceData
    );
    return dispatch(addServiceHistory(serviceHistoryData));
  }
  return null;
};

export const fetchServiceHistoryData = /* istanbul ignore next */ (
  vehicleId: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchServiceData(getState())) {
    return dispatch(fetchServiceHistory(vehicleId));
  }
  return null;
};

export const fetchPaginatedList = /* istanbul ignore next */ (
  startIndex: number = 0,
  endIndex: number = 10
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchServiceData(getState())) {
    dispatch({ type: 'FETCH_INITIAL_SERVICE_HISTORY', startIndex, endIndex });
  }
};

export const sortServiceHistoryData = /* istanbul ignore next */ (
  sortByValue: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchServiceData(getState())) {
    dispatch({ type: 'SORT_SERVICE_HISTORY', sortByValue });
    dispatch(fetchPaginatedList());
  }
};

export const editServiceHistory = /* istanbul ignore next */ (
  vehicleId: string,
  serviceItemId: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchServiceData(getState())) {
    dispatch(fetchServiceHistory(vehicleId)).then(() => {
      dispatch({ type: 'EDIT_SERVICE_HISTORY_SUCCESS', data: serviceItemId });
    });
  }
};
