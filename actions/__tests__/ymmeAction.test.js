import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import azURL from '../../config/serviceAPI';
import {
  fetchYMMEAPI,
  fetchYMMEVehicle,
  fetchYMMEYearList,
  fetchYMMEMakeList,
  fetchYMMEModelList,
  fetchYMMEEngineList,
  ymmeAddVehicle,
  ymmeRemoveVehicle,
  ymmeVehicleList
} from '../ymmeActions';

const host = 'http://localhost';
const getRelativeURL = absURL => absURL.replace(/^(?:\/\/|[^/]+)*\//, '');

// axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);
const errorMessage = 'Request failed with status code 404';
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
      },
      {
        makeId: '9018001',
        '@class': 'com.autozone.diy.ymme.bean.MakeBean',
        count: '0',
        make: 'Alfa Romeo'
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

describe('fetch page data for forgot Account', () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('fetch Make list', () => {
    const year = '201800';
    const dataYear = datasourceYear.atgResponse[0];
    const type = 'GET_MAKE';
    nock(host)
      .get(`/getMakesData/${year}`)
      .reply(200, datasourceYear);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_MAKE_SUCCESS', data: [dataYear] }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store
      .dispatch(fetchYMMEAPI(axios, year, dataYear, type, host))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  //
  test('fetch Model list', () => {
    const dataMake = datasourceMake.atgResponse;
    const year = '2018004';
    const type = 'GET_MODEL';
    nock(host)
      .get(`/getModelData/${year}/${dataMake.make}/${dataMake.makeId}`)
      .reply(200, datasourceMake);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_MODEL_SUCCESS', data: dataMake }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store
      .dispatch(fetchYMMEAPI(axios, year, dataMake, type, host))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('fetch engine list', () => {
    const dataEngine = datasourceEngine.atgResponse[0];
    const year = '2018004';
    const type = 'GET_ENGINE';
    const modelId = '9637900';
    nock(host)
      .get(`/getEnginesData/${modelId}`)
      .reply(200, datasourceEngine);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_ENGINE_SUCCESS', data: [dataEngine] }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store
      .dispatch(
        fetchYMMEAPI(axios, year, datasourceModel.atgResponse[0], type, host)
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('creates YMME_FAILURE when fail to fetch YMME API', () => {
    const type = 'GET_YEAR';
    const year = '2018004';
    nock(host)
      .get('/getYearsData')
      .replyWithError(errorMessage);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store
      .dispatch(fetchYMMEAPI(axios, year, errorMessage, type, host))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('creates YMME_FAILURE when fail to fetchYMMEVehicle', () => {
    const type = 'REMOVE_VEHICLE';
    nock(host)
      .get('/removeDefaultVehicle')
      .replyWithError(errorMessage);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store
      .dispatch(fetchYMMEVehicle(axios, errorMessage, type, host))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('add vehicle renders correctly', () => {
    const dataEngine = datasourceEngine.atgResponse[0];
    const type = 'ADD_VEHICLE';
    nock(host)
      .post(`/addVehicle?engineID=${dataEngine.engineId}`)
      .reply(200, dataEngine);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_ADD_VEHICLE_SUCCESS', data: dataEngine },
      { type: 'YMME_VEHICLE_LIST_SUCCESS', data: dataEngine }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store
      .dispatch(fetchYMMEVehicle(axios, dataEngine, type, host))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('fetch year list', () => {
    const dataYear = datasourceYear.atgResponse[0];
    const year = '201800';
    const type = 'GET_YEAR';
    nock(host)
      .get(`/getYearsData`)
      .reply(200, datasourceYear);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_YEAR_SUCCESS', data: [dataYear] }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store
      .dispatch(fetchYMMEAPI(axios, year, dataYear, type, host))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('remove Vehicle', () => {
    const type = 'REMOVE_VEHICLE';
    nock(host)
      .get(`/removeDefaultVehicle`)
      .reply(200, 'REMOVE_VEHICLE');
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_REMOVE_VEHICLE_SUCCESS', data: 'REMOVE_VEHICLE' }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store
      .dispatch(fetchYMMEVehicle(axios, 'REMOVE_VEHICLE', type, host))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('Fetch Vehicle List', () => {
    const type = 'VEHICLE_LIST';
    nock(host)
      .get(`/vehicleList`)
      .reply(200, 'VEHICLE_LIST');
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_VEHICLE_LIST_SUCCESS', data: 'VEHICLE_LIST' }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store
      .dispatch(fetchYMMEVehicle(axios, 'VEHICLE_LIST', type, host))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('fetchYMMEYearList testing', () => {
    const data = {
      fyear: 2018,
      atgResponse: 'test'
    };
    nock(__BACKEND_URL__)
      .get(`/${getRelativeURL(azURL('ymmeGetYrData'))}`)
      .reply(200, data);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_YEAR_SUCCESS', data: 'test' }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    const fetchYMMEYearListAction = fetchYMMEYearList();
    return fetchYMMEYearListAction(store.dispatch, store.getState, axios).then(
      () => {
        expect(store.getActions()).toEqual(expectedActions);
      }
    );
  });

  test('fetchYMMEMakeList testing', () => {
    const data = {
      year: 2018,
      atgResponse: 'test'
    };
    // console.log(`${__BACKEND_URL__}${getRelativeURL(API_URL+'/getMakesData/'+data.year)}`);
    nock(__BACKEND_URL__)
      .get(`/${getRelativeURL(`${azURL('ymmeGetMakesData')}/${data.year}`)}`)
      .reply(200, data);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_MAKE_SUCCESS', data: 'test' }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    const fetchYMMEMakeListAction = fetchYMMEMakeList(data);
    return fetchYMMEMakeListAction(store.dispatch, store.getState, axios).then(
      () => {
        expect(store.getActions()).toEqual(expectedActions);
      }
    );
  });

  test('fetchYMMEEngineList testing', () => {
    const data = {
      modelId: '9637900',
      atgResponse: 'test'
    };
    const modelId = '9637900';
    nock(__BACKEND_URL__)
      .get(`/${getRelativeURL(`${azURL('ymmeGetEngineData')}/${modelId}`)}`)
      .reply(200, data);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_ENGINE_SUCCESS', data: 'test' }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    const fetchYMMEEngineListAction = fetchYMMEEngineList(modelId, data);
    return fetchYMMEEngineListAction(
      store.dispatch,
      store.getState,
      axios
    ).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('fetchYMMEModelList testing', () => {
    const data = {
      year: 2018,
      make: 'Acura',
      makeId: '9018099',
      atgResponse: 'test'
    };

    nock(__BACKEND_URL__)
      .get(
        `/${getRelativeURL(
          `${azURL('ymmeGetModelData')}/${data.year}/${data.make}/${data.makeId}`
        )}`
      )
      .reply(200, data);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_MODEL_SUCCESS', data: 'test' }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    const fetchYMMEModelListAction = fetchYMMEModelList(data.year, data);
    return fetchYMMEModelListAction(store.dispatch, store.getState, axios).then(
      () => {
        expect(store.getActions()).toEqual(expectedActions);
      }
    );
  });

  test('ymmeAddVehicle testing', () => {
    const data = {
      engineId: '36379001',
      atgResponse: 'test'
    };
    nock(__BACKEND_URL__)
      .post(
        `/${getRelativeURL(`${azURL('ymmeAddVehicle')}?engineID=${data.engineId}`)}`
      )
      .reply(200, data.atgResponse);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_ADD_VEHICLE_SUCCESS', data: 'test' },
      { type: 'YMME_VEHICLE_LIST_SUCCESS', data: 'test' }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    const ymmeAddVehicleAction = ymmeAddVehicle(data);
    return ymmeAddVehicleAction(store.dispatch, store.getState, axios).then(
      () => {
        expect(store.getActions()).toEqual(expectedActions);
      }
    );
  });

  test('REMOVE_VEHICLE testing', () => {
    const data = {
      atgResponse: 'test'
    };
    nock(__BACKEND_URL__)
      .get(`/${getRelativeURL(azURL('ymmeRemoveDefVehicle'))}`)
      .reply(200, data.atgResponse);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_REMOVE_VEHICLE_SUCCESS', data: 'test' }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    const ymmeRemoveVehicleAction = ymmeRemoveVehicle();
    return ymmeRemoveVehicleAction(store.dispatch, store.getState, axios).then(
      () => {
        expect(store.getActions()).toEqual(expectedActions);
      }
    );
  });

  test('ymmeVehicleList testing', () => {
    const data = {
      atgResponse: 'test'
    };
    nock(__BACKEND_URL__)
      .get(`/${getRelativeURL(azURL('ymmeVehicleList'))}`)
      .reply(200, data.atgResponse);
    const expectedActions = [
      { type: 'YMME_REQUESTING' },
      { type: 'YMME_VEHICLE_LIST_SUCCESS', data: 'test' }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    const ymmeVehicleListAction = ymmeVehicleList();
    return ymmeVehicleListAction(store.dispatch, store.getState, axios).then(
      () => {
        expect(store.getActions()).toEqual(expectedActions);
      }
    );
  });
});
