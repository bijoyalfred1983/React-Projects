/* @flow */
import formData from '../formData';

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

describe('formData reducer', () => {
  test('should return initial state', () => {
    expect(
      formData(undefined, {
        type: ''
      })
    ).toEqual({
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
    });
  });

  test('should handle SUBMIT_REQUESTING', () => {
    expect(
      formData(initialState, {
        type: 'SUBMIT_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'SUBMIT_REQUESTING',
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
    });
  });

  test('should handle SUBMIT_FAILURE', () => {
    expect(
      formData(initialState, {
        type: 'SUBMIT_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'SUBMIT_FAILURE',
      err: 'Oops! Something went wrong.',
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
    });
  });

  test('should handle SUBMIT_SUCCESS', () => {
    expect(
      formData(initialState, {
        type: 'SUBMIT_SUCCESS',
        data: { login: '1', firstName: 'test' },
        SubmitStatus: true
      })
    ).toEqual({
      readyStatus: 'SUBMIT_SUCCESS',
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
      SubmitStatus: true,
      successValues: { login: '1', firstName: 'test' }
    });
  });
});
