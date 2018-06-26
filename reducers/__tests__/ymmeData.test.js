/* @flow */
import ymmeData from '../ymmeData';

let datasourceYear = {};
let datasourceMake = {};
let datasourceModel = {};
let datasourceEngine = {};
beforeEach(() => {
  datasourceYear = {
    atgResponse: [
      {
        '@class': 'com.autozone.diy.ymme.bean.YearBean',
        year: '201800',
        count: '0',
        yearId: '9018000'
      }
    ]
  };
  datasourceMake = {
    atgResponse: [
      {
        makeId: '9018099',
        '@class': 'com.autozone.diy.ymme.bean.MakeBean',
        count: '0',
        make: 'Acura'
      }
    ]
  };
  datasourceModel = {
    atgResponse: [
      {
        '@class': 'com.autozone.diy.ymme.bean.ModelBean',
        modelId: '9637900',
        count: '0',
        model: 'RDX 2WD'
      }
    ]
  };

  datasourceEngine = {
    atgResponse: [
      {
        '@class': 'com.autozone.diy.ymme.bean.EngineBean',
        engine: '6 Cylinders   3.5L FI SOHC VTEC',
        count: '0',
        engineId: '36379001'
      }
    ]
  };
});

describe('forgot form data', () => {
  test('should return the initial state', () => {
    expect(ymmeData(undefined, {})).toEqual({
      readyStatus: 'YMME_INVALID',
      err: null,
      data: {}
    });
  });

  test('should handle YMME_REQUESTING', () => {
    expect(
      ymmeData(undefined, {
        type: 'YMME_REQUESTING',
        err: null,
        data: {}
      })
    ).toEqual({
      readyStatus: 'YMME_REQUESTING',
      err: null,
      data: {}
    });
  });

  test('should handle YMME_FAILURE', () => {
    expect(
      ymmeData(undefined, {
        type: 'YMME_FAILURE',
        err: 'Oops! Something went wrong.',
        data: {}
      })
    ).toEqual({
      readyStatus: 'YMME_FAILURE',
      err: 'Oops! Something went wrong.',
      data: {}
    });
  });

  test('should handle YMME_YEAR_SUCCESS', () => {
    expect(
      ymmeData(undefined, {
        type: 'YMME_YEAR_SUCCESS',
        err: null,
        data: datasourceYear.atgResponse[0]
      })
    ).toEqual({
      readyStatus: 'YMME_YEAR_SUCCESS',
      err: null,
      data: { yearList: datasourceYear.atgResponse[0] }
    });
  });

  test('should handle YMME_MAKE_SUCCESS', () => {
    expect(
      ymmeData(undefined, {
        type: 'YMME_MAKE_SUCCESS',
        err: null,
        data: datasourceMake.atgResponse[0]
      })
    ).toEqual({
      readyStatus: 'YMME_MAKE_SUCCESS',
      err: null,
      data: { makeList: datasourceMake.atgResponse[0] }
    });
  });
  test('should handle YMME_MODEL_SUCCESS', () => {
    expect(
      ymmeData(undefined, {
        type: 'YMME_MODEL_SUCCESS',
        err: null,
        data: datasourceModel.atgResponse[0]
      })
    ).toEqual({
      readyStatus: 'YMME_MODEL_SUCCESS',
      err: null,
      data: { modelList: datasourceModel.atgResponse[0] }
    });
  });
  test('should handle YMME_ENGINE_SUCCESS', () => {
    expect(
      ymmeData(undefined, {
        type: 'YMME_ENGINE_SUCCESS',
        err: null,
        data: datasourceEngine.atgResponse[0]
      })
    ).toEqual({
      readyStatus: 'YMME_ENGINE_SUCCESS',
      err: null,
      data: { engineList: datasourceEngine.atgResponse[0] }
    });
  });

  test('should handle YMME_ADD_VEHICLE_SUCCESS', () => {
    expect(
      ymmeData(undefined, {
        type: 'YMME_ADD_VEHICLE_SUCCESS',
        err: null,
        data: 'Added vehicle'
      })
    ).toEqual({
      readyStatus: 'YMME_ADD_VEHICLE_SUCCESS',
      err: null,
      data: { addedVehicle: 'Added vehicle' }
    });
  });

  test('should handle YMME_REMOVE_VEHICLE_SUCCESS', () => {
    expect(
      ymmeData(undefined, {
        type: 'YMME_REMOVE_VEHICLE_SUCCESS',
        err: null,
        data: 'remove vehicle'
      })
    ).toEqual({
      readyStatus: 'YMME_REMOVE_VEHICLE_SUCCESS',
      err: null,
      data: { removedVehicle: 'remove vehicle' }
    });
  });

  test('should handle YMME_VEHICLE_LIST_SUCCESS', () => {
    expect(
      ymmeData(undefined, {
        type: 'YMME_VEHICLE_LIST_SUCCESS',
        err: null,
        data: 'ymme vehicle list'
      })
    ).toEqual({
      readyStatus: 'YMME_VEHICLE_LIST_SUCCESS',
      err: null,
      data: { vehicleList: 'ymme vehicle list' }
    });
  });
});
