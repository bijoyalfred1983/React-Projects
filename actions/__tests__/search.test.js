import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import azURL from '../../config/serviceAPI';
import { misSpellWord } from '../search';

jest.mock('../../config/serviceAPI');

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk.withExtraArgument(axios)]);

describe('search action', () => {
  const errorMessage = '404';

  const response = {
    searchResults: {
      pageType: '',
      redirectUrl: 'test1&test2'
    }
  };

  const query = 'test';

  const SEARCH_URL = azURL('search');

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('misSpellWord with no pageType', () => {
    nock(host)
      .get(`${SEARCH_URL}?searchText=${query}`)
      .reply(200, response);
    const expectedActions = [
      { type: 'MISSPELL_WORD_VALUE', data: query },
      { type: 'SEARCH_REQUESTING' },
      { type: 'SEARCH_SUCCESS', data: response, query },
      {
        payload: { args: ['/search'], method: 'push' },
        type: '@@router/CALL_HISTORY_METHOD'
      }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store.dispatch(misSpellWord(query)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('misSpellWord with ProductDetail pageType', () => {
    response.searchResults.pageType = 'ProductDetail';
    nock(host)
      .get(`${SEARCH_URL}?searchText=${query}`)
      .reply(200, response);
    const expectedActions = [
      { type: 'MISSPELL_WORD_VALUE', data: query },
      { type: 'SEARCH_REQUESTING' },
      { type: 'SEARCH_SUCCESS', data: response, query },
      {
        payload: {
          args: [{ pathname: 'test1', state: { pageType: 'ProductDetail' } }],
          method: 'push'
        },
        type: '@@router/CALL_HISTORY_METHOD'
      }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store.dispatch(misSpellWord(query)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('failure', () => {
    nock(host)
      .get(`${SEARCH_URL}?searchText=${query}`)
      .replyWithError(errorMessage);
    const expectedActions = [
      { type: 'MISSPELL_WORD_VALUE', data: query },
      { type: 'SEARCH_REQUESTING' },
      { type: 'SEARCH_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store.dispatch(misSpellWord(query)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
