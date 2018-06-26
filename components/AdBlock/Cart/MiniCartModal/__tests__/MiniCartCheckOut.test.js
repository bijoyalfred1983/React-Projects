import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import toJson from 'enzyme-to-json';
import { createStore } from 'redux';
import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import { MiniCartCheckOut } from '../MiniCartCheckOut';
const store = createStore(() => ({}));

describe('<MiniCartCheckOut />', () => {
  let PROPS;

  beforeEach(() => {
    PROPS = {
      orderTotalPart: {quantity: 5, unitAmount: 12, commerceItemId: "ci2037999"},
      miniCartFlag: true,
      checkOut: jest.fn(),
      totalData: { itemCount: 5, orderSubTotal: 12},
      checkoutError: 'ERROR',
      updatedError: jest.fn(),
      appData: {}
    };
  });

  test('renders correctly StoreModal with props', () => {
    const wrapper = mount(
      <MiniCartCheckOut {...PROPS} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});