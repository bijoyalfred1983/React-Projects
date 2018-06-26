/* @flow */

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';
// import orderHistory from '../containers/OrderHistory/orderHistoryData';

const urlPath = azURL('orderHistory');

export const fetchData = (
  axios: any,
  filterOption: string,
  URL: string = urlPath
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'ORDER_HISTORY_REQUESTING' });

  try {
    let response;
    if (filterOption) {
      response = await axios.get(`${URL}?yearSelected=${filterOption}`);
      // response = { data: orderHistory };
    } else {
      response = await axios.get(URL);
      // response = { data: orderHistory };
      dispatch({
        type: 'ORDER_HISTORY_CHANGE_FILTER_DATE',
        date: response.data.dateFilters[0]
      });
      dispatch({
        type: 'ORDER_HISTORY_CHANGE_FILTER_TYPE',
        orderType:
          response.data.orderTypeFilters[
            response.data.orderTypeFilters.length - 1
          ]
      });
    }
    dispatch({ type: 'ORDER_HISTORY_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'ORDER_HISTORY_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchData = (state: ReduxState): boolean => {
  if (__DEV__) return true;
  if (state.category.readyStatus === 'ORDER_HISTORY_SUCCESS') return false;

  return true;
};

export const fetchOrderHistoryData = /* istanbul ignore next */ (
  filterOption: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchData(getState())) {
    return dispatch(fetchData(axios, filterOption));
  }
  return null;
};

export const changeFilterDate = (filterOption: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'ORDER_HISTORY_CHANGE_FILTER_DATE', date: filterOption });
};

export const changeFilterType = (filterOption: string): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: 'ORDER_HISTORY_CHANGE_FILTER_TYPE',
    orderType: filterOption
  });
};
