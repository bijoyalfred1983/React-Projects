/* @flow */

import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { mount } from 'enzyme';
import  columnsData  from './data';
import toJson from 'enzyme-to-json';
import footerList from '../footerList';
import FooterBodyComponent from '../index';

const col1 = {
  title: 'Shop',
  className: '',
  list: [
    { id: '1', content: 'Store Locator', URL: '' },
    { id: '2', content: 'Shop by Make', URL: '' },
    { id: '3', content: 'Shop by Model', URL: '' },
    { id: '4', content: 'Vin Decoder', URL: '' },
    { id: '5', content: 'AutoZone Rewards', URL: '' },
    { id: '6', content: 'Gift Cards ', URL: '' }
  ]
};

const col2 = {
  title: 'AutoZone Services',
  className: 'hide-on-small-only',
  list: [
    { id: '51', content: 'Buy Online, Pick Up in Store', URL: '' },
    { id: '52', content: 'Local Store Ad', URL: '' },
    { id: '53', content: 'Loan-A-Tool', URL: '' },
    { id: '54', content: 'In-store Services', URL: '' },
    { id: '55', content: 'Video Library', URL: '' },
    { id: '56', content: 'Mobile App', URL: '' }
  ]
};

describe('<FooterBodyComponent />', () => {
  let PROPS;
  beforeEach(() => {
    PROPS = {
      data: [col1,col2]
    };
  });

  test('renders on FooterBodyComponent correctly', () => {
    const wrapper = mount(
        <FooterBodyComponent {...PROPS} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

