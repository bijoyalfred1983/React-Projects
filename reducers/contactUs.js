/* @flow */

import _ from 'lodash/fp';

import type { contactUsForm, Action } from '../types';

type State = contactUsForm;

const initialState = {
  yearData: [],
  makeData: [],
  modelData: [],
  engineData: [],
  readyStatus: '',
  dropDownDisableState: { make: true, model: true, engine: true },
  err: '',
  year: '',
  make: '',
  model: '',
  engine: '',
  defaultFormData: {
    firstName: '',
    lastName: '',
    email: ''
  },
  SubmitStatus: false,
  profileDetails: {}
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'CONTACTUS_REQUESTING':
      return _.assign(state, {
        readyStatus: 'CONTACTUS_REQUESTING'
      });
    case 'CONTACTUS_FAILURE':
      return _.assign(state, {
        readyStatus: 'CONTACTUS_FAILURE',
        err: action.err
      });
    case 'STORE_YMME_DATA':
      return _.assign(state, {
        readyStatus: 'STORE_YMME_DATA',
        year: action.year,
        make: action.make,
        makeId: action.makeId,
        model: action.model,
        engine: action.engine
      });
    case 'CONTACTUS_SUCCESS':
      return _.assign(state, {
        readyStatus: 'CONTACTUS_SUCCESS',
        successValues: action.data,
        SubmitStatus: true
      });
    case 'FORM_YEAR_SUCCESS':
      return _.assign(state, {
        readyStatus: 'FORM_YEAR_SUCCESS',
        yearData: action.data,
        dropDownDisableState: action.dropDownDisableState
      });
    case 'FORM_MAKE_SUCCESS':
      return _.assign(state, {
        readyStatus: 'FORM_MAKE_SUCCESS',
        makeData: action.data,
        dropDownDisableState: action.dropDownDisableState
      });
    case 'FORM_MODEL_SUCCESS':
      return _.assign(state, {
        readyStatus: 'FORM_MODEL_SUCCESS',
        modelData: action.data,
        dropDownDisableState: action.dropDownDisableState
      });
    case 'FORM_ENGINE_SUCCESS':
      return _.assign(state, {
        readyStatus: 'FORM_ENGINE_SUCCESS',
        engineData: action.data,
        dropDownDisableState: action.dropDownDisableState
      });
    case 'PROFILE_DETAILS_REQUESTING':
      return _.assign(state, {
        readyStatus: 'PROFILE_DETAILS_REQUESTING'
      });
    case 'PROFILE_DETAILS_FAILURE':
      return _.assign(state, {
        readyStatus: 'PROFILE_DETAILS_FAILURE',
        err: action.err
      });
    case 'PROFILE_DETAILS_SUCCESS':
      return _.assign(state, {
        readyStatus: 'PROFILE_DETAILS_SUCCESS',
        profileDetails: action.data
      });
    case 'STATE_LIST_DETAILS_REQUESTING':
      return _.assign(state, {
        readyStatus: 'STATE_LIST_DETAILS_REQUESTING'
      });
    case 'STATE_LIST_DETAILS_FAILURE':
      return _.assign(state, {
        readyStatus: 'STATE_LIST_DETAILS_FAILURE',
        err: action.err
      });
    case 'STATE_LIST_DETAILS_SUCCESS':
      return _.assign(state, {
        readyStatus: 'STATE_LIST_DETAILS_SUCCESS',
        stateDetails: action.data
      });
    default:
      return state;
  }
};
