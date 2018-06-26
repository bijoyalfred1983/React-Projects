/* @flow */

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const urlPath = azURL('orderDetails');

export const fetchData = (
  axios: any,
  orderId: number,
  host: any
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'ORDER_DETAILS_REQUESTING' });

  try {
    const response = await axios.get(host);
    dispatch({ type: 'ORDER_DETAILS_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'ORDER_DETAILS_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchData = (state: ReduxState): boolean => {
  if (__DEV__) return true;
  if (state.category.readyStatus === 'ORDER_DETAILS_SUCCESS') return false;

  return true;
};

export const fetchOrderDetailsData = /* istanbul ignore next */ (
  orderId
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchData(getState())) {
    const orderDetailsURL = `${urlPath}/${orderId}`;
    return dispatch(fetchData(axios, orderId, orderDetailsURL));
  }
  return null;
};
