/* @flow */
import recalls from '../recalls';

describe('recall reducer', () => {

  test('should return the initial state', () => {
    expect(recalls(undefined, {})).toEqual({
      readyStatus: 'RECALLS_INVALID',
      err: null
    });
  });

  test('should handle RECALLS_REQUESTING', () => {
    expect(
      recalls(undefined, {
        type: 'RECALLS_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'RECALLS_REQUESTING',
      err: null
    });
  });

  test('should handle RECALLS_FAILURE', () => {
    expect(
      recalls(undefined, {
        type: 'RECALLS_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'RECALLS_FAILURE',
      err: 'Oops! Something went wrong.'

    });
  });

  test('should handle RECALLS_SUCCESS', () => {
    expect(
      recalls(undefined, {
        type: 'RECALLS_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'RECALLS_SUCCESS',
      err: null,
      data: { id: '1', name: 'Welly' }
    });
  });

  test('should handle RECALLS_DETAILS_FAILURE', () => {
    expect(
      recalls(undefined, {
        type: 'RECALLS_DETAILS_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'RECALLS_DETAILS_FAILURE',
      err: 'Oops! Something went wrong.'

    });
  });

  test('should handle RECALLS_DETAILS_SUCCESS', () => {
    expect(
      recalls(undefined, {
        type: 'RECALLS_DETAILS_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'RECALLS_DETAILS_SUCCESS',
      err: null,
      data: { id: '1', name: 'Welly' }
    });
  });
  
});