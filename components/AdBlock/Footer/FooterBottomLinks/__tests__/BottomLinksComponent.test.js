/* @flow */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import LinkButton from '../BottomLinksComponent';
describe('<BottomLinksComponent />', () => {
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

  test('renders on BottomLinksComponent correctly', () => {
    const wrapper = mount(
        <BottomLinksComponent {...PROPS} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


