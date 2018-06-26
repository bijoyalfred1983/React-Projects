import productDetails from '../productDetails';

describe('product details page', () => {
  test('should return initial state', () => {
    expect(productDetails(undefined, {})).toEqual({
      readyStatus: 'PRODUCT_INVALID',
      err: null,
      viewInfo: {},
      cartSuccess: {},
      cartItemsPDP: [],
      cartSuccessNote: false
    });
  });

  test('should handle PRODUCT_REQUESTING', () => {
    expect(
      productDetails(undefined, {
        type: 'PRODUCT_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'PRODUCT_REQUESTING',
      err: null,
      viewInfo: {},
      cartSuccess: {},
      cartItemsPDP: [],
      cartSuccessNote: false
    });
  });

  test('should handle PRODUCT_FAILURE', () => {
    expect(
      productDetails(undefined, {
        type: 'PRODUCT_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'PRODUCT_FAILURE',
      err: 'Oops! Something went wrong.',
      viewInfo: {},
      cartSuccess: {},
      cartItemsPDP: [],
      cartSuccessNote: false
    });
  });

  test('should handle PRODUCT_SUCCESS', () => {
    expect(
      productDetails(undefined, {
        type: 'PRODUCT_SUCCESS',
        data: [{ id: '1', name: 'Welly' }]
      })
    ).toEqual({
      readyStatus: 'PRODUCT_SUCCESS',
      err: null,
      viewInfo: [{ id: '1', name: 'Welly' }],
      cartSuccess: {},
      cartItemsPDP: [],
      cartSuccessNote: false
    });
  });

  test('should handle PRODUCT_ADD_TO_CART_SUCCESS', () => {
    expect(
      productDetails(undefined, {
        type: 'ADD_TO_CART_SUCCESS',
        data: [{ id: '1', name: 'Welly' }],
        skuNumber: 20,
        image: {id: '1'}
      })
    ).toEqual({
      readyStatus: 'PRODUCT_INVALID',
      err: null,
      viewInfo: {},
      cartSuccess: [{ id: '1', name: 'Welly' }],
      cartItemsPDP: [20],
      cartSuccessNote: true,
      productImage: {"id": "1"}
    });
  });

  test('should handle ADD_TO_CART_FAILURE', () => {
    expect(
      productDetails(undefined, {
        type: 'ADD_TO_CART_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'ADD_TO_CART_FAILURE',
      err: 'Oops! Something went wrong.',
      viewInfo: {},
      cartSuccess: {},
      cartItemsPDP: [],
      cartSuccessNote: false
    });
  });

  test('should handle EMPTY_DATA', () => {
    expect(
      productDetails(undefined, {
        type: 'EMPTY_DATA',
        err: null
      })
    ).toEqual({
      readyStatus: 'PRODUCT_INVALID',
      err: null,
      cartSuccessNote: false,
      cartSuccess: {},
      cartItemsPDP: [],
      cartSuccessNote: false,
      viewInfo: {}
    });
  });
});
