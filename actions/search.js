/* @flow */
import { push } from 'react-router-redux';
import root from 'window-or-global';
import type { Dispatch, ThunkAction, GetState } from '../types';
import azURL from '../config/serviceAPI';

const SEARCH_URL = azURL('search');
const SEARCH_FILTER_URL = azURL('searchFilter');
const SUGGESTIONS_URL = azURL('suggestions');

export const getSearchResults = (
  axios: any,
  query: string
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SEARCH_REQUESTING' });
  try {
    const response = await axios.get(`${SEARCH_URL}?${query.split('?')[1]}`);
    const { redirectPageType, location, redirect } = response.data;

    dispatch({ type: 'SEARCH_SUCCESS', data: response.data, query });
    if (redirect && location.includes('http')) {
      root.location = location;
    } else if (redirectPageType === 'ProductDetail') {
      dispatch(
        push({
          pathname: `${location.split('&')[0]}`,
          state: { pageType: `${redirectPageType}` },
          action: 'REPLACE'
        })
      );
    } else if (redirect && location.includes('deals')) {
      dispatch(
        push({
          pathname: location,
          action: 'REPLACE'
        })
      );
    }
    // else {
    //   dispatch(
    //     push({
    //       pathname: query
    //     })
    //   );
    // }
  } catch (err) {
    dispatch({ type: 'SEARCH_FAILURE', err: err.message });
  }
};

export const getSearchFilterData = (
  axios: any,
  url: string
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'SEARCH_REQUESTING' });
  try {
    const response = await axios.get(`${SEARCH_FILTER_URL}${url}`);
    const { searchResults } = response.data;
    dispatch({ type: 'SEARCH_SUCCESS', data: response.data });
    dispatch(
      push({
        pathname: url,
        state: { pageType: `${searchResults.pageType}` },
        action: 'REPLACE'
      })
    );
  } catch (err) {
    dispatch({ type: 'SEARCH_FAILURE', err: err.message });
  }
};

export const searchFilter = (
  url
): ThunkAction /* istanbul ignore next */ => async (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  await dispatch(getSearchFilterData(axios, url));
};

export const searchResult = (
  query
): ThunkAction /* istanbul ignore next */ => async (dispatch: Dispatch) => {
  dispatch(
    push({
      pathname: `searchresult?searchText=${query}`,
      state: { pageType: 'searchResults' }
    })
  );
};

export const misSpellWord = query => async (dispatch: Dispatch) => {
  dispatch({ type: 'MISSPELL_WORD_VALUE', data: query });
  await dispatch(searchResult(query));
};

export const fetchSearch = (
  query
): ThunkAction /* istanbul ignore next */ => async (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  await dispatch(getSearchResults(axios, query));
};

export const fetchSuggestions = (query: string): ThunkAction => async (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => {
  const response = await axios.get(`${SUGGESTIONS_URL}?searchText=${query}`);
  const { terms } = response.data;
  return dispatch({ type: 'SET_SUGGESTIONS', suggestions: terms || [] });
};
