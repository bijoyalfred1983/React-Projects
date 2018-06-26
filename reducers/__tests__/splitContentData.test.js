/* @flow */
import heroContentData from '../splitContentData';

describe('split data', () => {
  test('should return the initial state', () => {
    expect(heroContentData(undefined, {})).toEqual({
      readyStatus: 'SPLIT_INVALID',
      err: null,
      viewInfo: []
    });
  });

  test('should handle SPLIT_REQUESTING', () => {
    expect(
      heroContentData(undefined, {
        type: 'SPLIT_REQUESTING',
        err: null,
        data: []
      })
    ).toEqual({
      readyStatus: 'SPLIT_REQUESTING',
      err: null,
      viewInfo: []
    });
  });

  test('should handle SPLIT_FAILURE', () => {
    expect(
      heroContentData(undefined, {
        type: 'SPLIT_FAILURE',
        err: 'Oops! Something went wrong.',
        data: []
      })
    ).toEqual({
      readyStatus: 'SPLIT_FAILURE',
      err: 'Oops! Something went wrong.',
      viewInfo: []
    });
  });

  test('should handle SPLIT_SUCCESS', () => {
    expect(
      heroContentData(undefined, {
        type: 'SPLIT_SUCCESS',
        err: null,
        data: [('LayoutCode': '1R2C')]
      })
    ).toEqual({
      readyStatus: 'SPLIT_SUCCESS',
      err: null,
      viewInfo: [('LayoutCode': '1R2C')]
    });
  });
});
