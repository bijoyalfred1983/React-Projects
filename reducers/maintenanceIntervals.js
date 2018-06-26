/* @flow */

import _ from 'lodash/fp';

import type { MaintenanceIntervalsData, Action } from '../types';

const initialState = {
  readyStatus: 'MAINTENANCE_INTERVALS_INVALID',
  err: null,
  viewInfo: {}
};

const maintenanceIntervals = (
  state: MaintenanceIntervalsData = initialState,
  action: Action
): MaintenanceIntervalsData => {
  switch (action.type) {
    case 'MAINTENANCE_INTERVALS_REQUESTING':
      return _.assign(state, {
        readyStatus: 'MAINTENANCE_INTERVALS_REQUESTING'
      });
    case 'MAINTENANCE_INTERVALS_FAILURE':
      return _.assign(state, {
        readyStatus: 'MAINTENANCE_INTERVALS_FAILURE',
        err: action.err
      });
    case 'MAINTENANCE_INTERVALS_SUCCESS':
      return _.assign(state, {
        readyStatus: 'MAINTENANCE_INTERVALS_SUCCESS',
        viewInfo: action.data
      });
    default:
      return state;
  }
};

export default maintenanceIntervals;
