/* @flow */

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';

import azURL from '../config/serviceAPI';

const urlPath = azURL('addEditMileage');

export const fetchData = (axios: any, vehicleId: number): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'ADDEDITMILEAGE_REQUESTING' });

  try {
    let addEditMileageURL = '';
    addEditMileageURL = `${urlPath}/${vehicleId}/mileage`;
    const response = await axios.get(addEditMileageURL);
    dispatch({ type: 'ADDEDITMILEAGE_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'ADDEDITMILEAGE_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchData = (state: ReduxState): boolean => {
  if (__DEV__) return true;
  if (state.category.readyStatus === 'ADDEDITMILEAGE_SUCCESS') return false;

  return true;
};

export const fetchAddEditMileageData = /* istanbul ignore next */ (
  vehicleId
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchData(getState())) {
    return dispatch(fetchData(axios, vehicleId));
  }
  return null;
};

export const addMileage = (
  axios: any,
  addServiceData: Object
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const addEditMileageURL = `${urlPath}/mileage`;
    console.log('serviceHistoryData action', addServiceData);
    await axios.post(addEditMileageURL, addServiceData);
    dispatch({ type: 'ADD_MILEAGE_SUCCESS' });
  } catch (err) {
    dispatch({
      type: 'ADD_MILEAGE_FAILURE',
      err: err && err.message
    });
  }
};
/* istanbul ignore next */
const shouldFetchAddMileageData = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.cart.readyStatus === 'ADD_MILEAGE_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const postAddMileage = /* istanbul ignore next */ (
  forPOSTData: Object
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchAddMileageData(getState())) {
    return dispatch(addMileage(axios, forPOSTData));
  }
  return null;
};
