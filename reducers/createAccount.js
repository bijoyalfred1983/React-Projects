/* @flow */

import _ from 'lodash/fp';

import type { submitForm, Action } from '../types';

type State = submitForm;

const initialState = {
  readyStatus: '',
  err: '',
  defaultFormData: {
    login: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    postalCode: '',
    phoneNumber: '',
    subscribe: true,
    rewardId: ''
  },
  SubmitStatus: false
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SUBMIT_REQUESTING':
      return _.assign(state, {
        readyStatus: 'SUBMIT_REQUESTING'
      });
    case 'SUBMIT_FAILURE':
      return _.assign(state, {
        readyStatus: 'SUBMIT_FAILURE',
        err: action.err
      });
    case 'SUBMIT_SUCCESS':
      return _.assign(state, {
        readyStatus: 'SUBMIT_SUCCESS',
        successValues: action.data,
        SubmitStatus: true
      });
    default:
      return state;
  }
};
