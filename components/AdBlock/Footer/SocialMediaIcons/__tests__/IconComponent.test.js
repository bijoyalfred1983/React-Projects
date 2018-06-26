/* @flow */

import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import IconPane from '../IconPane';
import IconComponent from '../IconComponent';

describe('<IconComponent />', () => {
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

  test('renders on Footer IconComponent correctly', () => {
    const wrapper = mount(
        <IconComponent {...PROPS} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});


