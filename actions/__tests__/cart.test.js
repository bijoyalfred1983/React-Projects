/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchPageData } from '../cart';
import azURL from '../../config/serviceAPI';

jest.mock('../../config/serviceAPI');
const host = 'http://localhost';
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
const mockStore = configureMockStore([thunk]);

describe('cart action', () => {
  const response = {
    description:
      "Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road."
  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates CART_SUCCESS after successfully fetching cart data', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'CART_REQUESTING' },
      { type: 'CART_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPageData(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates CART_FAILURE when fail to fetch cart data', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'CART_REQUESTING' },
      { type: 'CART_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPageData(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
