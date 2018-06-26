import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchProductData, fetchCartIconData, emptyCartData } from '../productDetails';

import azURL from '../../config/serviceAPI';

jest.mock('../../config/serviceAPI');

const host = 'http://localhost';
const seoHost = '';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('Product detail action', () => {
  const response = { data: 'Product details page unit test case mock data' };
  const errorMessage = 'Request failed with status code 404';
  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates PRODUCT_SUCCESS when fetching product details page data has been done', () => {
    nock(host)
      .get('/')
      .query({
        seourl: ''
      })
      .reply(200, response);

    const expectedActions = [{ type: 'PRODUCT_SUCCESS', data: response }];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchProductData(axios, seoHost, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates PRODUCT_FAILURE when fail to fetch product details page data', () => {
    nock(host)
      .get('/')
      .query({
        seourl: ''
      })
      .replyWithError(errorMessage);

    const expectedActions = [{ type: 'PRODUCT_FAILURE', err: errorMessage }];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchProductData(axios, seoHost, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('checks whether empty cart data has been called', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = {type: 'EMPTY_DATA'};
    const initialState = {};
    const store = mockStore(initialState);

    expect(store.dispatch(emptyCartData())).toEqual(expectedActions);
  });

  test('Check Add to Cart', () => {
    const postData = {
      catalogRefId: '319465',
      productId: '175-0',
      quantity: 1,
      product: {
        id: '175-0',
        type: '00'
      },
      sku: {
        id: '319460'
      },
      otherOptions: {
        sendToStore: 'true',
        mobileApp: true,
        oemPartNumber: '',
        catalogVehicleId: '2720802',
        categoryId: '175-0',
        itemIdentifier: '319465_929780_18319_',
        storeNumber: '117'
      }
    };

    nock(host)
      .post(azURL('commerceItems'), postData)
      .reply(200, postResponse);

    const expectedActions = [
      { type: 'ADD_TO_CART_SUCCESS', data: postResponse }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store
      .dispatch(addToCartRequest(axios, postData, 'ProductImage', azURL('commerceItems')))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  // test('creates TOPCART_SUCCESS when fetching the topnav cart details been done', () => {
  //   nock(host)
  //     .get('/')
  //     .reply(200, response);

  //   const expectedActions = [{ type: 'TOPCART_SUCCESS', data: response }];
  //   const initialState = {};
  //   const store = mockStore(initialState);

  //   return store.dispatch(fetchCartIconData(axios, host)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });

  // test('creates TOPCART_FAILURE when fail to fetch topcart details', () => {
  //   nock(host)
  //     .get('/')
  //     .replyWithError(errorMessage);

  //   const expectedActions = [{ type: 'TOPCART_FAILURE', err: errorMessage }];
  //   const initialState = {};
  //   const store = mockStore(initialState);

  //   return store.dispatch(fetchCartIconData(axios, host)).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  // });
});
