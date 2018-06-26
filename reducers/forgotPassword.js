// @flow
import _ from 'lodash/fp';

import type { SubmitForgotForm, Action } from '../types';

type State = SubmitForgotForm;

const initialState = {
  readyStatus: '',
  err: null,
  formValues: {
    email: ''
  }
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SUBMITFORGOT_REQUESTING':
      return _.assign(state, {
        readyStatus: 'SUBMITFORGOT_REQUESTING'
      });
    case 'SUBMITFORGOT_FAILURE':
      return _.assign(state, {
        readyStatus: 'SUBMITFORGOT_FAILURE',
        err: action.err
      });
    case 'SUBMITFORGOT_SUCCESS':
      return _.assign(state, {
        readyStatus: 'SUBMITFORGOT_SUCCESS',
        formValues: action.data
      });
    default:
      return state;
  }
};
