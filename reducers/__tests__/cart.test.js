/* @flow */
import cart from '../cart';

describe('Cart reducer', () => {
  test('should return the initial state for cart data', () => {
    expect(cart(undefined, {})).toEqual({
      readyStatus: 'CART_INVALID',
      err: null,
      cartData: {}
    });
  });

  test('should handle CART_REQUESTING', () => {
    expect(
      cart(undefined, {
        type: 'CART_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'CART_REQUESTING',
      err: null,
      cartData: {}
    });
  });

  test('should handle CART_FAILURE', () => {
    expect(
      cart(undefined, {
        type: 'CART_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'CART_FAILURE',
      err: 'Oops! Something went wrong.',
      cartData: {}
    });
  });

  test('should handle CART_SUCCESS', () => {
    expect(
      cart(undefined, {
        type: 'CART_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'CART_SUCCESS',
      err: null,
      cartData: { id: '1', name: 'Welly' }
    });
  });

  test('should handle REMOVECART_SUCCESS', () => {
    expect(
      cart({cartData: { commerceItemsList: [{id: '20'}]}}, {
        type: 'REMOVECART_SUCCESS',
        data: { id: '20' }
      })
    ).toEqual({
      readyStatus: 'CART_SUCCESS',
      cartData: { commerceItemsList: [] },
      removeData: { id: '20' }
    });
  });

  test('should handle REMOVECART_FAILURE', () => {
    expect(
      cart(undefined, {
        type: 'REMOVECART_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'CART_SUCCESS',
      err: 'Oops! Something went wrong.',
      cartData: {}
    });
  });

});
