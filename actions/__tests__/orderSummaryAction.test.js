import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchData, checkOut, emptyErrorData } from '../orderSummary';

const host = 'http://localhost';
const seoHost = '';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('Ordersummary action', () => {
  const response = { data: 'Product details page unit test case mock data' };
  const errorMessage = 'Request failed with status code 404';
  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates ORDER_SUMMARY_SUCCESS when fetching order summary details page data has been done', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [{type: 'ORDER_SUMMARY_REQUESTING'}, { type: 'ORDER_SUMMARY_SUCCESS', data: response }];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates ORDER_SUMMARY_FAILURE when fetching order summary details', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [{type: 'ORDER_SUMMARY_REQUESTING'}, { type: 'ORDER_SUMMARY_FAILURE', err: errorMessage }];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  test('creates CHECKOUT_VERIFY_SUCCESS while checking out order summary details page data has been done', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [{type: 'CHECKOUT_VERIFY_REQUESTING'}, { type: 'CHECKOUT_VERIFY_SUCCESS', data: response }, {"payload": {"args": ["/checkout"], "method": "push"}, "type": "@@router/CALL_HISTORY_METHOD"}];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(checkOut(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates CHECKOUT_VERIFY_FAILURE while checking out order summary details page data has been done', () => {
    const errorMessage = [Error: "Request failed with status code 404"];
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [{type: 'CHECKOUT_VERIFY_REQUESTING'}, { type: 'CHECKOUT_VERIFY_FAILURE', err: errorMessage }];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(checkOut(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('checks whether empty error data has been called', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = {type: 'EMPTY_DATA'};
    const initialState = {};
    const store = mockStore(initialState);

    expect(store.dispatch(emptyErrorData())).toEqual(expectedActions);
  });

});
