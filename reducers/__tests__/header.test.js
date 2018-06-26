/* @flow */
import header from '../header';

describe('Header reducer', () => {
  test('should return the initial state for header', () => {
    expect(header(undefined, {})).toEqual({
      readyStatus: 'HEADER_INVALID',
      miniCartReadyStatus: 'MINICART_INVALID',
      err: null,
      headerData: {
        miniCartMap: {}
      },
      miniCartSuccessNote: false,
      headerHeight: 0
    });
  });

  test('should handle HEADER_REQUESTING', () => {
    expect(
      header(undefined, {
        type: 'HEADER_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'HEADER_REQUESTING',
      miniCartReadyStatus: 'MINICART_INVALID',
      err: null,
      headerData: {
        miniCartMap: {}
      },
      miniCartSuccessNote: false,
      headerHeight: 0
    });
  });

  test('should handle HEADER_FAILURE', () => {
    expect(
      header(undefined, {
        type: 'HEADER_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'HEADER_FAILURE',
      miniCartReadyStatus: 'MINICART_INVALID',
      err: 'Oops! Something went wrong.',    
      headerData: {
        miniCartMap: {}
      },
      miniCartSuccessNote: false,
      headerHeight: 0
    });
  });

  test('should handle HEADER_SUCCESS', () => {
    expect(
      header(undefined, {
        type: 'HEADER_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'HEADER_SUCCESS',
      miniCartReadyStatus: 'MINICART_INVALID',
      err: null,
      headerData: { id: '1', name: 'Welly' },
      miniCartSuccessNote: false,
      headerHeight: 0
    });
  });

  test('should handle UPDATE_HEADER_HEIGHT', () => {
    expect(
      header(undefined, {
        type: 'UPDATE_HEADER_HEIGHT',
        height: 123
      })
    ).toEqual({
      readyStatus: 'HEADER_INVALID',
      miniCartReadyStatus: 'MINICART_INVALID',
      err: null,
      headerData: {
        miniCartMap: {}
      },
      miniCartSuccessNote: false,
      headerHeight: 123
    });
  });

  test('should handle MINICART_REQUESTING', () => {
    expect(
      header(undefined, {
        type: 'MINICART_REQUESTING',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'HEADER_INVALID',
      miniCartReadyStatus: 'MINICART_REQUESTING',
      err: null,
      headerData: {
        miniCartMap: {}
      },
      miniCartSuccessNote: false,
      headerHeight: 0
    });
  });

  test('should handle MINICART_FAILURE', () => {
    expect(
      header(undefined, {
        type: 'MINICART_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'HEADER_INVALID',
      miniCartReadyStatus: 'MINICART_FAILURE',
      err: 'Oops! Something went wrong.',
      headerData: {
        miniCartMap: {}
      },
      miniCartSuccessNote: false,
      headerHeight: 0
    });
  });

  test('should handle MINICART_SUCCESS', () => {
    expect(
      header(undefined, {
        type: 'MINICART_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'HEADER_INVALID',
      miniCartReadyStatus: 'MINICART_SUCCESS',
      err: null,
      headerData: {
        miniCartMap: { id: '1', name: 'Welly' }
      },
      miniCartSuccessNote: true,
      headerHeight: 0
    });
  });
});
