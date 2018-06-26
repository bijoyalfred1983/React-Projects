/* @flow */

import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavLink from '../NavLink';

describe('<NavLink />', () => {
  let PROPS;
  beforeEach(() => {
    PROPS = {
      NavLinks: [
        {
          id: '1',
          content: 'AutoZoner Services '
        },
        {
          id: '2',
          content: 'AutoZoner Benefits Login'
        },
        {
          id: '3',
          content: 'AutoZone Pro'
        },
        {
          id: '4',
          content: 'ALLDATAdiy'
        },
        {
          id: '5',
          content: 'ALLDATA Repair'
        }
      ]
    };
  });

  test('renders on footerOtherSites NavLink correctly', () => {
    const wrapper = mount(
        <NavLink {...PROPS} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


