/* @flow */
import orderDetails from '../orderDetails';

describe('orderDetails reducer', () => {

  test('should return the initial state', () => {
    expect(orderDetails(undefined, {})).toEqual({
      readyStatus: 'ORDER_DETAILS_INVALID',
      err: null
    });
  });

  test('should handle ORDER_DETAILS_REQUESTING', () => {
    expect(
      orderDetails(undefined, {
        type: 'ORDER_DETAILS_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'ORDER_DETAILS_REQUESTING',
      err: null
    });
  });

  test('should handle ORDER_DETAILS_FAILURE', () => {
    expect(
      orderDetails(undefined, {
        type: 'ORDER_DETAILS_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'ORDER_DETAILS_FAILURE',
      err: 'Oops! Something went wrong.'
      });
  });

  test('should handle ORDER_DETAILS_SUCCESS', () => {
    expect(
      orderDetails(undefined, {
        type: 'ORDER_DETAILS_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'ORDER_DETAILS_SUCCESS',
      err: null,
      data: { id: '1', name: 'Welly'
     }
    });
  });



});