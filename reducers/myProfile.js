/* @flow */

import type { MyProfileData, Action } from '../types';

const initialState = {
  readyStatus: 'MY_PROFILE_INVALID',
  updateStatus: 'MY_PROFILE_PATCH_INVALID',
  statesValueStatus: 'MY_PROFILE_STATES_INVALID',
  err: null,
  data: {},
  states: {}
};

const myProfile = (
  state: MyProfileData = initialState,
  action: Action
): MyProfileData => {
  switch (action.type) {
    case 'MY_PROFILE_REQUESTING':
      return {
        ...state,
        readyStatus: 'MY_PROFILE_REQUESTING'
      };
    case 'MY_PROFILE_FAILURE':
      return {
        ...state,
        readyStatus: 'MY_PROFILE_FAILURE',
        err: action.err
      };
    case 'MY_PROFILE_SUCCESS':
      return {
        ...state,
        readyStatus: 'MY_PROFILE_SUCCESS',
        data: action.data
      };
    case 'MY_PROFILE_PATCH_SUCCESS':
      return {
        ...state,
        updateStatus: 'MY_PROFILE_PATCH_SUCCESS',
        data: action.data,
        err: null
      };
    case 'MY_PROFILE_PATCH_REQUESTING':
      return {
        ...state,
        updateStatus: 'MY_PROFILE_PATCH_REQUESTING',
        err: null
      };
    case 'MY_PROFILE_PATCH_FAILURE':
      return {
        ...state,
        updateStatus: 'MY_PROFILE_PATCH_FAILURE',
        err: action.err
      };
    case 'MY_PROFILE_STATES_REQUESTING':
      return {
        ...state,
        statesValueStatus: 'MY_PROFILE_STATES_REQUESTING',
        err: null
      };
    case 'MY_PROFILE_STATES_SUCCESS':
      return {
        ...state,
        statesValueStatus: 'MY_PROFILE_STATES_SUCCESS',
        err: null,
        states: action.data
      };
    case 'MY_PROFILE_STATES_FAILURE':
      return {
        ...state,
        statesValueStatus: 'MY_PROFILE_STATES_FAILURE',
        err: action.err
      };
    default:
      return state;
  }
};

export default myProfile;
