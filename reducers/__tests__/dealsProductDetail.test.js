import dealsProductDetail from '../dealsProductDetails';

describe('dealsProductDetail reducer', () => {
  test('should handle DEAL_PRODUCT_SUCCESS', () => {
    expect(
      dealsProductDetail(undefined, {
        type: 'DEAL_PRODUCT_SUCCESS',
        data: { id: '1', name: 'Welly' }
      })
    ).toEqual({
      readyStatus: 'DEAL_PRODUCT_SUCCESS',
      err: null,
      viewInfo: { id: '1', name: 'Welly'
      }
    });
  });

  test('should handle DEAL_PRODUCT_FAILURE', () => {
    expect(
      dealsProductDetail(undefined, {
        type: 'DEAL_PRODUCT_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'DEAL_PRODUCT_FAILURE',
      err: 'Oops! Something went wrong.',
      viewInfo: { 
    }
      });
  });

  test('should handle DEAL_PRODUCT_REQUESTING', () => {
    expect(
      dealsProductDetail(undefined, {
        type: 'DEAL_PRODUCT_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'DEAL_PRODUCT_REQUESTING',
      err: null,
      viewInfo: { 
      }
    });
  });

  test('should return the initial state', () => {
    expect(dealsProductDetail(undefined, {})).toEqual({
      readyStatus: 'DEAL_PRODUCT_INVALID',
      err: null,
      viewInfo: {}
    });
  });
});