/* @flow */
import _ from 'lodash/fp';
import type { ServiceHistoryData, Action } from '../types';

const initialState = {
  addServiceStatus: false,
  editServiceData: {},
  serviceHistoryData: {},
  initialServiceList: [],
  err: ''
};

const serviceHistory = (
  state: ServiceHistoryData = initialState,
  action: Action
): ServiceHistoryData => {
  switch (action.type) {
    case 'FETCH_SERVICE_HISTORY_FAILURE':
    case 'ADD_SERVICE_HISTORY_FAILURE':
      return {
        ...state,
        addServiceStatus: false,
        err: action.err
      };
    case 'ADD_SERVICE_HISTORY_SUCCESS':
      return {
        ...state,
        addServiceStatus: true
      };
    case 'FETCH_SERVICE_HISTORY_SUCCESS':
      return {
        ...state,
        editServiceData: {},
        serviceHistoryData: action.data
      };
    case 'FETCH_INITIAL_SERVICE_HISTORY': {
      const serviceList = [];
      const { serviceHistoryData } = state;
      const vehicleServiceHistory =
        serviceHistoryData && serviceHistoryData.vehicleServiceHistory;
      if (vehicleServiceHistory && vehicleServiceHistory.length > 0) {
        for (let i = action.startIndex; i < action.endIndex; i += 1) {
          if (vehicleServiceHistory[i]) {
            serviceList.push(vehicleServiceHistory[i]);
          }
        }
      }
      return {
        ...state,
        initialServiceList: serviceList
      };
    }
    case 'SORT_SERVICE_HISTORY': {
      const serviceHistoryObj = state.serviceHistoryData;
      let vehicleService = serviceHistoryObj.vehicleServiceHistory;
      if (vehicleService && vehicleService.length > 0) {
        vehicleService = _.sortBy(action.sortByValue)(vehicleService);
        serviceHistoryObj.vehicleServiceHistory = vehicleService;
      }
      return {
        ...state,
        serviceHistoryData: serviceHistoryObj
      };
    }
    case 'EDIT_SERVICE_HISTORY_SUCCESS': {
      const serviceHistoryObj = state.serviceHistoryData;
      const vehicleService = serviceHistoryObj.vehicleServiceHistory;
      let vehicleServiceObj = {};
      if (vehicleService && vehicleService.length > 0) {
        vehicleServiceObj = vehicleService.find(
          item => item.id === action.data
        );
      }
      return {
        ...state,
        editServiceData: vehicleServiceObj
      };
    }
    default:
      return state;
  }
};

export default serviceHistory;
