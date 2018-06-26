import axios from 'axios';
import { push } from 'react-router-redux';
import type { Dispatch, ThunkAction } from '../types';
import azURL from '../config/serviceAPI';

export const completeData = (data): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'COMPLETE_REQUESTING' });
  try {
    const response = await axios.post(azURL('commitOrder'), data); // backend
    dispatch({ type: 'COMPLETE_SUCCESS', data: response.data });
    dispatch(push('/OrderConfirmation'));
  } catch (err) {
    dispatch({ type: 'COMPLETE_FAILURE', err: err.message || err.title });
  }
};

export const errorMessage = (message): ThunkAction => async (
  dispatch: Dispatch
) => {
  dispatch({ type: 'LITLEPAY_ERROR', data: message });
};

export default completeData;
