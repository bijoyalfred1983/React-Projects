/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { submitForm } from '../forgotPassword';

const host = 'http://localhost/path';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('submitForgotForm action', () => {
  const values = { testValue: 'test' };
  const response = { testResponse: 'test' };
  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates SUBMITFORGOT_SUCCESS when submitting forgot password form data is successfull', () => {
    nock(host)
      .post('')
      .reply(200, response);

    const expectedActions = [
      { type: 'SUBMITFORGOT_REQUESTING' },
      { type: 'SUBMITFORGOT_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(submitForm(axios, values, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates SUBMITFORGOT_FAILURE when submitting forgot password form data has failed', () => {
    nock(host)
      .post('')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'SUBMITFORGOT_REQUESTING' },
      { type: 'SUBMITFORGOT_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(submitForm(axios, values, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
