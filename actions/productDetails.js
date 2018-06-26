/* @flow */
import type { Dispatch, GetState, ThunkAction } from '../types';
import azURL from '../config/serviceAPI';
import fetchMiniCartData from '../actions/miniCart';

const API_URL_PRODUCT = azURL('pdpPageDetails');
const URL_ADD_TO_CART = azURL('commerceItems');

export const fetchProductData = (
  axios: any,
  seoUrl: string,
  URL: string = API_URL_PRODUCT
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`${URL}?seourl=${seoUrl}`); // backend
    dispatch({ type: 'PRODUCT_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'PRODUCT_FAILURE', err: err.message });
  }
};

export const emptyCartData = () => (dispatch: Dispatch) =>
  dispatch({ type: 'EMPTY_DATA' });

export const clearProductPageData = () => (dispatch: Dispatch) => {
  dispatch({ type: 'CLEAR_PREVIOUS_PRODUCT_PAGE' });
  dispatch({ type: 'EMPTY_CART_ITEMS' });
};

export const changeFindProduct = () => (dispatch: Dispatch) =>
  dispatch({ type: 'STORE_AVAIL_PRODUCT' });

export const fetchProductAllData = /* istanbul ignore next */ (
  seoUrl: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchProductData(axios, seoUrl));

export const addToCartRequest = /* istanbul ignore next */ (
  axios: any,
  values: Object,
  productImage: any,
  URL: string = URL_ADD_TO_CART
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const response = /* istanbul ignore next */ await axios.post(URL, values);
    dispatch({
      type: 'ADD_TO_CART_SUCCESS',
      data: response.data,
      image: productImage,
      skuNumber: Number(response.data.catalogRefId)
    });
    if (response.status === 201) dispatch(fetchMiniCartData());
  } catch (err) {
    dispatch({ type: 'ADD_TO_CART_FAILURE', err: err.message });
  }
};

export const addToCartCall = (
  forPostData: Object,
  productImage: any
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  const values = {
    catalogRefId: forPostData.catalogRefId ? `${forPostData.catalogRefId}` : '',
    productId: forPostData.productId || '177-0',
    quantity: forPostData.quantity,
    product: {
      id: forPostData.productId || '177-0',
      type: forPostData.type ? `${forPostData.type}` : ''
    },
    sku: {
      id: forPostData.skuNumber ? `${forPostData.skuNumber}` : ''
    },
    otherOptions: {
      sendToStore: forPostData.sendToStore
        ? `${forPostData.sendToStore}`
        : 'false',
      mobileApp: forPostData.mobileApp ? `${forPostData.mobileApp}` : 'false',
      oemPartNumber: forPostData.oemPartNumber
        ? `${forPostData.oemPartNumber}`
        : '',
      catalogVehicleId:
        forPostData.azVehicleFitproductResponseVO.vehicleFit &&
        forPostData.catalogVehicleId
          ? `${forPostData.catalogVehicleId}`
          : '0',
      categoryId: forPostData.categoryId ? `${forPostData.categoryId}` : '',
      itemIdentifier: forPostData.itemIdentifier
        ? `${forPostData.itemIdentifier}`
        : '',
      storeNumber: forPostData.storeNumber ? `${forPostData.storeNumber}` : ''
    }
  };
  return dispatch(addToCartRequest(axios, values, productImage));
};
