/* @flow */
import orderConfirmation from '../orderConfirmation';

describe('order Confirmation reducer', () => {

  test('should return the initial state', () => {
    expect(orderConfirmation(undefined, {})).toEqual({
      readyStatus: 'ORDER_CONFIRMATION_INVALID',
      err: null,
      data: { 
        showBOPUSModal:false,
        disableBOPUSModal:false
       }
    });
  });

  test('should handle ORDER_CONFIRMATION_REQUESTING', () => {
    expect(
      orderConfirmation(undefined, {
        type: 'ORDER_CONFIRMATION_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'ORDER_CONFIRMATION_REQUESTING',
      err: null,
      data: { 
        showBOPUSModal:false,
        disableBOPUSModal:false
       }
    });
  });

  test('should handle ORDER_CONFIRMATION_FAILURE', () => {
    expect(
      orderConfirmation(undefined, {
        type: 'ORDER_CONFIRMATION_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'ORDER_CONFIRMATION_FAILURE',
      err: 'Oops! Something went wrong.',
      data: { 
      showBOPUSModal:false,
      disableBOPUSModal:false
     }
      });
  });

  test('should handle ORDER_CONFIRMATION_SUCCESS', () => {
    expect(
      orderConfirmation(undefined, {
        type: 'ORDER_CONFIRMATION_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'ORDER_CONFIRMATION_SUCCESS',
      err: null,
      data: { id: '1', name: 'Welly',
      showBOPUSModal:false,
      disableBOPUSModal:false
     }
    });
  });

  test('should handle ORDER_CONFIRMATION_CHANGE_FILTER_DATE', () => {
    expect(
      orderConfirmation(undefined, {
        type: 'ORDER_CONFIRMATION_CHANGE_FILTER_DATE',
        date: 'test'
      })
    ).toEqual({
      readyStatus: 'ORDER_CONFIRMATION_INVALID',
      err: null,
      data:{
        showBOPUSModal:false,
        disableBOPUSModal:false
      }
    });
  });
  test('should handle ORDER_CONFIRMATION_DISABLE_BOPUS_MODAL', () => {
    expect(
      orderConfirmation(undefined, {
        type: 'ORDER_CONFIRMATION_DISABLE_BOPUS_MODAL',
        date: 'test'
      })
    ).toEqual({
      readyStatus: 'ORDER_CONFIRMATION_INVALID',
      err: null,
      data:{
        showBOPUSModal:false,
        disableBOPUSModal:true
      }
    });
  });
  test('should handle ORDER_CONFIRMATION_SHOW_BOPUS_MODAL', () => {
    expect(
      orderConfirmation(undefined, {
        type: 'ORDER_CONFIRMATION_SHOW_BOPUS_MODAL',
        date: 'test'
      })
    ).toEqual({
      readyStatus: 'ORDER_CONFIRMATION_INVALID',
      err: null,
      data:{
        showBOPUSModal:true,
        disableBOPUSModal:false
      }
    });
  });
  test('should handle ORDER_CONFIRMATION_CLOSE_BOPUS_MODAL', () => {
    expect(
      orderConfirmation(undefined, {
        type: 'ORDER_CONFIRMATION_CLOSE_BOPUS_MODAL',
        date: 'test'
      })
    ).toEqual({
      readyStatus: 'ORDER_CONFIRMATION_INVALID',
      err: null,
      data:{
        disableBOPUSModal:false,
        showBOPUSModal:false
      }
    });
  });
});