/* @flow */

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';
import { getCookie } from '../utils/common';

const urlPath = azURL('getCatData');

export const fetchPageData = (
  axios: any,
  param: string,
  URL: string = urlPath
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'CATEGORY_REQUESTING' });

  try {
    // const vehicleId = getCookie('m_vehicles') || 38800080;
    const vehicleId = getCookie('m_vehicles');
    const vehicleQuery = vehicleId ? `&vehicle_id=${vehicleId}` : '';
    const completeURL = `${URL}?seourl=${param}${vehicleQuery}`;
    const response = await axios.get(completeURL); // backend
    dispatch({ type: 'CATEGORY_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'CATEGORY_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.category.readyStatus === 'CATEGORY_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const fetchCategoryData = /* istanbul ignore next */ (
  param: any
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchView(getState())) {
    return dispatch(fetchPageData(axios, param));
  }
  return null;
};

// Subcategory data

export const fetchPageSubData = (
  axios: any,
  param: string,
  URL: string = urlPath
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'SUB_CATEGORY_REQUESTING' });

  try {
    const completeURL = `${URL}?seourl=${param}`;
    const response = await axios.get(completeURL); // backend
    dispatch({ type: 'SUB_CATEGORY_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'SUB_CATEGORY_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchSubView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.subCategory.readyStatus === 'SUB_CATEGORY_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const fetchSubCategoryData = /* istanbul ignore next */ (
  param: any
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchSubView(getState())) {
    return dispatch(fetchPageSubData(axios, param));
  }
  return null;
};
