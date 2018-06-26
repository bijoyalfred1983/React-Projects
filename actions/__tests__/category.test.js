/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchPageData, fetchPageSubData } from '../category';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('category action', () => {
  const response = {
    description:
      "Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road."
  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates CATEGORY_SUCCESS when fetching parts data has been done', () => {
    nock(host)
      .get('/?seourl=')
      .reply(200, response);

    const expectedActions = [
      { type: 'CATEGORY_REQUESTING' },
      { type: 'CATEGORY_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPageData(axios, '', host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates CATEGORY_FAILURE when fail to fetch parts data', () => {
    nock(host)
      .get('/?seourl=')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'CATEGORY_REQUESTING' },
      { type: 'CATEGORY_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPageData(axios, '', host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates SUB_CATEGORY_SUCCESS when fetching parts data has been done', () => {
    nock(host)
      .get('/?seourl=')
      .reply(200, response);

    const expectedActions = [
      { type: 'SUB_CATEGORY_REQUESTING' },
      { type: 'SUB_CATEGORY_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPageSubData(axios, '', host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates SUB_CATEGORY_FAILURE when fail to fetch parts data', () => {
    nock(host)
      .get('/?seourl=')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'SUB_CATEGORY_REQUESTING' },
      { type: 'SUB_CATEGORY_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPageSubData(axios, '', host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
