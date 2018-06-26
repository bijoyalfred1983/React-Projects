/* @flow */
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';
// import orderConfirmation from '../containers/OrderConfirmation/orderConfirmationData';

const urlPath = azURL('orderConfirmation');

export const fetchPageData = (
  axios: any,
  URL: string = urlPath
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'ORDER_CONFIRMATION_REQUESTING' });

  try {
    const response = await axios.get(URL);
    // const response = { data: orderConfirmation };
    dispatch({ type: 'ORDER_CONFIRMATION_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'ORDER_CONFIRMATION_FAILURE', err: err.message });
  }
};

/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  if (__DEV__) return true;

  if (state.category.readyStatus === 'ORDER_CONFIRMATION_SUCCESS') return false;

  return true;
};

export const fetchOrderConfirmationData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchView(getState())) {
    return dispatch(fetchPageData(axios));
  }
  return null;
};
