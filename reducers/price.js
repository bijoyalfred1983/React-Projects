/* @flow */

import type { ShelfData, Action } from '../types';

type State = ShelfData;

const initialState = {
  readyStatus: 'PRICE_INVALID',
  price: [],
  skuIds: [],
  err: null
};

// const getRelatedParts = () => ({
//   // Need to implement RelatedParts logic
// });

// const getRelatedProducts = () => ({
//   // Need to implement RelatedProducts logic
// });

// case 'PARTS_SUCCESS':
//       return Object.assign({}, state, {
//         parts: action.data,
//         readyStatus: 'PARTS_SUCCESS',
//         relatedParts: getRelatedParts(),
//         relatedProducts: getRelatedProducts()
//       });

const price = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'PRICE_SUCCESS': {
      return {
        ...state,
        price: action.data,
        readyStatus: 'PRICE_SUCCESS',
        skuIds: action.skuIds
      };
    }
    default:
      return state;
  }
};

export default price;
