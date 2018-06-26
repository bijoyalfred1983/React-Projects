/* @flow */
import type { AddEditMileageData, Action } from '../types';

const initialState = {
  postAddMileageStatus: false,
  readyStatus: 'ADDEDITMILEAGE_INVALID',
  err: null,
  data: {}
};

const addEditMileage = (
  state: AddEditMileageData = initialState,
  action: Action
): AddEditMileageData => {
  switch (action.type) {
    case 'ADDEDITMILEAGE_REQUESTING':
      return {
        ...state,
        readyStatus: 'ADDEDITMILEAGE_REQUESTING'
      };
    case 'ADDEDITMILEAGE_FAILURE':
      return {
        ...state,
        readyStatus: 'ADDEDITMILEAGE_FAILURE',
        err: action.err
      };
    case 'ADDEDITMILEAGE_SUCCESS':
      return {
        ...state,
        readyStatus: 'ADDEDITMILEAGE_SUCCESS',
        data: action.data
      };
    case 'ADD_MILEAGE_FAILURE':
      return {
        ...state,
        postAddMileageStatus: false,
        err: action.err
      };
    case 'ADD_MILEAGE_SUCCESS':
      return {
        ...state,
        postAddMileageStatus: true
      };

    default:
      return state;
  }
};

export default addEditMileage;
