import forgotFormData from '../forgotPassword';

describe('forgot form data', () => {
  test('should return the initial state', () => {
    expect(forgotFormData(undefined, {})).toEqual({
      readyStatus: '',
      err: null,
      formValues: {}
    });
  });

  test('should handle SUBMITFORGOT_REQUESTING', () => {
    expect(
      forgotFormData(undefined, {
        type: 'SUBMITFORGOT_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'SUBMITFORGOT_REQUESTING',
      err: null,
      formValues: {}
    });
  });

  test('should handle SUBMITFORGOT_FAILURE', () => {
    expect(
      forgotFormData(undefined, {
        type: 'SUBMITFORGOT_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'SUBMITFORGOT_FAILURE',
      err: 'Oops! Something went wrong.',
      formValues: {}
    });
  });

  test('should handle SUBMITFORGOT_SUCCESS', () => {
    expect(
      forgotFormData(undefined, {
        type: 'SUBMITFORGOT_SUCCESS',
        data: [
          ('mf_forgotpasswordpage_forgot_invalid_email': 'Email is not valid')
        ]
      })
    ).toEqual({
      readyStatus: 'SUBMITFORGOT_SUCCESS',
      err: null,
      formValues: [
        ('mf_forgotpasswordpage_forgot_invalid_email': 'Email is not valid')
      ]
    });
  });
});
