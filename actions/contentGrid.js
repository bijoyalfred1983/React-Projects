/* @flow */

import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const API_URL = azURL('homePage');

export const fetchContentData = (URL: string = API_URL): ThunkAction => async (
  dispatch: Dispatch
) => {
  //dispatch({ type: 'CONTENT_GRID_REQUESTING' });

  try {
    const response = await axios.get(URL); // backend
    // console.log('response--', response);
    dispatch({ type: 'CONTENT_GRID_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'CONTENT_GRID_FAILURE', err: err && err.message });
  }
};

const shouldFetchView = (state: ReduxState): boolean => {
  if (__DEV__) return true;

  if (state.home.readyStatus === 'CONTENT_GRID_SUCCESS') return false; // Preventing double fetching data
  return true;
};

export const fetchContent = (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState
) => {
  if (shouldFetchView(getState())) {
    return dispatch(fetchContentData());
  }
  return null;
};

// export const fetchContentData = (): ThunkAction => async (dispatch: Dispatch) => {
//     dispatch({ type: 'CONTENT_GRID_REQUESTING' });
//     try {
//       const response = await axios.get(azURL('homePage'));
//       dispatch({ type: 'CONTENT_GRID_SUCCESS', data: response.data });
//     } catch (err) {
//       dispatch({ type: 'CONTENT_GRID_FAILURE', err: err && err.message });
//     }
//   };

// /* istanbul ignore next */
// export const fetchHeroContentData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
//     dispatch: Dispatch,
//     getState: GetState,
//     // axios: any
//   ) => {
//     /* istanbul ignore next */
//     if (shouldFetchViewForm(getState())) {
//       /* istanbul ignore next */
//       return dispatch(fetchPageData(axios));
//     }

//     /* istanbul ignore next */
//     return null;
//   };
