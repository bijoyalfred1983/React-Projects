import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import ContactInfo from '../';

 let PROPS = {};
describe('<ContactInfo />', () => {
	PROPS = {
		staticLabelData: {}
	}
  test('renders correctly ContactInfo', () => {
    const wrapper = mount(<ContactInfo {...PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

    test('renders correctly ContactInfo with static label data', () => {
   	PROPS.staticLabelData = {"label_checkout_cart_QuestionsAllCaps":"a",
   	"label_checkout_footer_ContactUsAt8002886966":"",
   	"label_checkout_footer_CustomerServiceAutozoneCom":"a",
   	"label_checkout_footer_Or4400SummerAvenueMemphisTn38122":"a"}
    const wrapper = mount(<ContactInfo {...PROPS} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
