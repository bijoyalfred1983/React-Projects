/* @flow */
import type { DealsMakerData, Action } from '../types';

const initialState = {
  readyStatus: 'DEALS_MAKER_INVALID',
  err: '',
  dealsMakerData: false,
  dealsNextStepData: {}
};

const dealsMaker = (
  state: DealsMakerData = initialState,
  action: Action
): DealsMakerData => {
  switch (action.type) {
    case 'DEALS_MAKER_REQUESTING':
      return {
        ...state,
        readyStatus: 'DEALS_MAKER_REQUESTING'
      };
    case 'DEALS_MAKER_FAILURE':
      return {
        ...state,
        readyStatus: 'DEALS_MAKER_FAILURE',
        err: action.err
      };
    case 'DEALS_MAKER_SUCCESS': {
      return {
        ...state,
        readyStatus: 'DEALS_MAKER_SUCCESS',
        dealsMakerData: action.data,
        dealsNextStepData: {
          skuAlreadAddedInfo: action.data.skuAlreadyAddedInfo
        }
      };
    }
    case 'DEALS_MAKER_NEXT_STEP_SUCCESS': {
      return {
        ...state,
        dealsNextStepData: action.data
      };
    }
    case 'DEALS_MAKER_QUANTITY_UPDATE': {
      const dealsMakerObj = state.dealsMakerData;
      dealsMakerObj.constraintList[action.constraintIndex].itemList[
        action.itemIndex
      ].quantity =
        action.quantity;
      return {
        ...state,
        dealsMakerData: dealsMakerObj
      };
    }
    default:
      return state;
  }
};

export default dealsMaker;
