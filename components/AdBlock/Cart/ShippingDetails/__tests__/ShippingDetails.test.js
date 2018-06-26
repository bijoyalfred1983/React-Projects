import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ShippingDetails from '../';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Link } from 'react-router-dom';

describe('<ShippingDetails />', () => {

  let PROPS = {};
  beforeEach(() => {
    const staticLabelData = {"test":"aa"};
    PROPS = {
      cartData: {
        storeZipcode: '38104',
        shopRunnerOn: true,
        storeNextTransitionTime: '7:30 AM',
        storeAddress1: '',
        storeAddress: '385 N Cleveland St',
        srMinDate: '22 Jan',
        srMaxDate: '24 Jan',
        storeState: 'TN',
        storeCity: 'Memphis'
      },
      staticLabelData,
      changeStoreLinkInteraction: jest.fn()
    };
  });

  test('renders correctly ShippingDetails', () => {
    const wrapper = mount(
      <StaticRouter>
        <ShippingDetails {...PROPS}/>
      </StaticRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('check for empty cart data for ShippingDetails', () => {
    const AnalyticsData = {
    "label_cart_bopus_PickUpInStoreSameDay":"a",
    "label_cart_bopus_SaveTimeBySelectingPickUpInStoreAndWeLlEmailYouWhenProductsAreReady":"a",
    "label_cart_bopus_OnlyApplicableIfOrderedMoreThanOneHourBeforeClosingTime":"a",
    "label_cart_bopus_ClosesAt":"a",
    "label_cart_bopus_ChangeStore":"a",
    "label_cart_shipToHome_ShipToHomeWith":"a",
    "label_cart_shipToHome_LearnMore":"a",
    "label_checkout_signin_SignIn":"a",
    "label_cart_bopus_ClosesAt":"a",
    "label_cart_beforeFooter_And":"a",
    "label_cart_beforeFooter_With":"a",
    "label_cart_bopus_2DayShipping":"a",
    "label_cart_bopus_Free":"a"
  }
    PROPS = {
      cartData: {},
      staticLabelData: AnalyticsData
    };
    const wrapper = mount(
      <StaticRouter>
        <ShippingDetails {...PROPS}/>
      </StaticRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('test onClick function', () => {
    const wrapper = mount(
      <StaticRouter>
        <ShippingDetails {...PROPS}/>
      </StaticRouter>
    );
      wrapper
      .find(Link)
      .at(0)
      .props()
      .onClick();
    //expect(toJson(wrapper)).toMatchSnapshot();
  });

});
