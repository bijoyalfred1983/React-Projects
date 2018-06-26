/* @flow */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavLink from '../NavLink';
import OtherSitesComponent from '../index';

describe('<OtherSitesComponent />', () => {
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
        }
      ]
    };
  });

  test('renders on OtherSitesComponent correctly', () => {
    const wrapper = mount(
        <OtherSitesComponent {...PROPS} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


