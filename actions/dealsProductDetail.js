/* @flow */
import type { Dispatch, GetState, ThunkAction } from '../types';
import azURL from '../config/serviceAPI';

const API_URL_PRODUCT = azURL('dealsProductDetail');

export const fetchDealsProductData = (
  axios: any,
  dealId: string,
  skuId: string,
  URL: string = API_URL_PRODUCT
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${URL}/${dealId}/${skuId}`); // backend
    dispatch({ type: 'DEAL_PRODUCT_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'DEAL_PRODUCT_FAILURE', err: err.message });
  }
};

export const fetchDealsProductAllData = /* istanbul ignore next */ (
  dealId: string,
  skuId: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDealsProductData(axios, dealId, skuId));
