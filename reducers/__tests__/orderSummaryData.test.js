import orderSummary from '../orderSummary';

describe('order summary page', () => {
  test('should return initial state', () => {
    expect(orderSummary(undefined, {})).toEqual({
      readyStatus: 'ORDER_SUMMARY_INVALID',
      err: null,
      orderSummaryData: {},
      checkoutData: {},
      checkoutError: 'SAMPLE',
      promoMessage: false
    });
  });

  test('should handle ORDER_SUMMARY_REQUESTING', () => {
    expect(
      orderSummary(undefined, {
        type: 'ORDER_SUMMARY_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'ORDER_SUMMARY_REQUESTING',
      err: null,
      orderSummaryData: {},
      checkoutData: {},
      checkoutError: 'SAMPLE',
      promoMessage: false
    });
  });

  test('should handle ORDER_SUMMARY_FAILURE', () => {
    expect(
      orderSummary(undefined, {
        type: 'ORDER_SUMMARY_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'ORDER_SUMMARY_FAILURE',
      err: 'Oops! Something went wrong.',
      orderSummaryData: {},
      checkoutData: {},
      checkoutError: 'SAMPLE',
      promoMessage: false
    });
  });

  test('should handle ORDER_SUMMARY_SUCCESS', () => {
    expect(
      orderSummary(undefined, {
        type: 'ORDER_SUMMARY_SUCCESS',
        data: [{ id: '1', name: 'Welly' }]
      })
    ).toEqual({
      readyStatus: 'ORDER_SUMMARY_SUCCESS',
      err: null,
      orderSummaryData: [{ id: '1', name: 'Welly' }],
      checkoutData: {},
      checkoutError: 'SAMPLE',
      promoMessage: true
    });
  });

  test('should handle CHECKOUT_VERIFY_FAILURE', () => {
    expect(
      orderSummary(undefined, {
        type: 'CHECKOUT_VERIFY_FAILURE',
        err: 'Oops! Something went wrong.'

      })
    ).toEqual({
      readyStatus: 'ORDER_SUMMARY_SUCCESS',
      err: 'Oops! Something went wrong.',
      checkoutError: 'ERROR',
      orderSummaryData: {},
      checkoutData: {},
      promoMessage: false
    });
  });

  test('should handle CHECKOUT_VERIFY_SUCCESS', () => {
    expect(
      orderSummary(undefined, {
        type: 'CHECKOUT_VERIFY_SUCCESS',
        orderSummaryData: [{ id: '1', name: 'Welly' }],
        data: [{ id: '1', name: 'Welly' }],
      })
    ).toEqual({
      readyStatus: 'ORDER_SUMMARY_SUCCESS',
      orderSummaryData: {},
      checkoutError: 'SAMPLE',
      checkoutData: [{ id: '1', name: 'Welly' }],
      err: null,
      promoMessage: false
    });
  });

  test('should handle EMPTY_ERROR_DATA', () => {
    expect(
      orderSummary(undefined, {
        type: 'EMPTY_DATA',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'ORDER_SUMMARY_INVALID',
      checkoutError: 'SAMPLE',
      orderSummaryData: {},
      checkoutData: {},
      err: null,
      promoMessage: false
    });
  });

});
