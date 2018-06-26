/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchPageData } from '../forgotAccount';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch page data for forgot Account', () => {
  const errorMessage = 'Request failed with status code 404';

  const response = {
    mf_forgotpasswordpage_forgot_invalid_email: 'Email is not valid'
  };
  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates forgot account', () => {
    nock(host)
      .get('/')
      .reply(200, response);
    const expectedActions = [
      { type: 'FORGOT_REQUESTING' },
      { type: 'FORGOT_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store.dispatch(fetchPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  //   test('forgot success', () => {
  //       nock(host).
  //       get('/test').
  //       reply(200, response);
  //     const expectedActions = [
  //       { type: 'FORGOT_REQUESTING' },
  //       { type: 'FORGOT_SUCCESS', data: response }

  //     ];
  //    const initialState = {};
  //     const store = mockStore(initialState);
  //     return store.dispatch(fetchPageData(axios, host)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);

  //     });
  // });

  test('forgot failure', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);
    const expectedActions = [
      { type: 'FORGOT_REQUESTING' },
      { type: 'FORGOT_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store.dispatch(fetchPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
