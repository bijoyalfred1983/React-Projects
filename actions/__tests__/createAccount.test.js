/* @flow */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchPageData } from '../createAccount';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch create account data', () => {
  const response = {
    mf_registration_cancel: 'CANCEL',
    _links: {
      'oc:getForgotPasswordPageContents': {
        method: 'GET',
        href: 'http://dv-camaro1-xl07:8289/autozone/v1/page/forgotPasswordPage'
      },
      curies: [
        {
          templated: true,
          name: 'oc',
          href: '/rels/{rel}'
        }
      ],
      'oc:getResetPasswordPageContents': {
        method: 'GET',
        href: 'http://dv-camaro1-xl07:8289/autozone/v1/page/resetPasswordPage'
      }
    },
    mf_registration_lastName: 'Last Name',
    mf_registration_TermsandConditions:
      'By clicking Sign Up, you agree to the ',
    mf_registration_error_firstname: 'Please enter a first name.',
    mf_registration_error_phone_not_valid: 'Phone not valid',
    mf_registration_signUp: 'SIGN UP',
    mf_registration_error_phonenumber: 'Phone number must be 10 digits.',
    mf_registration_password: 'Password',
    mf_registration_phone_desktop_lbl: 'Phone Number',
    mf_registration_rewards_textbox_lbl: 'AutoZone Rewards Member ID',
    mf_registration_myZoneAcc_msg:
      'Create a MyZone Account to get these benefits and more',
    mf_registration_error_lastname_alphabets:
      'Last Name can only have alphabets',
    mf_registration_zip: 'Zip',
    mf_registration_rewards: 'Enter your AutoZone Rewards Member ID',
    mf_registration_error_password: 'Password has to be from 4-30 characters',
    mf_registration_privacy:
      'Yes, I would like to receive special offers, promotions, news, surveys, and correspondence from AutoZone, AutoZone.com, and AutoZone Rewards. ',
    mf_registration_error_rewards: 'Rewards should be a 16 digit number',
    mf_registration_password_desc:
      'Passwords are case sensitive and must be at least 8 characters, with atleast 1 number and 1 special character.',
    mf_registration_error_zipcode: 'Zip code must be 5 digits.',
    mf_registration_required_lbl: 'Required',
    mf_registration_page_header_lbl: 'Create Online Account',
    mf_registration_error_firstname_alphabets:
      'First Name can only have alphabets',
    mf_registration_phone: 'Phone',
    mf_registration_error_zip_not_valid: 'Zip not valid',
    mf_registration_rewards_msg:
      'Enter your AutoZone Rewards Member ID to link your rewards to your new account. Your ID number can be found on the back side of your AutoZone Rewards card.',
    mf_registration_welcome_lbl: 'WELCOME',
    mf_registration_TermsandConditions_2: 'Terms \u0026 Conditions.',
    mf_registration_error_lastname: 'Please enter a last name.',
    mf_registration_firstName: 'First Name',
    mf_registration_back: '\u003cBack',
    mf_registration_password_hide: 'HIDE',
    mf_registration_myZoneAcc_benefit_msg_1:
      'Earn a $20 Reward when you make five purchases of $20 or more',
    mf_registration_myZoneAcc_benefit_msg_2:
      'Save your information and preferences for fast checkout',
    success: 'true',
    mf_registration_email: 'Email',
    mf_registration_myZoneAcc_benefit_msg_3:
      'Manage your vehicle, see your order history and warranty information',
    mf_registration_zip_desktop_lbl: 'Zip Code',
    mf_registration_password_show: 'SHOW',
    mf_registration_createAccount: 'Create Account',
    mf_registration_SignIn: 'Already have an account? ',
    mf_registration_privacy_2: 'Read our Privacy Policy',
    mf_registration_error_email: 'Please enter a valid email.',
    mf_registration_error_email_not_valid: 'Email not valid',
    mf_registration_SignIn_2: 'Sign In.'
  };

  const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates CREATE_SUCCESS when fetching create account data has been done', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'CREATE_REQUESTING' },
      { type: 'CREATE_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates USER_FAILURE when fail to fetch create account data', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'CREATE_REQUESTING' },
      { type: 'CREATE_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchPageData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
