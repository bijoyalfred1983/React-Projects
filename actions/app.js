/* @flow */
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const API_URL = azURL('staticLabel');

// Export this for unit testing more easily
export const setHeaderState = (status: boolean): ThunkAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: 'HEADER_STATE_SUCCESS', status });
  } catch (err) {
    dispatch({ type: 'HEADER_STATE_FAILURE' });
  }
};

// Export this for unit testing more easily
export const setFooterState = (status: boolean): ThunkAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: 'FOOTER_STATE_SUCCESS', status });
  } catch (err) {
    dispatch({ type: 'FOOTER_STATE_FAILURE' });
  }
};

/* istanbul ignore next */
export const setHeaderStatus = (status: boolean): ThunkAction => (
  dispatch: Dispatch
) => dispatch(setHeaderState(status));

/* istanbul ignore next */
export const setFooterStatus = (status: boolean): ThunkAction => (
  dispatch: Dispatch
) => dispatch(setFooterState(status));

export const fetchStaticLabelPageData = (
  axios: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  // dispatch({ type: 'STATICLABEL_REQUESTING' });

  try {
    const response = await axios.get(URL); // backend
    dispatch({
      type: 'STATICLABEL_SUCCESS',
      data: response.data.en_US || response.data.es_MX
    });
  } catch (err) {
    dispatch({ type: 'STATICLABEL_FAILURE', err: err.message });
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchStaticLabel = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;
  if (state.home.readyStatus === 'STATICLABEL_SUCCESS') return false; // Preventing double fetching data
  return true;
};

/* istanbul ignore next */
export const fetchStaticLabelData = /* istanbul ignore next */ (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldFetchStaticLabel(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchStaticLabelPageData(axios));
  }
  /* istanbul ignore next */
  return null;
};
