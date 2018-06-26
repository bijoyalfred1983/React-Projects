/* @flow */
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const API_URL = azURL('dealshomePage');
const SHOP_URL = azURL('shopByCategory');

// Export this for unit testing more easily
export const fetchPageData = (
  axios: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEALSSPLIT_REQUESTING' });

  try {
    const response = await axios.get(URL); // backend
    dispatch({ type: 'DEALSSPLIT_SUCCESS', data: response.data });
    if (
      response.data.leftNavigationInfo &&
      response.data.leftNavigationInfo.length > 0
    )
      dispatch({
        type: 'SELECT_FIRST_LEVEL_ITEM',
        item: response.data.leftNavigationInfo[0]
      });
  } catch (err) {
    dispatch({ type: 'DEALSSPLIT_FAILURE', err: err.message });
  }
};

// Export this for unit testing more easily
export const fetchPartTypesData = (
  axios: any,
  item: any,
  URL: string = SHOP_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'PART_TYPES_REQUESTING' });
  try {
    const response = await axios.get(
      `${URL}?nId=${item.nId}&isPartType=false&currentPage=1`
    ); // backend
    dispatch({ type: 'PART_TYPES_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'PART_TYPES_FAILURE', err: err.message });
  }
};

export const shopByCategory = (
  axios: any,
  item: Object,
  state: Object,
  pageNum: number,
  buffUrl: string
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({
    type: 'SELECT_FIRST_LEVEL_ITEM',
    item
  });
  dispatch({
    type: 'SELECT_PART_TYPE',
    item: { nid: -1 }
  });
  if (item.displayName === 'Featured') {
    dispatch({ type: 'DEALS_HOME' });
  } else {
    dispatch({ type: 'DEALS_LEVEL1_REQUESTING' });
    const page = pageNum ? `currentPage=${pageNum}` : '';
    const paramToSend = buffUrl || `?nId=${item.nId}&isPartType=false`;
    try {
      const response = await axios.get(`${SHOP_URL}${paramToSend}&${page}`);
      dispatch({
        type: 'DEALS_LEVEL1_SUCCESS',
        data: response.data,
        level1Label: item.displayName && item.displayName,
        buffUrl: paramToSend
      });
    } catch (err) {
      dispatch({ type: 'DEALS_LEVEL1_FAILURE', err: err.message });
    }
  }
};

export const shopByPartType = (
  axios: any,
  item: Object,
  state: Object,
  pageNum: Object,
  buffUrl: string
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'DEALS_PART_TYPES_REQUESTING' });
  const level1Selection = state.deals.selectedFirstLevelItem;
  const page = pageNum ? `currentPage=${pageNum}` : '';
  const paramToSend = buffUrl || `?nId=${item.nid}&isPartType=true`;
  try {
    dispatch({
      type: 'SELECT_PART_TYPE',
      item
    });
    const response = await axios.get(`${SHOP_URL}${paramToSend}&${page}`);
    dispatch({
      type: 'DEALS_PART_TYPES_SUCCESS',
      data: response.data,
      level1Label: `${
        level1Selection.displayName ? level1Selection.displayName : ''
      }: ${item.displayName ? item.displayName : ''}`
    });
  } catch (err) {
    dispatch({ type: 'DEALS_PART_TYPES_FAILURE', err: err.message });
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchViewForm = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'DEALSSPLIT_SUCCESS') return false; // Preventing double fetching data

  return true;
};

/* istanbul ignore next */
export const fetchDealsContentData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
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

export const fetchRebatesPageData = (axios: any): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'DEALSREBATES_REQUESTING' });

  try {
    const response = await axios.get(azURL('dealsRebatesURL'));
    dispatch({ type: 'DEALSREBATES_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'DEALSREBATES_FAILURE', err: err.message });
  }
};

// export const filterDeals = ( axios: any, dealType: string, checked: boolean): ThunkAction => async( dispatch: Dispatch) => {
//   dispatch({ type: 'DEAL_FILTER_REQUESTING' });

//   try {

//   }
// }

/* istanbul ignore next */
const shouldFetchRebatesData = (state: ReduxState): boolean => {
  if (__DEV__) return true;
  if (state.category.readyStatus === 'DEALSREBATES_SUCCESS') return false;

  return true;
};

export const fetchRebatesData = /* istanbul ignore next */ (): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  if (shouldFetchRebatesData(getState())) {
    return dispatch(fetchRebatesPageData(axios));
  }

  /* istanbul ignore next */
  return null;
};

export const getPartTypes = /* istanbul ignore next */ (
  item: Object
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchPartTypesData(axios, item));

export const fetchByCategory = /* istanbul ignore next */ (
  item: Object,
  pageNum: number,
  buffUrl: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(shopByCategory(axios, item, getState(), pageNum, buffUrl));

export const fetchByPartType = /* istanbul ignore next */ (
  item: Object,
  pageNum: number,
  buffUrl: string
): ThunkAction => /* istanbul ignore next */ (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(shopByPartType(axios, item, getState(), pageNum, buffUrl));

export const filterbyType = (dealType, checked, isMobile): ThunkAction => (
  dispatch: Dispatch
) => {
  dispatch({ type: 'DEAL_FILTER', dealType, checked, isMobile });
};
