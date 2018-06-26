import type { Action } from '../types';

const initialStateRoute = {
  readyStatus: 'ROUTING_INVALID',
  err: null,
  routeData: {}
};

const routing = (state = initialStateRoute, action: Action) => {
  switch (action.type) {
    case 'ROUTING_REQUESTING':
      return {
        ...state,
        readyStatus: 'ROUTING_REQUESTING'
      };
    case 'ROUTING_FAILURE':
      return {
        ...state,
        readyStatus: 'ROUTING_FAILURE',
        err: action.err
      };
    case 'ROUTING_SUCCESS':
      return {
        ...state,
        readyStatus: 'ROUTING_SUCCESS',
        routeData: action.data
      };
    default:
      return state;
  }
};

export default routing;
