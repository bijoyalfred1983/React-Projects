// @flow
import _ from 'lodash/fp';
import type { ResetForgotForm, Action } from '../types';

type State = ResetForgotForm;

const initialState = {
  readyStatus: '',
  err: null,
  formValues: {
    password: ''
  }
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SUBMITRESET_REQUESTING':
      return _.assign(state, {
        readyStatus: 'SUBMITRESET_REQUESTING'
      });
    case 'SUBMITRESET_FAILURE':
      return _.assign(state, {
        readyStatus: 'SUBMITRESET_FAILURE',
        err: action.err
      });
    case 'SUBMITRESET_SUCCESS':
      return _.assign(state, {
        readyStatus: 'SUBMITRESET_SUCCESS',
        formValues: action.data
      });
    default:
      return state;
  }
};
