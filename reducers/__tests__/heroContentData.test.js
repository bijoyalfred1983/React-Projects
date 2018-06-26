/* @flow */
import heroContentData from '../heroContentData';

describe('hero data', () => {
  test('should return the initial state', () => {
    expect(heroContentData(undefined, {})).toEqual({
      readyStatus: 'HERO_INVALID',
      err: null,
      viewInfo: []
    });
  });

  test('should handle HERO_REQUESTING', () => {
    expect(
      heroContentData(undefined, {
        type: 'HERO_REQUESTING',
        err: null,
        data: []
      })
    ).toEqual({
      readyStatus: 'HERO_REQUESTING',
      err: null,
      viewInfo: []
    });
  });

  test('should handle HERO_FAILURE', () => {
    expect(
      heroContentData(undefined, {
        type: 'HERO_FAILURE',
        err: 'Oops! Something went wrong.',
        data: []
      })
    ).toEqual({
      readyStatus: 'HERO_FAILURE',
      err: 'Oops! Something went wrong.',
      viewInfo: []
    });
  });

  test('should handle HERO_SUCCESS', () => {
    expect(
      heroContentData(undefined, {
        type: 'HERO_SUCCESS',
        err: null,
        data: [('LayoutCode': 'Full-Right-H1C3')]
      })
    ).toEqual({
      readyStatus: 'HERO_SUCCESS',
      err: null,
      viewInfo: [('LayoutCode': 'Full-Right-H1C3')]
    });
  });
});
