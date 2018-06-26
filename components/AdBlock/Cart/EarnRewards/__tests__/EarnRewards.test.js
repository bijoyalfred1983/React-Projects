import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import EarnRewards from '../';

describe('<EarnRewards />', () => {
  test('renders correctly EarnRewards', () => {
    const wrapper = mount(<EarnRewards />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
