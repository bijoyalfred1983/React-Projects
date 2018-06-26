/* @flow */
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const API_URL = azURL('contactUs');
const API_YEAR_URL = azURL('ymmeGetYrData');
const API_URL_PROFILE = azURL('currentUserProfileDetails');
const API_URL_STATE = azURL('states');

// Export this for unit testing more easily
export const fetchUsers = (
  axios: any,
  values: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'CONTACTUS_REQUESTING' });

  try {
    const res = await axios.post(URL, values); // backend
    dispatch({ type: 'CONTACTUS_SUCCESS', data: res.data });
  } catch (err) {
    dispatch({ type: 'CONTACTUS_FAILURE', err });
  }
};

export const YearDropdownData = (
  axios: any,
  URL: string = API_YEAR_URL
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'FORM_YEAR_REQUESTING' });

  try {
    const res = await axios.get(URL); // backend
    dispatch({
      type: 'FORM_YEAR_SUCCESS',
      data: res.data,
      dropDownDisableState: { make: true, model: true, engine: true }
    });
  } catch (err) {
    dispatch({ type: 'FORM_YEAR_FAILURE', err });
  }
};

export const fetchMakeDropdownData = (
  axios: any,
  year: any
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({
    type: 'FORM_MAKE_REQUESTING'
  });
  try {
    const response = await axios.get(`${azURL('ymmeGetMakesData')}/${year}`);
    dispatch({
      type: 'FORM_MAKE_SUCCESS',
      data: response.data,
      dropDownDisableState: { make: false, model: true, engine: true }
    });
  } catch (err) {
    dispatch({ type: 'FORM_MAKE_FAILURE', err: err.message });
  }
};

export const fetchModelDropdownData = (
  axios: any,
  year: any,
  make: any,
  makeId: any
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({
    type: 'FORM_MODEL_REQUESTING'
  });
  try {
    const response = await axios.get(
      `${azURL('ymmeGetModelData')}/${year}/${make}/${makeId}`
    );
    dispatch({
      type: 'FORM_MODEL_SUCCESS',
      data: response.data,
      dropDownDisableState: { make: false, model: false, engine: true }
    });
  } catch (err) {
    dispatch({ type: 'FORM_MODEL_FAILURE', err: err.message });
  }
};

export const fetchEngineDropdownData = (
  axios: any,
  modelId: any
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({
    type: 'FORM_ENGINE_REQUESTING'
  });
  try {
    const response = await axios.get(
      `${azURL('ymmeGetEngineData')}/${modelId}`
    );
    dispatch({
      type: 'FORM_ENGINE_SUCCESS',
      data: response.data,
      dropDownDisableState: { make: false, model: false, engine: false }
    });
  } catch (err) {
    dispatch({ type: 'FORM_ENGINE_FAILURE', err: err.message });
  }
};

export const fetchYmmeMakeList = (year): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchMakeDropdownData(axios, year));

export const fetchYmmeModelList = (year, make, makeId): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchModelDropdownData(axios, year, make, makeId));

export const fetchYmmeEngineList = (modelId: any): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchEngineDropdownData(axios, modelId));

export const storeYmmeFormData = (
  year = '',
  make = '',
  makeId = '',
  model = '',
  engine = ''
): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'STORE_YMME_DATA', year, make, makeId, model, engine });
};

// export const YearDropdownData = (axios: any): ThunkAction => async (
//   dispatch: Dispatch
// ) => {
//   dispatch({ type: 'FORM_YEAR_REQUESTING' });
//   try {
//     const response = await axios.get(azURL('ymmeGetYrData'));
//     dispatch({ type: 'FORM_YEAR_SUCCESS', data: response.data.atgResponse });
//   } catch (err) {
//     dispatch({ type: 'FORM_YEAR_FAILURE', err: err.message });
//   }
//   return 'Action';
// };

export const fetchProfileDetails = (
  axios: any,
  URL: string = API_URL_PROFILE
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'PROFILE_DETAILS_REQUESTING' });

  try {
    const res = await axios.get(URL); // backend
    dispatch({ type: 'PROFILE_DETAILS_SUCCESS', data: res.data });
  } catch (err) {
    dispatch({ type: 'PROFILE_DETAILS_FAILURE', err });
  }
};

export const fetchStateDetails = (
  axios: any,
  URL: string = API_URL_STATE
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'STATE_LIST_DETAILS_REQUESTING' });

  try {
    const res = await axios.get(URL); // backend
    dispatch({ type: 'STATE_LIST_DETAILS_SUCCESS', data: res.data });
  } catch (err) {
    dispatch({ type: 'STATE_LIST_DETAILS_FAILURE', err });
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetch = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'FORM_YEAR_SUCCESS') return false; // Preventing double fetching data

  return true;
};

const shouldYearFetch = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'CONTACTUS_SUCCESS') return false; // Preventing double fetching data

  return true;
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldProfileFetch = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'PROFILE_DETAILS_SUCCESS') return false; // Preventing double fetching data

  return true;
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldStateFetch = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'STATE_LIST_DETAILS_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const submitFormAction = /* istanbul ignore next */ (
  values: any
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  /* istanbul ignore next */
  if (shouldFetch(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchUsers(axios, values));
  }

  /* istanbul ignore next */
  return null;
};

export const YearFormAction = /* istanbul ignore next */ (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldYearFetch(getState())) {
    /* istanbul ignore next */
    return dispatch(YearDropdownData(axios));
  }
  /* istanbul ignore next */
  return null;
};

export const getProfileDetails = /* istanbul ignore next */ (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldProfileFetch(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchProfileDetails(axios));
  }

  /* istanbul ignore next */
  return null;
};

export const getStateDetails = /* istanbul ignore next */ (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldStateFetch(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchStateDetails(axios));
  }

  /* istanbul ignore next */
  return null;
};
