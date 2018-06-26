/* @flow */
import { push } from 'react-router-redux';
import type { Dispatch, GetState, ThunkAction } from '../types';
import azURL from '../config/serviceAPI';

const API_URL_SUBCAT = azURL('topNavMenu');
// dispatch(fetchSubData(axios, item, id, label, 'l2')); //  { type: 'FETCH_SUBMENU', id, label }
export const fetchSubData = (
  axios: any,
  menu: any,
  level: string,
  subPath: string,
  vehicleId: string,
  URL: string = API_URL_SUBCAT
): ThunkAction => async (dispatch: Dispatch) => {
  try {
    let subQuery;
    let parentUrlState = '';
    let topNavServletPath;
    const vehicleIdUrl = vehicleId ? `&vehicleId=${vehicleId}` : '';
    // const vehicleIdUrl = `&vehicleId=${vehicleId ? vehicleId : ''}`;
    // const vehicleIdUrl = `&vehicleId=38800080`;
    if (level === 'l1') {
      subQuery = {
        topNavServletPath: menu.topNavServletPath,
        catName: menu.catName
      };
      if (menu.rank !== 1) {
        parentUrlState = vehicleIdUrl
          ? `&parentUrlState=${menu.parentUrlState}`
          : `&parentUrlState=${menu.parentUrlState}`;
      }
      subQuery = {
        topNavServletPath: menu.topNavServletPath,
        catName: menu.catName
      };
      topNavServletPath = `?topNavServletPath=${menu.topNavServletPath}`;
    } else {
      subQuery = subPath;
      parentUrlState = vehicleIdUrl
        ? `&parentUrlState=${menu.seoUrl}/_/N-${menu.NId}`
        : `&parentUrlState=${menu.seoUrl}/_/N-${menu.NId}`;
      topNavServletPath = `?topNavServletPath=${subPath.topNavServletPath}`;
    }
    // const topNavServletPath = `?topNavServletPath=${subPath.topNavServletPath}`;
    const response = await axios.get(
      `${URL}${topNavServletPath}${parentUrlState}${vehicleIdUrl}`,
      {
        // headers: subQuery,
        withCredentials: true
      }
    );
    //  const response = await axios.get(`${URL}${subQuery}${parentUrlState}`); // backend
    let actionType: string;
    let apiData: Object;
    if (level === 'l1') {
      actionType = 'SUBCAT_SUCCESS';
      apiData = response.data; // data: response.data
    } else if (level === 'l2') {
      actionType = 'FETCH_SUBMENU';
      apiData = response.data; // data: response.data
    } else if (level === 'l3') {
      actionType = 'FETCH_SUBMENU_2';
      apiData = response.data; // data: response.data
    }
    // dispatch({ type: 'SUBCAT_SUCCESS', data: response.data });
    dispatch({ type: actionType, data: apiData, label: menu.label, subQuery });
  } catch (err) {
    dispatch({ type: 'SUBCAT_FAILURE', err: err.message });
  }
};

export const fetchSubDataCall = (
  menu: any,
  level: string,
  vehicleId: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchSubData(axios, menu, level, '', vehicleId));

export const firstCatGet = (
  item: Object,
  level: string,
  subPath: string,
  vehicleId: string
) => (dispatch: Dispatch, getState: GetState, axios: any) => {
  dispatch(fetchSubData(axios, item, level, subPath, vehicleId));
};

export const fetchLevel2 = (
  item: Object,
  level: string,
  subPath: string,
  vehicleId: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) => {
  dispatch(fetchSubData(axios, item, level, subPath, vehicleId));
};

export const fetchMostPopular = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'FETCH_MOST_POP' });
};

export const resetTopNavData = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'RESET_NAV_DATA' });
};

export const getDeals = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch(
    push({
      pathname: 'deals/hotDeal',
      state: { pageType: `deals` },
      action: 'REPLACE'
    })
  );
};
