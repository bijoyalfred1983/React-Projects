import scroll from '../scroll';

describe('scroll reducer', () => {
  test('should return initial state', () => {
    expect(
      scroll(undefined, {
        type: ''
      })
    ).toEqual({
      scrollY: 0,
      scrollX: 0
    });
  });

  test('should handle SCROLL', () => {
    expect(
      scroll(undefined, {
        type: 'SCROLL',
        Y: 1,
        X: 2
      })
    ).toEqual({
      scrollY: 1,
      scrollX: 2
    });
  });
});
