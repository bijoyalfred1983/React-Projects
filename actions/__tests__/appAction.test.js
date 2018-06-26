/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchStaticLabelPageData } from '../app';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch App data', () => {
  const response = {
    data: 'test'
  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates STATICLABEL_SUCCESS when fetching app data has been done', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'STATICLABEL_REQUESTING' },
      { type: 'STATICLABEL_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchStaticLabelPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates STATICLABEL_FAILURE when fail to fetch data', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'STATICLABEL_REQUESTING' },
      { type: 'STATICLABEL_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchStaticLabelPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
