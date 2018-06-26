import type { Action } from '../types';

const initialState = {
  readyStatus: 'USER_CONTENT_INVALID',
  err: null,
  data: {}
};

const userContent = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'USER_CONTENT_REQUESTING':
      return {
        ...state,
        readyStatus: 'USER_CONTENT_REQUESTING'
      };
    case 'USER_CONTENT_FAILURE':
      return {
        ...state,
        readyStatus: 'USER_CONTENT_FAILURE',
        err: action.err
      };
    case 'USER_CONTENT_SUCCESS':
      return {
        ...state,
        readyStatus: 'USER_CONTENT_SUCCESS',
        data: action.data
      };
    default:
      return state;
  }
};

export default userContent;
