/* @flow */
import createAccount from '../createAccountData';

describe('create account reducer', () => {
  test('should return the initial state', () => {
    expect(createAccount(undefined, {})).toEqual({
      readyStatus: 'CREATE_INVALID',
      err: null,
      viewInfo: {}
    });
  });

  test('should handle CREATE_REQUESTING', () => {
    expect(
      createAccount(undefined, {
        type: 'CREATE_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'CREATE_REQUESTING',
      err: null,
      viewInfo: {}
    });
  });

  test('should handle CREATE_FAILURE', () => {
    expect(
      createAccount(undefined, {
        type: 'CREATE_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'CREATE_FAILURE',
      err: 'Oops! Something went wrong.',
      viewInfo: {}
    });
  });

  test('should handle CREATE_SUCCESS', () => {
    expect(
      createAccount(undefined, {
        type: 'CREATE_SUCCESS',
        data: [{ id: '1', name: 'Welly' }]
      })
    ).toEqual({
      readyStatus: 'CREATE_SUCCESS',
      err: null,
      viewInfo: [{ id: '1', name: 'Welly' }]
    });
  });
});
