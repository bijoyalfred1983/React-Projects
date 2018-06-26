/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchPreferredStore } from '../preferredStore';

jest.mock('../../config/serviceAPI');

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('preferred store action', () => {
  const response = {
    storeDetails: {
      zip: '900011148',
      storeNumber: '3717',
      '@class': 'com.autozone.diy.vo.AZStoreDetailsVO',
      address2: 'NULL',
      city: 'Los Angeles',
      address1: '5858 S Central Ave',
      latitude: 33.98811,
      bopusTransactionId: null,
      active: true,
      open24Hours: false,
      storeFullHours: {
        WEDNESDAY: {
          close: '10:00 PM',
          open: '08:00 AM'
        },
        MONDAY: {
          close: '10:00 PM',
          open: '08:00 AM'
        },
        THURSDAY: {
          close: '10:00 PM',
          open: '08:00 AM'
        },
        SUNDAY: {
          close: '09:00 PM',
          open: '08:00 AM'
        },
        TUESDAY: {
          close: '10:00 PM',
          open: '08:00 AM'
        },
        FRIDAY: {
          close: '10:00 PM',
          open: '08:00 AM'
        },
        SATURDAY: {
          close: '10:00 PM',
          open: '08:00 AM'
        }
      },
      nextTransitionDateTime: '04/20/2018 08:00 AM',
      phoneNumber: '3232344788',
      currentDay: 'FRIDAY',
      currentTimeZoneDateTime: '04/20/2018 04:58 AM',
      openedNow: false,
      state: 'CA',
      storeOrderNumber: null,
      storeOrderedDate: null,
      longitude: -118.25605
    }
  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates FETCH_PREFERRED_STORE_SUCCESS when fetching parts data has been done', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'FETCH_PREFERRED_STORE_REQUESTING' },
      { type: 'FETCH_PREFERRED_STORE_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPreferredStore(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates FETCH_PREFERRED_STORE_FAILURE when fetching parts data has been done', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'FETCH_PREFERRED_STORE_REQUESTING' },
      { type: 'FETCH_PREFERRED_STORE_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPreferredStore(host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
