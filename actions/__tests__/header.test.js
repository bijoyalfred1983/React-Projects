import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { headerData, updateHeaderHeight } from '../header';
import azURL from '../../config/serviceAPI';

jest.mock('../../config/serviceAPI');
const host = 'http://localhost';
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
const mockStore = configureMockStore([thunk]);

describe('Header action', () => {
  const response = {
    description:
      "Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road.Don't let today,s small noise become tomorrow's big headache. Fix that noisy brake, loud engine or cranky starter, and you could save yourself a bunch of money down the road. Whether you're dealing with a big problem or a small one, AutoZone's specific auto parts selection has what you need to get back on the road."
  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates HEADER_SUCCESS after successfully fetching Header data', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'HEADER_REQUESTING' },
      { type: 'HEADER_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(headerData(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates HEADER_FAILURE when failed to fetch Header data', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'HEADER_REQUESTING' },
      { type: 'HEADER_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(headerData(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('dispatches UPDATE_HEADER_HEIGHT when header height changes', () => {
    const height = 123;
    const expectedActions = [{ type: 'UPDATE_HEADER_HEIGHT', height }];
    const initialState = { appData: { headerHeight: 0 } };
    const store = mockStore(initialState);

    store.dispatch(updateHeaderHeight(height));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
