import resetFormData from '../resetPassword';

describe('forgot form data', () => {
  test('should return the initial state', () => {
    expect(resetFormData(undefined, {})).toEqual({
      readyStatus: '',
      err: null,
      formValues: {}
    });
  });

  test('should handle SUBMITRESET_REQUESTING', () => {
    expect(
      resetFormData(undefined, {
        type: 'SUBMITRESET_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'SUBMITRESET_REQUESTING',
      err: null,
      formValues: {}
    });
  });

  test('should handle SUBMITRESET_FAILURE', () => {
    expect(
      resetFormData(undefined, {
        type: 'SUBMITRESET_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'SUBMITRESET_FAILURE',
      err: 'Oops! Something went wrong.',
      formValues: {}
    });
  });

  test('should handle SUBMITRESET_SUCCESS', () => {
    expect(
      resetFormData(undefined, {
        type: 'SUBMITRESET_SUCCESS',
        data: [('mf_resetpassword_success': 'success')]
      })
    ).toEqual({
      readyStatus: 'SUBMITRESET_SUCCESS',
      err: null,
      formValues: [('mf_resetpassword_success': 'success')]
    });
  });
});
