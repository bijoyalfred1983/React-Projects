/* @flow */

import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import IconPane from '../IconPane';

describe('<IconPane />', () => {
  let PROPS;
  beforeEach(() => {
    PROPS = {
      btnContainer: [
        {
          id: '1',
          url: 'https://www.facebook.com/',
          iconUrl: '/images/socialmedia/icon-facebook.svg'
        }
      ]
    };
  });

  test('renders on Footer IconPane correctly', () => {
    const wrapper = mount(
        <IconPane {...PROPS} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


