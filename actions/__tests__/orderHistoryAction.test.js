/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchData, changeFilterDate } from '../orderHistory';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch order History data', () => {
  const response = {

      dateFilters:['Last 90 days']

  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates ORDER HISTORY when fetching data has been done', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'ORDER_HISTORY_REQUESTING' },
      { type: 'ORDER_HISTORY_CHANGE_FILTER_DATE', date: 'Last 90 days'},
      { type: 'ORDER_HISTORY_SUCCESS', data: response }      
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(axios,'',host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates ORDER HISTORY when date filter is passed', () => {    
    nock(host)
      .get('/?yearSelected=2018')
      .reply(200, response);

    const expectedActions = [
      { type: 'ORDER_HISTORY_REQUESTING' },
      { type: 'ORDER_HISTORY_SUCCESS', data: response }      
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(axios,'2018',host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Dispatches ORDER_HISTORY_CHANGE_FILTER_DATE when changeFilterDate is called', () => {    
    const expectedActions = [
      { type: 'ORDER_HISTORY_CHANGE_FILTER_DATE', date: 'Last 90 days'}     
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(changeFilterDate('Last 90 days')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates ORDER_HISTORY_FAILURE when fail to fetch data', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'ORDER_HISTORY_REQUESTING' },
      { type: 'ORDER_HISTORY_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(axios,'',host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
