/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchPageData } from '../heroContent';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch user data', () => {
  const response = {
    LayoutCode: 'Full-Right'
  };

  const errorMessage = 'Request failed with status code 404';

  afterEach(() => {
    nock.disableNetConnect();
  });

  test('creates HERO_SUCCESS when fetching user has been done', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'HERO_REQUESTING' },
      { type: 'HERO_SUCCESS', data: response }
    ];
    const store = mockStore({ info: null });

    return store.dispatch(fetchPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates HERO_FAILURE when fail to fetch user', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'HERO_REQUESTING' },
      { type: 'HERO_FAILURE', err: errorMessage }
    ];
    const store = mockStore({ err: null });

    return store.dispatch(fetchPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
