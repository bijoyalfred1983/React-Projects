/* @flow */
import cartUpdate from '../cartUpdate';

describe('CartUpdate reducer', () => {
  test('should return the initial state for cartUpdate data', () => {
    expect(cartUpdate(undefined, {})).toEqual({
      readyStatus: 'ITEMQUANTITY_INVALID',
      err: null,
      orderSummaryData: {},
      checkoutData: {},
      quantityData: {},
      removeData: {},
      storeData: {}
    });
  });

  test('should handle ITEMQUANTITY_FAILURE', () => {
    expect(
      cartUpdate(undefined, {
        type: 'ITEMQUANTITY_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'ITEMQUANTITY_FAILURE',
      err: 'Oops! Something went wrong.',
      orderSummaryData: {},
      checkoutData: {},
      quantityData: {},
      removeData: {},
      storeData: {}
    });
  });

  test('should handle ITEMQUANTITY_SUCCESS', () => {
    expect(
      cartUpdate(undefined, {
        type: 'ITEMQUANTITY_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'ITEMQUANTITY_SUCCESS',
      err: null,
      quantityData: { id: '1', name: 'Welly' },
      removeData: {},
      storeData: {},
      orderSummaryData: {},
      checkoutData: {}
    });
  });

  test('should handle STORECHANGE_SUCCESS', () => {
    expect(
      cartUpdate(undefined, {
        type: 'STORECHANGE_SUCCESS',
        data: { id: '20' }
      })
    ).toEqual({
      readyStatus: 'STORECHANGE_SUCCESS',
      storeData: { id: '20' },
      quantityData: {},
      removeData: {},
      orderSummaryData: {},
      checkoutData: {},
      err: null
    });
  });

  test('should handle STORECHANGE_FAILURE', () => {
    expect(
      cartUpdate(undefined, {
        type: 'STORECHANGE_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'STORECHANGE_FAILURE',
      err: 'Oops! Something went wrong.',
      orderSummaryData: {},
      checkoutData: {},
      quantityData: {},
      removeData: {},
      storeData: {}
    });
  });

  test('should handle CHECKOUT_VERIFY_SUCCESS', () => {
    expect(
      cartUpdate(undefined, {
        type: 'CHECKOUT_VERIFY_SUCCESS',
        data: { id: '20' }
      })
    ).toEqual({
      err: null,
      readyStatus: 'CHECKOUT_VERIFY_SUCCESS',
      checkoutData: { id: '20' },
      orderSummaryData: {},
      quantityData: {},
      removeData: {},
      storeData: {}
    });
  });

  test('should handle CHECKOUT_VERIFY_FAILURE', () => {
    expect(
      cartUpdate(undefined, {
        type: 'CHECKOUT_VERIFY_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_VERIFY_FAILURE',
      err: 'Oops! Something went wrong.',
      orderSummaryData: {},
      checkoutData: {},
      quantityData: {},
      removeData: {},
      storeData: {}
    });
  });

});
