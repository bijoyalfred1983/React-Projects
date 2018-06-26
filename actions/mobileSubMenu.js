/* @flow */
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

const API_URL = azURL('topNavMenu');

// Export this for unit testing more easily
export const fetchSubMenuData = (
  axios: any,
  menu: any,
  URL: string = API_URL
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'MOBILESUBMENU_REQUESTING' });

  try {
    const subPath =
      menu.rank === 1
        ? `?topNavServletPath=${menu.topNavServletPath}&catName=${menu.catName}`
        : `?topNavServletPath=${menu.topNavServletPath}&catName=${
            menu.catName
          }&parentUrlState=${menu.parentUrlState}`;
    const response = await axios.get(`${URL}${subPath}`); // backend
    dispatch({
      type: 'MOBILESUBMENU_SUCCESS',
      data: response.data,
      mostPopularLabel: menu.displayName
    });
  } catch (err) {
    dispatch({ type: 'MOBILESUBMENU_FAILURE', err: err.message });
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchMobileSubMenu = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;
  if (state.home.readyStatus === 'MOBILESUBMENU_SUCCESS') return false; // Preventing double fetching data
  return true;
};

/* istanbul ignore next */
export const fetchMobileSubMenu = (menu: Object): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  /* istanbul ignore next */
  if (shouldFetchMobileSubMenu(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchSubMenuData(axios, menu));
  }

  return null;
};
