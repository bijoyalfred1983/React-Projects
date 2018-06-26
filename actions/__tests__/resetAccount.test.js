/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchPageData } from '../resetAccount';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
const errorMessage = 'Request failed with status code 404';
const mockStore = configureMockStore([thunk]);

describe('fetch user data', () => {
  const response = {
    mf_resetpwdpage_password: 'Password'
  };

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates reset success', () => {
    nock(host)
      .get('/')
      .reply(200, response);
    const expectedActions = [
      { type: 'RESET_REQUESTING' },
      { type: 'RESET_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store.dispatch(fetchPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('create reset failure', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);
    const expectedActions = [
      { type: 'RESET_REQUESTING' },
      { type: 'RESET_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store.dispatch(fetchPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
