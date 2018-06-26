/* @flow */
import React from 'react';
import { mount } from 'enzyme';
import { Link, StaticRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import NavButtons from '../NavButtons';

describe('<NavButtons />', () => {
  let PROPS;
  beforeEach(() => {
    PROPS = {
      btnContainer:  [
        {
          id: '1',
          linkTo: '/',
          content: 'locate a store',
          iconUrl: '/images/footer/location-pin.svg',
          className: ''
        },
        {
          id: '2',
          linkTo: '/trackOrder',
          content: 'track your order',
          iconUrl: '/images/footer/box.svg',
          className: ''
        }
      ]
    };
  });

  test('renders on NavButtons correctly', () => {
    const wrapper = mount(
      <StaticRouter context={{}}>
        <NavButtons {...PROPS} />
        </StaticRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});



