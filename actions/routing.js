/* @flow */
import { push } from 'react-router-redux';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const urlPath = azURL('getCatData');
const API_URL_PRODUCT = azURL('pdpPageDetails');

export const fetchRoutingPageData = (
  axios: any,
  param: string
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'ROUTING_REQUESTING' });
  const hasNumber = /\/([0-9]+)/;
  const reqUrl = hasNumber.test(param) ? API_URL_PRODUCT : urlPath;
  try {
    const completeURL = `${reqUrl}?seourl=${param}`;
    const response = await axios.get(completeURL); // backend
    const { pageType } = response.data;
    global.routingState = pageType;
    dispatch({ type: 'ROUTING_SUCCESS', data: response.data });
    const newRoute = response.data.redirect;
    console.log('response.data.location', response.data.location);
    if (newRoute) {
      dispatch(
        push({
          pathname: `${response.data.location}`,
          action: 'REPLACE'
        })
      );
    }
    // dispatch();
    // push({
    //   pathname: `${param}`,
    //   state: { pageType: `${pageType}` },
    //   action: 'REPLACE'
    // })
  } catch (err) {
    dispatch({ type: 'ROUTING_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.category.readyStatus === 'ROUTING_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const fetchRoutingData = /* istanbul ignore next */ (
  param: any
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchView(getState())) {
    return dispatch(fetchRoutingPageData(axios, param));
  }
  return null;
};
