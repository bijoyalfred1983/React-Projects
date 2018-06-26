import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchQuantityUpdate, updateQuantity, removeCart, storeChange, removeCall, storePickup } from '../itemQuantity';
import azURL from '../../config/serviceAPI';

jest.mock('../../config/serviceAPI')

jest.mock(
  '../orderSummary',
  () =>
  ({
    fetchOrderSummaryData: () => {
      return {type: 'Test Action'}
    }
  })
);

jest.mock(
  '../miniCart',
  () =>()=>({type: 'Test Action1'})
);

const host = 'http://localhost';
axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('Item Quantity action', () => {
  const response = { data: 'Product details page unit test case mock data' };
  const errorMessage = 'Request failed with status code 404';
  const values = { quantity: 1 };
  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates ITEMQUANTITY_SUCCESS when fetching order summary details page data has been done', () => {
    nock(host)
      .patch('/34455', values)
      .reply(200, response);

    const expectedActions = [
      { type: 'ITEMQUANTITY_REQUESTING' },
      { type: 'ITEMQUANTITY_SUCCESS', values: values.quantity, data: response },
      { type: 'Test Action' }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(updateQuantity(axios, values, 34455, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates ITEMQUANTITY_FAILURE when fetching order summary details', () => {
    nock(host)
      .patch('/34455', values)
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'ITEMQUANTITY_REQUESTING' },
      { type: 'ITEMQUANTITY_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(updateQuantity(axios, values, 34455, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  test('creates STORECHANGE_SUCCESS when fetching order summary details page data has been done', () => {
    nock(host)
      .patch('/34455', values)
      .reply(200, response);

    const expectedActions = [
      { type: 'STORECHANGE_REQUESTING' },
      { type: 'STORECHANGE_SUCCESS', id: 34455, data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(storeChange(axios, values, 34455, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates STORECHANGE_FAILURE when fetching order summary details', () => {
    nock(host)
      .patch('/34455', values)
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'STORECHANGE_REQUESTING' },
      { type: 'STORECHANGE_FAILURE', id: 34455, err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(storeChange(axios, values, 34455, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  test('creates REMOVECART_SUCCESS when fetching order summary details page data has been done', () => {
    nock(host)
      .delete('/34455')
      .reply(200, response);

    const expectedActions = [
      { type: 'REMOVECART_REQUESTING' },
      { type: 'REMOVECART_SUCCESS', id: 34455, data: response },
      { type: 'Test Action' },
      { type: 'Test Action1' }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(removeCart(axios, 34455, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates REMOVECART_FAILURE when fetching order summary details', () => {
    nock(host)
      .delete('/34455')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'REMOVECART_REQUESTING' },
      { type: 'REMOVECART_FAILURE', id: 34455, err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(removeCart(axios, 34455, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

});
