/* @flow */

import type { SearchData, Action } from '../types';

const initialState = {
  readyStatus: 'INVALID_SEARCH',
  queryDisplayLabel: '',
  searchResult: {},
  searchValue: '',
  query: '',
  showSearchDropDown: false,
  showNarrowSearchPopup: false,
  suggestions: []
};

const search = (
  state: SearchData = initialState,
  action: Action
): SearchData => {
  switch (action.type) {
    case 'SEARCH_REQUESTING':
      return {
        ...state,
        readyStatus: 'SEARCH_REQUESTING'
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        query: state.query.replace(/[^a-zA-Z0-9 ]/g, ''),
        searchResult: action.data,
        queryDisplayLabel: action.query
          .split('=')[1]
          .replace('&currentPage', ''),
        readyStatus: 'SEARCH_SUCCESS'
      };
    case 'SEARCH_FAILURE':
      return {
        ...state,
        err: action.err,
        readyStatus: 'SEARCH_FAILURE'
      };
    case 'SHOW_SEARCH_DROPDOWN':
      return {
        ...state,
        showSearchDropDown: true
      };
    case 'HIDE_SEARCH_DROPDOWN':
      return {
        ...state,
        showSearchDropDown: false
      };
    case 'SHOW_NARROWSEARCH_POPUP':
      return {
        ...state,
        showNarrowSearchPopup: true
      };
    case 'HIDE_NARROWSEARCH_POPUP':
      return {
        ...state,
        showNarrowSearchPopup: false
      };
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.suggestions };
    case 'CLEAR_SUGGESTIONS':
      return { ...state, suggestions: [] };
    case 'CLEAR_SEARCH':
      return { ...state, query: '' };
    case 'MISSPELL_WORD_VALUE':
      return { ...state, query: action.data };
    case 'HEADER_SEARCH_CHANGE': {
      return { ...state, query: action.query };
    }
    default:
      return state;
  }
};

export default search;
