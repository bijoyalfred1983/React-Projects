/* @flow */
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const API_URL = azURL('homePage');

// Export this for unit testing more easily
export const fetchPageData = (
  axios: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'HERO_REQUESTING' });

  try {
    const response = await axios.get(URL); // backend
    dispatch({ type: 'HERO_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'HERO_FAILURE', err: err.message });
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchViewForm = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'HERO_SUCCESS') return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
export const fetchHeroContentData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldFetchViewForm(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchPageData(axios));
  }

  /* istanbul ignore next */
  return null;
};
