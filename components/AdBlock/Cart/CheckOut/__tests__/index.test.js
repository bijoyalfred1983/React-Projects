import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import StaticRouter from 'react-router-dom/StaticRouter';
import { Link } from 'react-router-dom';
import CheckOut from '../';

describe('<CheckOut />', () => {
  let PROPS;
  let checkOutPart;
  let staticLabelData;
  let checkOutClickTrack;
  let paypalClickTrack;
  beforeEach(() => {  
    staticLabelData= {"test":""}
    checkOutPart = jest.fn();
    checkOutClickTrack = jest.fn(); 
    paypalClickTrack = jest.fn();
    PROPS = {   
      checkOutPart,
      staticLabelData,
      checkOutClickTrack,
      paypalClickTrack
    };
  });
  test('renders correctly', () => {
    const wrapper = mount(    <StaticRouter>
      <CheckOut staticLabelData={staticLabelData}/>
    </StaticRouter>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('renders correctly', () => {
    const wrapper = mount(    <StaticRouter>
      <CheckOut {...PROPS} />
    </StaticRouter>);
    wrapper.find('.checkOutButton')
    .props()
    .onClick();
     wrapper.find(Link)
    .props()
    .onClick();
    expect(PROPS.checkOutPart.mock.calls.length).toBe(1);
  });
  
  test('renders correctly', () => {
    const dt = staticLabelData = {"label_cart_orderSummary_Checkout":"aa",
    "label_cart_orderSummary_Or":"aa"}
    const wrapper = mount(    <StaticRouter>
      <CheckOut {...PROPS} staticLabelData={dt}/>
    </StaticRouter>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
