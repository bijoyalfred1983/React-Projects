/* @flow */
import resetData from '../resetData';

describe('resetData reducer', () => {
  test('should return the initial state', () => {
    expect(resetData(undefined, {})).toEqual({
      readyStatus: 'RESET_INVALID',
      err: null,
      viewInfo: {}
    });
  });

  test('should handle RESET_REQUESTING', () => {
    expect(
      resetData(undefined, {
        type: 'RESET_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'RESET_REQUESTING',
      err: null,
      viewInfo: {}
    });
  });

  test('should handle RESET_FAILURE', () => {
    expect(
      resetData(undefined, {
        type: 'RESET_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'RESET_FAILURE',
      err: 'Oops! Something went wrong.',
      viewInfo: {}
    });
  });

  test('should handle RESET_SUCCESS', () => {
    expect(
      resetData(undefined, {
        type: 'RESET_SUCCESS',
        data: [{ id: '1', name: 'Welly' }]
      })
    ).toEqual({
      readyStatus: 'RESET_SUCCESS',
      err: null,
      viewInfo: [{ id: '1', name: 'Welly' }]
    });
  });
});
