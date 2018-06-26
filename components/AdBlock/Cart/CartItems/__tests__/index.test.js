import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import CartItems from '../';

jest.mock(
  '../Item',
  () =>
    function Item() {
      return <span>Item</span>;
    }
);

describe('<CartItems />', () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      items: [{ commerceItemId: '1st item' }, { commerceItemId: '2nd item' }]
    };
  });

  test('renders correctly', () => {
    const wrapper = mount(<CartItems {...PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
