/* @flow */

import type { MyVehicleData, Action } from '../types';

type State = MyVehicleData;

const initialState = {
  readyStatus: 'GET_VEHICLE_INVALID',
  vehicleData: {},
  removedVehicleData: {},
  updateVehicleData: {},
  ymmeTrigger: false,
  err: null,
  vehicleDataById: null
};

const myVehicle = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_VEHICLE_REQUESTING': {
      return {
        ...state,
        readyStatus: 'GET_VEHICLE_REQUESTING'
      };
    }
    case 'GET_VEHICLE_SUCCESS': {
      return {
        ...state,
        readyStatus: 'GET_VEHICLE_SUCCESS',
        vehicleData: action.data
      };
    }
    case 'GET_VEHICLE_FAILURE': {
      return {
        ...state,
        readyStatus: 'GET_VEHICLE_FAILURE',
        err: action.err
      };
    }
    case 'YMME_SHELF_TRIGGER': {
      return {
        ...state,
        readyStatus: 'YMME_SHELF_TRIGGER',
        ymmeTrigger: action.ymmeTrigger
      };
    }
    case 'REMOVE_VEHICLE_SUCCESS': {
      return {
        ...state,
        removedVehicleData: action.data
      };
    }
    case 'REMOVE_VEHICLE_FAILURE':
    case 'GET_VEHICLE_BY_ID_FAILURE': {
      return {
        ...state,
        err: action.err
      };
    }
    case 'UPDATE_VEHICLE_SUCCESS': {
      return {
        ...state,
        updateVehicleData: action.data
      };
    }
    case 'GET_VEHICLE_BY_ID_SUCCESS': {
      const { vehicleData } = state;
      let vehicleDataById = null;
      if (vehicleData && vehicleData.vehiclesInfo) {
        const { vehiclesInfo } = state.vehicleData;
        vehicleDataById =
          vehiclesInfo.length > 0 &&
          vehiclesInfo.find(item => item.vehicleId === action.vehicleId);
      }
      return {
        ...state,
        vehicleDataById
      };
    }
    default:
      return state;
  }
};

export default myVehicle;
