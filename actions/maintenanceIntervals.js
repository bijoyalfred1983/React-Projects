/* @flow */
import axios from 'axios';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import azURL from '../config/serviceAPI';

export const fetchMI = (
  parentURL: string,
  childURL: string,
  vehicleId: string,
  minRange: number,
  maxRange: number
): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'MAINTENANCE_INTERVALS_REQUESTING' });

  try {
    const MIURL = `${parentURL}/${vehicleId}/maintenanceInterval?maxMilRange=${maxRange}&minMilRange=${minRange}`;
    // console.log('MIURL IS: ', MIURL);
    // const MIURL1 = `${parentURL}/${vehicleId}/maintenanceInterval`;
    const response = await axios.get(MIURL);

    // const response = {
    //   vehicleMileage: '1000',
    //   drivingCondition: 'SEVERE DRIVING CONDITIONS',
    //   vehicleDisplayName: '2008 Acura TL 3.2L MFI SOHC VTEC 6cyl',
    //   maintenanceIntervals: [
    //     {
    //       '': ['1250 Miles or 66000 Kilometers']
    //     },
    //     {
    //       Replace: ['Engine Oil']
    //     },
    //     {
    //       '': ['5000 Miles or 72000 Kilometers']
    //     },
    //     {
    //       Inspect: [
    //         'Brake Hose/Line',
    //         'Constant Velocity Joint Boot',
    //         'Disc Brake System',
    //         'Drive Belt',
    //         'Exhaust System',
    //         'Fluids',
    //         'Fuel Supply Line',
    //         'Parking Brake System',
    //         'Steering and Suspension'
    //       ],
    //       Replace: [
    //         'Air Filter Element',
    //         'Cabin Air Filter / Purifier',
    //         'Engine Oil',
    //         'Oil Filter, Engine'
    //       ],
    //       Rotate: ['Tires']
    //     },
    //     {
    //       '': ['15750 Miles or 78000 Kilometers']
    //     },
    //     {
    //       Replace: ['Engine Oil']
    //     },
    //     {
    //       '': ['17500 Miles or 84000 Kilometers']
    //     },
    //     {
    //       Inspect: [
    //         'Brake Hose/Line',
    //         'Constant Velocity Joint Boot',
    //         'Disc Brake System',
    //         'Exhaust System',
    //         'Fluids',
    //         'Fuel Supply Line',
    //         'Parking Brake System',
    //         'Steering and Suspension'
    //       ],
    //       Replace: ['Engine Oil', 'Oil Filter, Engine'],
    //       Rotate: ['Tires']
    //     },
    //     {
    //       '': ['18250 Miles or 90000 Kilometers']
    //     },
    //     {
    //       Replace: ['Engine Oil']
    //     },
    //     {
    //       '': ['19000 Miles or 96000 Kilometers']
    //     },
    //     {
    //       Inspect: [
    //         'Brake Hose/Line',
    //         'Constant Velocity Joint Boot',
    //         'Disc Brake System',
    //         'Drive Belt',
    //         'Exhaust System',
    //         'Fluids',
    //         'Fuel Supply Line',
    //         'Parking Brake System',
    //         'Steering and Suspension'
    //       ],
    //       Replace: [
    //         'Air Filter Element',
    //         'Cabin Air Filter / Purifier',
    //         'Engine Oil',
    //         'Fluid - A/T',
    //         'Oil Filter, Engine',
    //         'Timing Belt'
    //       ],
    //       Rotate: ['Tires']
    //     }
    //   ]
    // };

    // console.log('Response Data: ', response);
    dispatch({ type: 'MAINTENANCE_INTERVALS_SUCCESS', data: response.data });
  } catch (err) {
    dispatch({ type: 'MAINTENANCE_INTERVALS_FAILURE', err: err.message });
  }
};

// Preventing dobule fetching data
/* istanbul ignore next */
const shouldFetchView = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  if (state.home.readyStatus === 'MAINTENANCE_INTERVALS_SUCCESS') return false; // Preventing double fetching data

  return true;
};

export const fetchMIData = /* istanbul ignore next */ (
  vehicleId: string,
  minRange: number,
  maxRange: number
): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  /* istanbul ignore next */
  if (shouldFetchView(getState())) {
    /* istanbul ignore next */
    return dispatch(
      fetchMI(
        azURL('maintenanceIntervalParent'),
        azURL('maintenanceIntervalChild'),
        vehicleId,
        minRange,
        maxRange
      )
    );
  }

  /* istanbul ignore next */
  return null;
};
