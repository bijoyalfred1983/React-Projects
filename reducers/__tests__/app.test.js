import appData from '../app';

describe('appData reducer', () => {
  test('should return initial state', () => {
    expect(
      appData(undefined, {
        type: ''
      })
    ).toEqual({
      isHeaderPresent: true,
      userAuthenticated: false
    });
  });

  test('should handle HEADER_STATE_FAILURE', () => {
    expect(
      appData(undefined, {
        type: 'HEADER_STATE_FAILURE'
      })
    ).toEqual({
      isHeaderPresent: true,
      userAuthenticated: false
    });
  });

  test('should handle HEADER_STATE_SUCCESS', () => {
    expect(
      appData(undefined, {
        type: 'HEADER_STATE_SUCCESS',
        status: true
      })
    ).toEqual({
      isHeaderPresent: true,
      userAuthenticated: false
    });
  });

  test('should handle STATICLABEL_FAILURE', () => {
    expect(
      appData(undefined, {
        type: 'STATICLABEL_FAILURE',
        err: 123
      })
    ).toEqual({
      readyStatus: "STATICLABEL_FAILURE",
      isHeaderPresent: true,
      userAuthenticated: false,
      err: 123
    });
  });

  test('should handle STATICLABEL_SUCCESS', () => {
    expect(
      appData(undefined, {
        type: 'STATICLABEL_SUCCESS',
        data: 123
      })
    ).toEqual({
      readyStatus: "STATICLABEL_SUCCESS",
      isHeaderPresent: true,
      staticLabelData: 123,
      userAuthenticated: false
    });
  });
});
