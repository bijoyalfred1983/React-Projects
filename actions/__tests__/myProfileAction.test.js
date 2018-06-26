/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchData } from '../myProfile';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch order my profile data', () => {
  const response = {
    data: 'test'
  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates MY PROFILE when fetching data has been done', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'MY_PROFILE_REQUESTING' },
      { type: 'MY_PROFILE_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates ORDER_CONFIRMATION_FAILURE when fail to fetch data', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'MY_PROFILE_REQUESTING' },
      { type: 'MY_PROFILE_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
