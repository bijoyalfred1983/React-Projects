/* @flow */
import type { CategoryData, SubCategoryData, Action } from '../types';

type Category = CategoryData;
type SubCategory = SubCategoryData;

const initialStateCat = {
  readyStatus: 'CATEGORY_INVALID',
  err: null,
  catData: {}
};

const initialStateSubCat = {
  readyStatus: 'SUB_CATEGORY_INVALID',
  err: null,
  subCatData: {}
};

const category = (
  state: Category = initialStateCat,
  action: Action
): Category => {
  switch (action.type) {
    case 'CATEGORY_REQUESTING':
      return {
        ...state,
        readyStatus: 'CATEGORY_REQUESTING'
      };
    case 'CATEGORY_FAILURE':
      return {
        ...state,
        readyStatus: 'CATEGORY_FAILURE',
        err: action.err
      };
    case 'CATEGORY_SUCCESS':
      return {
        ...state,
        readyStatus: 'CATEGORY_SUCCESS',
        catData: action.data
      };
    default:
      return state;
  }
};

const subCategory = (
  state: SubCategory = initialStateSubCat,
  action: Action
): SubCategory => {
  switch (action.type) {
    case 'SUB_CATEGORY_REQUESTING':
      return {
        ...state,
        readyStatus: 'SUB_CATEGORY_REQUESTING'
      };
    case 'SUB_CATEGORY_FAILURE':
      return {
        ...state,
        readyStatus: 'SUB_CATEGORY_FAILURE',
        err: action.err
      };
    case 'SUB_CATEGORY_SUCCESS':
      return {
        ...state,
        readyStatus: 'SUB_CATEGORY_SUCCESS',
        subCatData: action.data
      };
    default:
      return state;
  }
};

export { category, subCategory };
