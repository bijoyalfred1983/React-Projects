import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import toJson from 'enzyme-to-json';
import { MiniCartCounterPart } from '../MiniCartCounterPart';

const store = createStore(() => ({}));

describe('<MiniCartCounterPart />', () => {
  let PROPS;
  let ConnectedProduct;
  let mapStateToProps;
  let mapDispatchToProps;

  const staticData = {
    pagecontent_cart_corePopup_CoreDetails: "Core Text",
    label_cart_lineItem_Was: "was",
    label_cart_lineItem_Core: "Core",
    label_cart_lineItem_WhatIsIt: "what is it"
  }

  const cartDataError = {
    response : {
      data: {
        title: "issue"
      }
    }
  }

  beforeEach(() => {
    PROPS = {
      data: {quantity: 5, unitAmount: 12, commerceItemId: "ci2037999"},
      updateQunatity: jest.fn(),
      quantityStatus: "ITEMQUANTITY_SUCCESS",
      quantityData: "Success",
      commerceId: "ci20346778",
      quantityValue: 8,
      staticData: staticData,
      updatedValue: jest.fn(),
      cartDataError: cartDataError,
      appData: {}
    };
  });

  test('renders correctly StoreModalContent', () => {
    const wrapper = mount(
      <StaticRouter context={{}}>
        <MiniCartCounterPart {...PROPS} />
      </StaticRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // test('check whether component will receive props is called correctly', () => {
  //   const wrapper = mount(
  //     <MiniCartCounterPart {...PROPS} />
  // );
  //   var dat = {
  //       quantityData: "Message",
  //       quantityStatus: "ITEMQUANTITY_SUCCESS",
  //       quantityValue: 5,
  //       commerceId: "ci20005789",
  //       cartDataError: cartDataError
  //   }; 
  //   wrapper.instance().componentWillReceiveProps(dat);
  // });

  test('incrementCount button works correctly', () => {
    const wrapper = mount(
      <MiniCartCounterPart {...PROPS} />
    );
    wrapper.setState({ value: '' });
    // wrapper.instance().incrementCount();
    PROPS = { updateQunatity: jest.fn() };
    wrapper
    .find('#incrementBtn')
    .at(0)
    .simulate('click');
    expect(wrapper.instance().state.value).toEqual('increment');
  expect(PROPS.updateQunatity.mock.calls.length).toBe(0);

  });
  test('decrementCount button works correctly', () => {
    const wrapper = mount(
      <MiniCartCounterPart {...PROPS} />
    );
    wrapper.setState({ value: '' });
    // wrapper.instance().incrementCount();
    PROPS = { updateQunatity: jest.fn() };
    wrapper
    .find('#decrementBtn')
    .at(0)
    .simulate('click');
    expect(wrapper.instance().state.value).toEqual('decrement');
  expect(PROPS.updateQunatity.mock.calls.length).toBe(0);
 
  });

  test('check whether component will receive props is called correctly', () => {
    const wrapper = mount(
        <MiniCartCounterPart {...PROPS} />
    );
    var dat = {
      data: { quantity: 5, unitAmount: 12, commerceItemId: 'ci2037999' },
      updateQunatity: jest.fn(),
      quantityData: "Success",
      quantityStatus: "ITEMQUANTITY_SUCCESS",
      quantityValue: 5,
      commerceId: "ci2037999",
      cartDataError: cartDataError,
      errorValue: false
   }; 
    wrapper.setState({ count: 5, oldCount: 5, value: "increment" });
    wrapper.setProps(dat);
    wrapper.update();

    expect(PROPS.updatedValue.mock.calls.length).toBe(1);
    wrapper.instance().validateVal(dat);
    expect(wrapper.instance().state.count).toBe(7);
    expect(wrapper.instance().state.oldCount).toBe(7);

  });

  test('check whether component will receive props is called correctly', () => {
    const wrapper = mount(
        <MiniCartCounterPart {...PROPS} />
    );
    var dat = {
      data: { quantity: 5, unitAmount: 12, commerceItemId: 'ci2037999' },
      updateQunatity: jest.fn(),
      quantityData: "Success",
      quantityStatus: "ITEMQUANTITY_SUCCESS",
      quantityValue: 5,
      commerceId: "ci2037999",
      cartDataError: cartDataError,
      errorValue: false
   }; 
    wrapper.setState({ count: 5, oldCount: 5, value: "decrement" });
    wrapper.setProps(dat);
    wrapper.update();

    expect(PROPS.updatedValue.mock.calls.length).toBe(1);
    wrapper.instance().validateVal(dat);
    expect(wrapper.instance().state.count).toBe(3);
    expect(wrapper.instance().state.oldCount).toBe(3);

  });

  test('check whether component will receive props is called correctly', () => {
    const wrapper = mount(
        <MiniCartCounterPart {...PROPS} />
    );
    var dat = {
      data: { quantity: 5, unitAmount: 12, commerceItemId: 'ci2037999' },
      updateQunatity: jest.fn(),
      quantityData: "Success",
      quantityStatus: "ITEMQUANTITY_SUCCESS",
      quantityValue: 5,
      commerceId: "ci2037999",
      cartDataError: cartDataError,
      errorValue: false
   }; 
    wrapper.setState({ count: 5, oldCount: 5, value: '' });
    wrapper.setProps(dat);
    wrapper.update();

    expect(PROPS.updatedValue.mock.calls.length).toBe(1);
    wrapper.instance().validateVal(dat);
    expect(wrapper.instance().state.count).toBe(5);
    expect(wrapper.instance().state.oldCount).toBe(5);

  });

  test('check whether component will receive props is called correctly', () => {
    const wrapper = mount(
        <MiniCartCounterPart {...PROPS} />
    );
    var dat = {
      data: { quantity: 5, unitAmount: 12, commerceItemId: 'ci2037999' },
      updateQunatity: jest.fn(),
      quantityStatus: "ITEMQUANTITY_FAILURE",
      quantityValue: 5,
      commerceId: "ci2037999",
      cartDataError: cartDataError,
      errorValue: true
   }; 
    wrapper.setState({ count: 5, oldCount: 5, value: '' });
    wrapper.setProps(dat);
    wrapper.update();

    expect(PROPS.updatedValue.mock.calls.length).toBe(1);
    wrapper.instance().validateVal(dat);
    expect(wrapper.instance().state.count).toBe(5);
    expect(wrapper.instance().state.oldCount).toBe(5);

  });

  test('check whether handle keydown is working correctly', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <MiniCartCounterPart {...PROPS} />
      </MuiThemeProvider>  
    );
    const event = {
      key: 'Enter',
      target: {
        value: 5
      }
    };
    wrapper.find(MiniCartCounterPart).instance().handleKeyDown(event);
    expect(wrapper.find(MiniCartCounterPart).instance().state.count).toBe(5);
  });

  test('check whether keypress event is working correctly', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <MiniCartCounterPart {...PROPS} />
      </MuiThemeProvider>  
    );
    const event = {
      target: {
        value: 5
      }
    };
    wrapper.setState({count: 1});
    wrapper.find(MiniCartCounterPart).instance().handleKeyPress(event);
    expect(wrapper.find(MiniCartCounterPart).instance().state.count).toBe(5);
  });

  test('check whether handle change is working correctly', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <MiniCartCounterPart {...PROPS} />
      </MuiThemeProvider>
    );
    const event = {
      key: 'Enter',
      target: {
        value: 5
      }
    };
    wrapper.find(MiniCartCounterPart).instance().handleChange(event);
    expect(wrapper.find(MiniCartCounterPart).instance().state.count).toBe(5);
    const event_1 = {
      key: 'Enter',
      target: {
        value: "25d"
      }
    };
    wrapper.find(MiniCartCounterPart).instance().handleChange(event_1);
    expect(wrapper.find(MiniCartCounterPart).instance().state.count).toBe(1);
  });
});

