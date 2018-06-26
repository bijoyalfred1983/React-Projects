/* @flow */
import type { Dispatch, GetState, ThunkAction } from '../types';
import fetchMiniCartData from '../actions/miniCart';
import azURL from '../config/serviceAPI';

const BACKEND_URL = azURL('getCatData');
const API_URL_PRICE = azURL('shelfPageDetails');

export const fetchPartsData = (
  axios: any,
  newPath: any,
  URL: string = BACKEND_URL,
  PRICE_URL: string = API_URL_PRICE
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'PARTS_REQUESTING' });
  try {
    const response = await axios.get(`${URL}?seourl=${newPath}`);
    if (response.status === 200) {
      try {
        const skuIds = [];
        if (response.data.azshelfPageRecordsVO.recordsList) {
          response.data.azshelfPageRecordsVO.recordsList.map(item =>
            skuIds.push(item.skuNumber)
          );
        }
        const priceResponse = await axios.get(
          `${PRICE_URL}/${skuIds.toString()}`
        );
        dispatch({
          type: 'PRICE_SUCCESS',
          data: priceResponse.data.atgResponse,
          skuIds
        });
      } catch (err) {
        dispatch({ type: 'PRICE_FAILURE', err: err.message });
      }
      dispatch({ type: 'PARTS_SUCCESS', data: response.data });
    }
  } catch (err) {
    console.log('PARTS FAILURE');
    dispatch({ type: 'PARTS_FAILURE', err: err.message });
  }
};

const URL_ADD_TO_CART = azURL('commerceItems');

/* istanbul ignore next */
// Will change the request incoming sprints
export const addToCart = (
  axios: any,
  shelfData: any,
  priceDetails: any,
  breadCrumbData: any,
  isStorePickUp: any
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    const values = {
      catalogRefId: shelfData.repositoryId,
      productId: shelfData.productRepositoryId,
      quantity: 1,
      product: {
        id: shelfData.productRepositoryId,
        type: shelfData.vehiclSpecific ? '00' : '01'
      },
      sku: {
        id: `${shelfData.skuNumber}`
      },
      otherOptions: {
        sendToStore: `${isStorePickUp}`,
        mobileApp: true,
        oemPartNumber: shelfData.oemPartNumber ? shelfData.oemPartNumber : '',
        catalogVehicleId:
          priceDetails.azVehicleFitproductResponseVO.vehicleFit &&
          priceDetails.catalogVehicleId
            ? priceDetails.catalogVehicleId
            : '0',
        categoryId: shelfData.productRepositoryId,
        itemIdentifier: shelfData.itemIdentifier,
        storeNumber: priceDetails.preferredStoreNumber,
        productSection: breadCrumbData.listOfBreadCrumb[1].displayName,
        productCategory: breadCrumbData.listOfBreadCrumb[2].displayName,
        productSubCategory: breadCrumbData.listOfBreadCrumb[4]
          ? breadCrumbData.listOfBreadCrumb[3].displayName
          : '',
        productPart: shelfData.name ? shelfData.name : '',
        brand: shelfData.brand ? shelfData.brand : '',
        productPartTypeId: shelfData.partTypeId
          ? shelfData.partTypeId.toString()
          : '',
        isNextDayEligible: priceDetails.aZBadgesFlagVO.eligibleForNextDay,
        quickNote: shelfData.quickNote ? shelfData.quickNote : ''
      }
    };
    /* istanbul ignore next */
    const response = await axios.post(URL_ADD_TO_CART, values);
    dispatch({
      type: 'ADD_TO_CART_SUCCESS',
      data: response.data,
      skuNumber: shelfData.skuNumber,
      productData: shelfData,
      productImageUrl: shelfData.productImageUrl
    });
    if (response.status === 201) dispatch(fetchMiniCartData());
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'ADD_TO_CART_FAILURE', err: err.message });
  }
};

export const setView = (view: any) => (dispatch: Dispatch) =>
  dispatch({ type: 'SET_VIEW', view });

export const removeDataPart = () => (dispatch: Dispatch) =>
  dispatch({ type: 'EMPTY_DATA' });

export const removeDataFromPage = () => (dispatch: Dispatch) =>
  dispatch({ type: 'EMPTY_CART_ITEMS' });

export const clearPageData = () => (dispatch: Dispatch) =>
  dispatch({ type: 'CLEAR_PREVIOUS_PAGE' });

/* istanbul ignore next */
export const getPartDetails = (newPath: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => /* istanbul ignore next */ dispatch(fetchPartsData(axios, newPath));

/* istanbul ignore next */
export const addToCartCall = (
  priceDetails: any,
  shelfData: any,
  breadCrumbData: any,
  isStorePickUp: any
): ThunkAction /* istanbul ignore next */ => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) =>
  /* istanbul ignore next */ dispatch(
    addToCart(axios, shelfData, priceDetails, isStorePickUp, breadCrumbData)
  );
