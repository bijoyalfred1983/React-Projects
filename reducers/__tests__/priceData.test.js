import price from '../price';

describe('price data page', () => {
  test('should return initial state', () => {
    expect(price(undefined, {})).toEqual({
      readyStatus: 'PRICE_INVALID',
      err: null,
      skuIds: [],
      price: []
    });
  });

  test('should handle PRICE_SUCCESS', () => {
    expect(
      price(undefined, {
        type: 'PRICE_SUCCESS',
        data: [{ price: '1', name: 'Welly' }],
        skuIds: [{id: '1'}]
      })
    ).toEqual({
      readyStatus: 'PRICE_SUCCESS',
      err: null,
      price: [{ price: '1', name: 'Welly' }],
      skuIds: [{id: '1'}] 
    });
  });
});
