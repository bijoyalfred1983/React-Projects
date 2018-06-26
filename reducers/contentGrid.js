/* @flow */

import type { ContentGridData, Action } from '../types';

type State = ContentGridData;

const initialState = {
  readystatus: 'CONTENT_GRID_INVALID',
  viewInfo: [],
  err: null
};

const contentGrid = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'CONTENT_GRID_REQUESTING': {
      return {
        ...state,
        readyStatus: 'CONTENT_GRID_REQUESTING'
      };
    }
    case 'CONTENT_GRID_SUCCESS': {
      return {
        ...state,
        readyStatus: 'CONTENT_GRID_SUCCESS',
        viewInfo: action.data
      };
    }
    case 'CONTENT_GRID_FAILURE': {
      return {
        ...state,
        readyStatus: 'CONTENT_GRID_FAILURE',
        err: action.err
      };
    }

    default:
      return state;
  }
};

export default contentGrid;
