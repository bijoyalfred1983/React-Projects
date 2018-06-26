/* @flow */
import { category, subCategory } from '../category';

describe('category reducer', () => {
  test('should return the initial state for category data', () => {
    expect(category(undefined, {})).toEqual({
      readyStatus: 'CATEGORY_INVALID',
      err: null,
      catData: {}
    });
  });

  test('should handle CATEGORY_REQUESTING', () => {
    expect(
      category(undefined, {
        type: 'CATEGORY_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'CATEGORY_REQUESTING',
      err: null,
      catData: {}
    });
  });

  test('should handle CATEGORY_FAILURE', () => {
    expect(
      category(undefined, {
        type: 'CATEGORY_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'CATEGORY_FAILURE',
      err: 'Oops! Something went wrong.',
      catData: {}
    });
  });

  test('should handle CATEGORY_SUCCESS', () => {
    expect(
      category(undefined, {
        type: 'CATEGORY_SUCCESS',
        data: [{ id: '1', name: 'Welly' }]
      })
    ).toEqual({
      readyStatus: 'CATEGORY_SUCCESS',
      err: null,
      catData: [{ id: '1', name: 'Welly' }]
    });
  });

  test('should return the initial state for subcategory data', () => {
    expect(subCategory(undefined, {})).toEqual({
      readyStatus: 'SUB_CATEGORY_INVALID',
      err: null,
      subCatData: {}
    });
  });

  test('should handle SUB_CATEGORY_REQUESTING', () => {
    expect(
      subCategory(undefined, {
        type: 'SUB_CATEGORY_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'SUB_CATEGORY_REQUESTING',
      err: null,
      subCatData: {}
    });
  });

  test('should handle SUB_CATEGORY_FAILURE', () => {
    expect(
      subCategory(undefined, {
        type: 'SUB_CATEGORY_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'SUB_CATEGORY_FAILURE',
      err: 'Oops! Something went wrong.',
      subCatData: {}
    });
  });

  test('should handle SUB_CATEGORY_SUCCESS', () => {
    expect(
      subCategory(undefined, {
        type: 'SUB_CATEGORY_SUCCESS',
        data: [{ id: '1', name: 'Welly' }]
      })
    ).toEqual({
      readyStatus: 'SUB_CATEGORY_SUCCESS',
      err: null,
      subCatData: [{ id: '1', name: 'Welly' }]
    });
  });
});
