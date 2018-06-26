/* @flow */
import myVehicle from '../myVehicle';

describe('preferred store reducer', () => {
  test('should return the initial state for preferred store data', () => {
    expect(myVehicle(undefined, {})).toEqual({
      readyStatus: 'GET_VEHICLE_INVALID',
      vehicleData: {},
      removedVehicleData: {},
      updateVehicleData: {},
      err: null   
    });
  });

  test('should handle GET_VEHICLE_REQUESTING', () => {
    expect(
      myVehicle(undefined, {
        type: 'GET_VEHICLE_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'GET_VEHICLE_REQUESTING',
      vehicleData: {},
      removedVehicleData: {},
      updateVehicleData: {},
      err: null
    });
  });

  test('should handle GET_VEHICLE_SUCCESS', () => {
    expect(
      myVehicle(undefined, {
        type: 'GET_VEHICLE_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'GET_VEHICLE_SUCCESS',
      vehicleData: { id: '1', name: 'Welly' },
      removedVehicleData: {},
      updateVehicleData: {},
      err: null
    });
  });

  test('should handle GET_VEHICLE_FAILURE', () => {
    expect(
      myVehicle(undefined, {
        type: 'GET_VEHICLE_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'GET_VEHICLE_FAILURE',
      err: 'Oops! Something went wrong.',
      vehicleData: {},
      removedVehicleData: {},
      updateVehicleData: {}
    });
  });

  test('should handle REMOVE_VEHICLE_SUCCESS', () => {
    expect(
      myVehicle(undefined, {
        type: 'REMOVE_VEHICLE_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'GET_VEHICLE_INVALID',
      vehicleData : {},
      removedVehicleData: { id: '1', name: 'Welly' },
      updateVehicleData: {},
      err: null
    });
  });

  test('should handle REMOVE_VEHICLE_FAILURE', () => {
    expect(
      myVehicle(undefined, {
        type: 'REMOVE_VEHICLE_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'GET_VEHICLE_INVALID',
      err: 'Oops! Something went wrong.',
      vehicleData: {},
      removedVehicleData: {},
      updateVehicleData: {}
    });
  });

  test('should handle UPDATE_VEHICLE_SUCCESS', () => {
    expect(
      myVehicle(undefined, {
        type: 'UPDATE_VEHICLE_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'GET_VEHICLE_INVALID',
      vehicleData: {},
      removedVehicleData: {},
      updateVehicleData: { id: '1', name: 'Welly' },
      err: null
    });
  });

  test('should handle UPDATE_VEHICLE_FAILURE', () => {
    expect(
      myVehicle(undefined, {
        type: 'UPDATE_VEHICLE_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'GET_VEHICLE_INVALID',
      err: 'Oops! Something went wrong.',
      vehicleData: {},
      removedVehicleData: {},
      updateVehicleData: {}
    });
  });
});
