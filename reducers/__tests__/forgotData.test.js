/* @flow */
import forgotData from '../forgotData';

describe('forgotData reducer', () => {
  test('should return the initial state', () => {
    expect(forgotData(undefined, {})).toEqual({
      readyStatus: 'FORGOT_INVALID',
      err: null,
      viewInfo: {}
    });
  });

  test('should handle FORGOT_REQUESTING', () => {
    expect(
      forgotData(undefined, {
        type: 'FORGOT_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'FORGOT_REQUESTING',
      err: null,
      viewInfo: {}
    });
  });

  test('should handle FORGOT_FAILURE', () => {
    expect(
      forgotData(undefined, {
        type: 'FORGOT_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'FORGOT_FAILURE',
      err: 'Oops! Something went wrong.',
      viewInfo: {}
    });
  });

  test('should handle FORGOT_SUCCESS', () => {
    expect(
      forgotData(undefined, {
        type: 'FORGOT_SUCCESS',
        data: [{ id: '1', name: 'Welly' }]
      })
    ).toEqual({
      readyStatus: 'FORGOT_SUCCESS',
      err: null,
      viewInfo: [{ id: '1', name: 'Welly' }]
    });
  });
});
