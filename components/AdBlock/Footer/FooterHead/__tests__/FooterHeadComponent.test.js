/* @flow */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import NavButtons from '../NavButtons';
import FooterHeadComponent from '../index';
import { StaticRouter } from 'react-router-dom';

describe('<FooterHeadComponent />', () => {
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

  test('renders on FooterHeadComponent correctly', () => {
    const wrapper = mount(
      <StaticRouter context={{}}>
              <FooterHeadComponent {...PROPS} />
              </StaticRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});



