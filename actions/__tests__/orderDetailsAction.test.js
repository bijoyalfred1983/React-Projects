/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import azURL from '../../config/serviceAPI';
import { fetchData } from '../orderDetails';

const host = 'http://localhost';
const urlPath = azURL('orderDetails');
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch order Confirmation data', () => {
  const response = {
    data: 'test'
  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates ORDER DETAILS when fetching data has been done', () => {
    const orderId = '201800';
    let orderDetailsURL = '';
    orderDetailsURL = `${urlPath}/${orderId}`;
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'ORDER_DETAILS_REQUESTING' },
      { type: 'ORDER_DETAILS_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(axios, orderId, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates ORDER DETAILS when fail to fetch data', () => {
    const orderId = '201800';
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'ORDER_DETAILS_REQUESTING' },
      { type: 'ORDER_DETAILS_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(axios, orderId, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
