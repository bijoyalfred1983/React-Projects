/* @flow */
import store from '../store';

describe('Store reducer', () => {
  test('Should return the initial state for store data', () => {
    expect(store(undefined, {})).toEqual({
        readyStatus: 'STORE_SEARCH_INVALID',
        err: null,
        storeData: {},
        currentStore: '9801'
    });
  });

  test('Should handle STORE_SEARCH_REQUESTING', () => {
    expect(
      store(undefined, {
        type: 'STORE_SEARCH_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'STORE_SEARCH_REQUESTING',
      err: null,
      storeData: {},
      currentStore: '9801'
    });
  });

  test('Should handle STORE_SEARCH_FAILURE', () => {
    expect(
      store(undefined, {
        type: 'STORE_SEARCH_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'STORE_SEARCH_FAILURE',
      err: 'Oops! Something went wrong.',
      storeData: {},
      currentStore: '9801'
    });
  });

  test('should handle STORE_SEARCH_SUCCESS', () => {
    expect(
      store(undefined, {
        type: 'STORE_SEARCH_SUCCESS',
        data: [{ id: '1', name: 'Welly' }]
      })
    ).toEqual({
      readyStatus: 'STORE_SEARCH_SUCCESS',
      err: null,
      storeData: [{ id: '1', name: 'Welly' }],
      currentStore: '9801'
    });
  });

  test('Should handle SET_STORE_SUCCESS', () => {
    expect(
      store(undefined, {
        type: 'SET_STORE_SUCCESS',
        storeNumber: '1234'
      })
    ).toEqual({
      setStoreStatus: 'SET_STORE_SUCCESS',
      err: null,
      storeData: {},
      currentStore: '1234'
    });
  });

  test('Should handle SET_STORE_FAILURE', () => {
    expect(
      store(undefined, {
        type: 'SET_STORE_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      setStoreStatus: 'SET_STORE_FAILURE',
      err: 'Oops! Something went wrong.',
      storeData: {},
      currentStore: '9801'
    });
  });

  test('Should handle STORE_CLEAR_SEARCH_DATA', () => {
    expect(
      store(undefined, {
        type: 'STORE_CLEAR_SEARCH_DATA'
      })
    ).toEqual({
      readyStatus: 'STORE_SEARCH_INVALID',
      err: null,
      storeData: {},
      currentStore: '9801'
    });
  });
});
