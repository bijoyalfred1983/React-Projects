/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchUsers } from '../submitForm';

const host = 'http://localhost/path';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
const mockStore = configureMockStore([thunk]);

describe('submitForm action', () => {
  const postData = {
    data: 'test data'
  };

  const postResponse = {
    data: 'test data'
  };

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates SUBMIT_SUCCESS when submitting create account data succeeds', () => {
    nock(host)
      .post('', postData)
      .reply(200, postResponse);

    const expectedActions = [
      { type: 'SUBMIT_REQUESTING' },
      { type: 'SUBMIT_SUCCESS', data: postResponse },
      {
        payload: { args: ['/Confirmation'], method: 'push' },
        type: '@@router/CALL_HISTORY_METHOD'
      }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchUsers(axios, postData, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates SUBMIT_FAILURE when submitting create account data fails', () => {
    nock(host)
      .post('', postData)
      .reply(404);

    const expectedActions = [
      { type: 'SUBMIT_REQUESTING' },
      { type: 'SUBMIT_FAILURE', error: '' }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchUsers(axios, postData, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
