/* @flow */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import LinkButton from '../LinkButton';
describe('<LinkButton />', () => {
  let PROPS;
  beforeEach(() => {
    PROPS = {
      bottomlinks:  [
        {
          id: '1',
          content: 'Terms & Conditions',
          url: '/termsCondition'
        },
        {
          id: '2',
          content: 'Privacy Policy',
          url: ''
        }
      ]
    };
  });

  test('renders on LinkButton correctly', () => {
    const wrapper = mount(
        <LinkButton {...PROPS} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


