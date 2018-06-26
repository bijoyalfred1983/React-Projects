/* @flow */
// import root from 'window-or-global';
import type { Dispatch, GetState, ThunkAction } from '../types';
import azURL from '../config/serviceAPI';
import { fetchVehicleData } from '../actions/myVehicle';
// import { fetchProductAllData } from '../actions/productDetails';
// import { getPartDetails } from '../actions/shelf';
// import { fetchSearch } from '../actions/search';

export const toggleYmmeModal = (value): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'SHOW_YMME_MODAL', openYmmeModal: value });
};

export const fetchYearDropdownData = (axios: any): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'YMME_YEAR_REQUESTING' });
  try {
    const response = await axios.get(azURL('ymmeGetYrData'));
    dispatch(fetchVehicleData());
    dispatch({ type: 'YMME_YEAR_SUCCESS', data: response.data.atgResponse });
  } catch (err) {
    dispatch({ type: 'YMME_YEAR_FAILURE', err: err.message });
  }
};

export const fetchMakeDropdownData = (
  axios: any,
  data: any
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({
    type: 'YMME_MAKE_REQUESTING',
    selectedYear: data.year
  });
  try {
    const response = await axios.get(
      `${azURL('ymmeGetMakesData')}/${data.year}`
    );
    dispatch({
      type: 'YMME_MAKE_SUCCESS',
      data: response.data.atgResponse
    });
  } catch (err) {
    dispatch({ type: 'YMME_MAKE_FAILURE', err: err.message });
  }
};

export const fetchModelDropdownData = (
  axios: any,
  year: any,
  data: any
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({
    type: 'YMME_MODEL_REQUESTING',
    selectedMake: data.make
  });
  try {
    const response = await axios.get(
      `${azURL('ymmeGetModelData')}/${year}/${data.make}/${data.makeId}`
    );
    dispatch({
      type: 'YMME_MODEL_SUCCESS',
      data: response.data.atgResponse
    });
  } catch (err) {
    dispatch({ type: 'YMME_MODEL_FAILURE', err: err.message });
  }
};

export const fetchEngineDropdownData = (
  axios: any,
  data: any
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({
    type: 'YMME_ENGINE_REQUESTING',
    selectedModel: data.model
  });
  try {
    const response = await axios.get(
      `${azURL('ymmeGetEngineData')}/${data.modelId}`
    );
    dispatch({
      type: 'YMME_ENGINE_SUCCESS',
      data: response.data.atgResponse
    });
  } catch (err) {
    dispatch({ type: 'YMME_ENGINE_FAILURE', err: err.message });
  }
};

export const addVehicle = (axios: any, data: any): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'YMME_ADD_VEHICLE_REQUESTING' });
  try {
    const YMME_URL = azURL('ymmeAddVehicle');
    const res = await axios.post(YMME_URL, `engineID=${data.engineId}`);
    dispatch({
      type: 'YMME_ADD_VEHICLE_SUCCESS',
      data: res.data,
      selectedEngine: data.engine
    });
    dispatch(fetchVehicleData());
    // if (root.document.location.pathname !== '/') {
    // dispatch(fetchProductAllData(root.document.location.pathname));
    // dispatch(getPartDetails(root.document.location.pathname));
    // dispatch(fetchSearch(root.document.location.search));
    // }
  } catch (err) {
    dispatch({ type: 'YMME_ADD_VEHICLE_FAILURE', err: err.message });
  }
};

export const removeVehicle = (axios: any): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'YMME_REMOVE_DEFAULT_VEHICLE_REQUESTING' });
  try {
    const YMME_URL = azURL('removeDefaultVehicle');
    const res = await axios.delete(YMME_URL);
    dispatch({
      type: 'YMME_REMOVE_DEFAULT_VEHICLE_SUCCESS',
      data: res.data,
      vehicleAdded: false
    });
    dispatch(fetchVehicleData());
  } catch (err) {
    dispatch({ type: 'YMME_REMOVE_DEFAULT_VEHICLE_FAILURE', err: err.message });
  }
};

export const fetchYMMEYearList = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchYearDropdownData(axios));

export const fetchYMMEMakeList = (data: any): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  dispatch(fetchMakeDropdownData(axios, data));
};

export const fetchYMMEModelList = (year: any, data: any): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchModelDropdownData(axios, year, data));

export const fetchYMMEEngineList = (model: any, data: any): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchEngineDropdownData(axios, data));

export const ymmeAddVehicle = (data: any): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(addVehicle(axios, data));

export const removeDefaultVehicle = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(removeVehicle(axios));
