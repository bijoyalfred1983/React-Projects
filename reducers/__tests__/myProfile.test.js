/* @flow */
import myProfile from '../myProfile';

describe('myProfile reducer', () => {

  test('should return the initial state', () => {
    expect(myProfile(undefined, {})).toEqual({
      readyStatus: 'MY_PROFILE_INVALID',
      err: null,
      data: {}
    });
  });

  test('should handle MY_PROFILE_REQUESTING', () => {
    expect(
      myProfile(undefined, {
        type: 'MY_PROFILE_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'MY_PROFILE_REQUESTING',
      err: null,
      data: { 
       }
    });
  });

  test('should handle MY_PROFILE_FAILURE', () => {
    expect(
      myProfile(undefined, {
        type: 'MY_PROFILE_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'MY_PROFILE_FAILURE',
      err: 'Oops! Something went wrong.',
      data: { 
     }
      });
  });

  test('should handle MY_PROFILE_SUCCESS', () => {
    expect(
      myProfile(undefined, {
        type: 'MY_PROFILE_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'MY_PROFILE_SUCCESS',
      err: null,
      data: { id: '1', name: 'Welly'
     }
    });
  });

});