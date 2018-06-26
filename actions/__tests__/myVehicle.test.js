/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchVehicleData, removeVehicleData, updatePreferredVehicle } from '../myVehicle';

jest.mock('../../config/serviceAPI');

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('my vehicle action', () => {
  const response = {
        vehicleContentBlocks: null,
        '@class': 'com.autozone.diy.vo.AZVehiclesInfoVO',
        vehiclesInfo: [
          {
            mileageRate: null,
            estimatedMileage: null,
            vehicleName:
              '2011 Autocar MD/HD Trk Xspotter Off Road 6.7L Turbo Diesel 6cyl',
            '@class': 'com.autozone.diy.vo.AZVehicleDetailsVO',
            sendIntervals: null,
            preferredVehicle: true,
            selectMileageRate: null,
            catalogVehicleId: '5173202',
            vehicleId: '25800005',
            severeOrNormal: null
          },
          {
            mileageRate: null,
            estimatedMileage: null,
            vehicleName: '2018 Acura ILX 2.4L DI DOHC i-VTEC 4cyl',
            '@class': 'com.autozone.diy.vo.AZVehicleDetailsVO',
            sendIntervals: null,
            preferredVehicle: false,
            selectMileageRate: null,
            catalogVehicleId: '6552701',
            vehicleId: '25800002',
            severeOrNormal: null
          }
        ]
      };
  
  const errorMessage = 'Request failed with status code 404';

  const removeResponse = {
    success: 'true',
    response: 'Removed the vehicle id 25800005'
  };

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('check for fetchVehicleData success action', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'GET_VEHICLE_REQUESTING' },
      { type: 'GET_VEHICLE_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchVehicleData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('check for fetchVehicleData failuar action', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'GET_VEHICLE_REQUESTING' },
      { type: 'GET_VEHICLE_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchVehicleData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('check for removeVehicleData success action with isPreferred true', () => {
    nock(host)
      .delete('/1234')
      .reply(200, removeResponse);

    const expectedActions = [
      { type: 'REMOVE_VEHICLE_REQUESTING' },
      { type: 'REMOVE_VEHICLE_SUCCESS', data: removeResponse },
      { type: 'MYVEHICLE_REMOVE_SUCCESS' },
      { type: 'GET_VEHICLE_REQUESTING' }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(removeVehicleData('1234', true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('check for removeVehicleData success action with isPreferred false', () => {
    nock(host)
      .delete('/1234')
      .reply(200, removeResponse);

    const expectedActions = [
      { type: 'REMOVE_VEHICLE_REQUESTING' },
      { type: 'REMOVE_VEHICLE_SUCCESS', data: removeResponse },
      { type: 'GET_VEHICLE_REQUESTING' }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(removeVehicleData('1234', false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('check for removeVehicleData failuar action', () => {
    nock(host)
      .delete('/1234')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'REMOVE_VEHICLE_REQUESTING' },
      { type: 'REMOVE_VEHICLE_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(removeVehicleData('1234', true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('check for updatePreferredVehicle success action', () => {
    nock(host)
      .post('/', 'vehicleID=1234')
      .reply(200, response);

    const expectedActions = [
      { type: 'UPDATE_VEHICLE_SUCCESS', data: response },
      { type: 'GET_VEHICLE_REQUESTING' }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(updatePreferredVehicle('1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('check for updatePreferredVehicle failuar action', () => {
    nock(host)
      .post('/', 'vehicleID=1234')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'UPDATE_VEHICLE_FAILURE', err: errorMessage },
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(updatePreferredVehicle('1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
