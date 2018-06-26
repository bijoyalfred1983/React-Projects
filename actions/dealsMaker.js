/* @flow */
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import fetchCartData from './cart';
import azURL from '../config/serviceAPI';

// Export this for unit testing more easily
export const fetchDealsMakerData = (
  axios: Object,
  dealId: string,
  isOnlineDeal: string
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEALS_MAKER_REQUESTING' });
  const API_URL =
    isOnlineDeal === 'true' ? azURL('onlineDealMaker') : azURL('dealMaker');
  try {
    const response = await axios.get(`${API_URL}/${dealId}`); // backend
    dispatch({ type: 'DEALS_MAKER_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'DEALS_MAKER_FAILURE', err: err.message });
  }
};

export const postNextStepData = (
  axios: Object,
  postData: Object,
  isOnlineDeal: string,
  isLastStep: boolean
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEALS_MAKER_NEXT_STEP_REQUESTING' });
  const API_URL =
    isOnlineDeal === 'true'
      ? azURL('onlineDealNextStep')
      : azURL('dealNextStep');
  try {
    const response = await axios.post(API_URL, postData); // backend
    dispatch({ type: 'DEALS_MAKER_NEXT_STEP_SUCCESS', data: response.data });
    if (isLastStep) {
      dispatch(fetchCartData());
    }
  } catch (err) {
    console.log('errerr', err);
    dispatch({ type: 'DEALS_MAKER_NEXT_STEP_FAILURE', err: err.message });
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchDealsMakerData = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.dealsMaker.readyStatus === 'DEALS_MAKER_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const fetchDealsMaker = /* istanbul ignore next */ (
  dealId: string,
  isOnlineDeal: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchDealsMakerData(getState())) {
    return dispatch(fetchDealsMakerData(axios, dealId, isOnlineDeal));
  }
  return null;
};

export const itemQuantityChange = /* istanbul ignore next */ (
  quantity: number,
  constraintIndex: number,
  itemIndex: number
): ThunkAction => /* istanbul ignore next */ (dispatch: Dispatch) => {
  dispatch({
    type: 'DEALS_MAKER_QUANTITY_UPDATE',
    quantity,
    constraintIndex,
    itemIndex
  });
};

export const postNextStep = /* istanbul ignore next */ (
  postData: Object,
  isOnlineDeal: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: Object
) => dispatch(postNextStepData(axios, postData, isOnlineDeal));

export const editDealStep = /* istanbul ignore next */ (
  editData: Object,
  isOnlineDeal: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: Object
) => dispatch(postNextStepData(axios, editData, isOnlineDeal));
