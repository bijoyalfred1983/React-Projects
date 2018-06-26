/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchPartsData, addToCart, setView } from '../shelf';
import azURL from '../../config/serviceAPI';

jest.mock('../../config/serviceAPI');
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;
const mockStore = configureMockStore([thunk]);

describe('Data fetching of product parts ', () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  const dataResp = {
    azshelfPageRecordsVO: {
      recordsList: [{ skuNumber: 601767 }, { skuNumber: 832330 }]
    }
  };
  const newPath =
    '/batteries-starting-and-chargingbsc/batterybt&filters=4294964184';
  const arr = [601767, 832330];
  const priceResponse = {
    atgResponse: 'test'
  };

  test('get parts and price details', () => {
    nock(host)
      .get(`${azURL('getCatData')}?seourl=${newPath}`)
      .reply(200, dataResp);
    nock(host)
      .get(`/${arr}`)
      .reply(200, priceResponse);
    const expectedActions = [
      { type: 'PARTS_REQUESTING' },
      { type: 'PRICE_SUCCESS', data: priceResponse.atgResponse, skuIds: arr },
      { type: 'PARTS_SUCCESS', data: dataResp }
    ];
    const store = mockStore({ shelf: null });
    return store
      .dispatch(fetchPartsData(axios, newPath, host, host))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  describe('Add To Cart', () => {
    beforeEach(() => {
      nock.disableNetConnect();
    });

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

    const shelfData = {
      repositoryId: '319465',
      productRepositoryId: '175-0',
      vehiclSpecific: true,
      skuNumber: '319460',
      oemPartNumber: '',
      itemIdentifier: '319465_929780_18319_'
    };
    const priceDetails = {
      preferredStoreNumber: 117
    };

    const postResponse = {
      data: 'test data'
    };

    test('Send details to Add To cart method', () => {
      nock(host)
        .post(azURL('commerceItems'), postData)
        .reply(200, postResponse);

      const expectedActions = [
        { type: 'ADD_TO_CART_SUCCESS', data: postResponse }
      ];
      const initialState = {};
      const store = mockStore(initialState);

      return store
        .dispatch(addToCart(axios, priceDetails, shelfData, true, host))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});

describe('setView', () => {
  test('check the actions for setView', () => {
    const view = false;
    const expectedActions = [{ type: 'SET_VIEW', view }];
    const store = mockStore({ isList: null });
    store.dispatch(setView(view));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

xdescribe('fetchPartsData', () => {
  test('check the actions for fetchPartsData', () => {
    const view = false;
    const expectedActions = [{ type: 'SET_VIEW', view }];
    const store = mockStore({ isList: null });
    store.dispatch(fetchPartsData(view));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
