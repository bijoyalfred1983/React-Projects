/* @flow */

import type { OrderHistoryData, Action } from '../types';

const initialState = {
  readyStatus: 'ORDER_HISTORY_INVALID',
  err: null,
  data: {
    filteredData: [],
    orderHistoryInfoVO: []
  },
  filter: { dateRange: '', purchaseType: '' }
};

const filterMapping = {
  'Online - Ship to Home': 'ONLINE-SHIP TO HOME',
  'Online - Store Pickup': 'Store Order',
  'In Store Purchase': 'In Store Purchase',
  'Show All': ''
};

const filterItems = (items, filter) =>
  items.filter(item => {
    if (!filterMapping[filter] || filterMapping[filter] === '') return true;
    return item.orderType === filterMapping[filter];
  });

const orderHistory = (
  state: OrderHistoryData = initialState,
  action: Action
): OrderHistoryData => {
  switch (action.type) {
    case 'ORDER_HISTORY_REQUESTING':
      return {
        ...state,
        readyStatus: 'ORDER_HISTORY_REQUESTING'
      };
    case 'ORDER_HISTORY_FAILURE':
      return {
        ...state,
        readyStatus: 'ORDER_HISTORY_FAILURE',
        err: action.err
      };
    case 'ORDER_HISTORY_SUCCESS':
      return {
        ...state,
        readyStatus: 'ORDER_HISTORY_SUCCESS',
        data: {
          ...action.data,
          ...{
            filteredData: filterItems(
              action.data.orderHistoryInfoVO,
              state.filter.purchaseType
            )
          }
        }
      };
    case 'ORDER_HISTORY_CHANGE_FILTER_DATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          dateRange: action.date
        }
      };
    case 'ORDER_HISTORY_CHANGE_FILTER_TYPE':
      return {
        ...state,
        filter: {
          ...state.filter,
          purchaseType: action.orderType
        },
        data: {
          ...state.data,
          ...{
            filteredData: filterItems(
              state.data.orderHistoryInfoVO,
              action.orderType
            )
          }
        }
      };
    default:
      return state;
  }
};

export default orderHistory;
