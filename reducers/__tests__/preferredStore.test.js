/* @flow */
import preferredStore from '../preferredStore';

describe('preferred store reducer', () => {
  test('should return the initial state for preferred store data', () => {
    expect(preferredStore(undefined, {})).toEqual({
      readyStatus: 'FETCH_PREFERRED_STORE_INVALID',
      err: '',
      storeDetails: {},
      currentDayTime: {}   
    });
  });

  test('should handle FETCH_PREFERRED_STORE_REQUESTING', () => {
    expect(
      preferredStore(undefined, {
        type: 'FETCH_PREFERRED_STORE_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'FETCH_PREFERRED_STORE_REQUESTING',
      err: '',
      storeDetails: {},
      currentDayTime: {}
    });
  });

  test('should handle FETCH_PREFERRED_STORE_SUCCESS with storeFullHours object', () => {
    expect(
      preferredStore(undefined, {
        type: 'FETCH_PREFERRED_STORE_SUCCESS',
        data: { storeDetails: { id: '1', name: 'Welly', storeFullHours: { MONDAY: '24hr' }, currentDay: 'MONDAY' } }
      })
    ).toEqual({
      readyStatus: 'FETCH_PREFERRED_STORE_SUCCESS',
      err: '',
      storeDetails: { id: '1', name: 'Welly', storeFullHours: { MONDAY: '24hr' }, currentDay: 'MONDAY' },
      currentDayTime: '24hr'
    });
  });

  test('should handle FETCH_PREFERRED_STORE_SUCCESS without storeFullHours object', () => {
    expect(
      preferredStore(undefined, {
        type: 'FETCH_PREFERRED_STORE_SUCCESS',
        data: { storeDetails: { id: '1', name: 'Welly' } }
      })
    ).toEqual({
      readyStatus: 'FETCH_PREFERRED_STORE_SUCCESS',
      err: '',
      storeDetails: { id: '1', name: 'Welly' },
      currentDayTime: {}
    });
  });

  test('should handle FETCH_PREFERRED_STORE_FAILURE', () => {
    expect(
      preferredStore(undefined, {
        type: 'FETCH_PREFERRED_STORE_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'FETCH_PREFERRED_STORE_FAILURE',
      err: 'Oops! Something went wrong.',
      storeDetails: {},
      currentDayTime: {}
    });
  });
});
