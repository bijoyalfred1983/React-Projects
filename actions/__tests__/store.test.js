/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchData, setStore, clearSearchResult } from '../store';
import { yextAPIKey } from '../../config/serviceAPI';

jest.mock('../../config/serviceAPI');

const host = 'http://localhost';
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
const mockStore = configureMockStore([thunk]);

describe('Store actions', () => {
  const response = {
    description:
      "Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road."
  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('Creates STORE_SEARCH_SUCCESS after successfully fetching search results', () => {
    const location = 'utah';
    const apiKey = '';
    nock(host)
      .get(`/?location=${location}&api_key=${yextAPIKey}&v=20180227&radius=150`)
      .reply(200, response);

    const expectedActions = [
      { type: 'STORE_SEARCH_REQUESTING' },
      { type: 'STORE_SEARCH_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(location,host,yextAPIKey)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Creates STORE_SEARCH_FAILURE when failed to fetch search results', () => {
    const location = 'utah';
    const apiKey = '';
    nock(host)
      .get(`/?location=${location}&api_key=${yextAPIKey}&v=20180227&radius=150`)      
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'STORE_SEARCH_REQUESTING' },
      { type: 'STORE_SEARCH_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchData(location,host,yextAPIKey)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Creates SET_STORE_SUCCESS after successfully setting store number ', () => {
    nock(host)
      .post('/', {storeNumber:'1234'})
      .reply(200, response);

    const expectedActions = [
      { type: 'SET_STORE_REQUESTING' },
      { type: 'SET_STORE_SUCCESS', storeNumber:'1234'},
      { type: "HEADER_REQUESTING"}
    ];
    const initialState = {};
    const store = mockStore(initialState);
    return store.dispatch(setStore('1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);    
    });
  });

  test('Creates SET_STORE_FAILURE after failing to set the store number', () => {
    nock(host)
      .post('/', {storeNumber: "1234"})
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'SET_STORE_REQUESTING' },
      { type: 'SET_STORE_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(setStore('1234')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Creates STORE_CLEAR_SEARCH_DATA when clearSearchResult method is called.', () => {
    const expectedActions = [
      { type: 'STORE_CLEAR_SEARCH_DATA' }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(clearSearchResult());
    return expect(store.getActions()).toEqual(expectedActions);
  });
});
  
