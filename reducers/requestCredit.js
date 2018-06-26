/* @flow */

import _ from 'lodash/fp';

import type { requestCreditForm, Action } from '../types';

type State = requestCreditForm;

const initialState = {
  readyStatus: '',
  defaultFormData: {
    transactionID: '',
    orderNumber: ''
  },
  SubmitStatus: false,
  successValues: {}
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'REQUEST_CREDIT_REQUESTING':
      return _.assign(state, {
        readyStatus: 'REQUEST_CREDIT_REQUESTING'
      });
    case 'REQUEST_CREDIT_FAILURE':
      return _.assign(state, {
        readyStatus: 'REQUEST_CREDIT_FAILURE',
        err: action.err
      });
    case 'REQUEST_CREDIT_SUCCESS':
      return _.assign(state, {
        readyStatus: 'REQUEST_CREDIT_SUCCESS',
        successValues: action.data,
        SubmitStatus: true
      });
    default:
      return state;
  }
};
