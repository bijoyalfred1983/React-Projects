/* @flow */
import orderHistory from '../orderHistory';

describe('order History reducer', () => {

  test('should return the initial state', () => {
    expect(orderHistory(undefined, {})).toEqual({
      readyStatus: 'ORDER_HISTORY_INVALID',
      err: null,
      data: {},
      filter:{
        dateRange:'',
        purchaseType: ''
      }
    });
  });

  test('should handle ORDER_HISTORY_REQUESTING', () => {
    expect(
      orderHistory(undefined, {
        type: 'ORDER_HISTORY_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'ORDER_HISTORY_REQUESTING',
      err: null,
      data: {},
      filter:{
        dateRange:'',
        purchaseType: ''
      }
    });
  });

  test('should handle ORDER_HISTORY_FAILURE', () => {
    expect(
      orderHistory(undefined, {
        type: 'ORDER_HISTORY_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'ORDER_HISTORY_FAILURE',
      err: 'Oops! Something went wrong.',
      data: {},
      filter:{
        dateRange:'',
        purchaseType: ''
      }
    });
  });

  test('should handle ORDER_HISTORY_SUCCESS', () => {
    expect(
      orderHistory(undefined, {
        type: 'ORDER_HISTORY_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'ORDER_HISTORY_SUCCESS',
      err: null,
      data: { id: '1', name: 'Welly' },
      filter:{
        dateRange:'',
        purchaseType: ''
      }
    });
  });

  test('should handle ORDER_HISTORY_CHANGE_FILTER_DATE', () => {
    expect(
      orderHistory(undefined, {
        type: 'ORDER_HISTORY_CHANGE_FILTER_DATE',
        date: 'test'
      })
    ).toEqual({
      readyStatus: 'ORDER_HISTORY_CHANGE_FILTER_DATE',
      err: null,
      filter:{
        dateRange:'test',
        purchaseType: ''
      },
      data:{}
    });
  });
});