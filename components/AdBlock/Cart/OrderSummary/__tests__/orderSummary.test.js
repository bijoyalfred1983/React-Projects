import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MuiThemeProvider } from 'material-ui/styles';
import { Popup, Header } from 'semantic-ui-react';
import { CartOrderSummary, RHeader } from '../index';

describe('<CartOrderSummary />', () => {
  let PROPS;
  let RHeaderProps;
  beforeEach(() => {
    PROPS = {
      staticLabelData: { test: 'aa', label_cart_corePopup_CoreDeposit: 'Test' },
      promoCall: jest.fn(),
      removePromoCodeCall: jest.fn(),
      promoData: { response: 'success', name: 'Test', id: '123' },
      updateReadyStatus: 'PROMOCODE_APPLY_SUCCESS',
      cartData: {
        commerceItemsList: [
          {
            storeItem: false
          }
        ]
      },
      data: {
        couponVOList: {
          '@class': 'com.autozone.diy.vo.AZCouponVO',
          couponList: [
            {
              '@class': 'com.autozone.diy.vo.AZCouponResponseVO',
              applied: false,
              response: 'failure',
              errorMessage: null,
              name: 'Test',
              description: null,
              id: 123,
              removeEndurl: null
            }
          ]
        },
        itemSubtotal: 6.99,
        orderSubtotal: 6.99,
        shipping: 0,
        taxes: 0,
        totalSavings: 0
      }
    };
    RHeaderProps = {
      staticLabelData: { test: 'aa', label_cart_corePopup_CoreDeposit: 'Test' }
    };
  });

  test('renders ordersummary section correctly', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <CartOrderSummary {...PROPS} {...RHeaderProps} />
      </MuiThemeProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('is info close button working', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <CartOrderSummary {...PROPS} {...RHeaderProps} />
      </MuiThemeProvider>
    );
    const fn = jest.fn();
    const headerWrapper = mount(
      <RHeader
        clickFn={fn}
        staticLabelData={{
          test: 'aa',
          label_cart_corePopup_CoreDeposit: 'Test'
        }}
      />
    );
    headerWrapper
      .find('#infoCloseBtn')
      .props()
      .onClick();
    expect(fn.mock.calls.length).toBe(1);
    expect(wrapper.find(CartOrderSummary).instance().state.isOpen).toBe(false);
    wrapper
      .find(CartOrderSummary)
      .instance()
      .closeClick();
    expect(wrapper.find(CartOrderSummary).instance().state.isOpen).toBe(false);
  });

  test('Check info popup trigger button on open', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <CartOrderSummary {...PROPS} />
      </MuiThemeProvider>
    );
    expect(wrapper.find(CartOrderSummary).instance().state.isOpen).toBe(false);
    wrapper
      .find(CartOrderSummary)
      .find('#infoPopup')
      .props()
      .onOpen();
    expect(wrapper.find(CartOrderSummary).instance().state.isOpen).toBe(true);
  });

  test('Check info popup trigger button on close', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <CartOrderSummary {...PROPS} />
      </MuiThemeProvider>
    );
    expect(wrapper.find(CartOrderSummary).instance().state.isOpen).toBe(false);
    wrapper
      .find(CartOrderSummary)
      .find('#infoPopup')
      .props()
      .onClose();
    expect(wrapper.find(CartOrderSummary).instance().state.isOpen).toBe(false);
  });

  test('Check promo submit functionality is working correct', () => {
    global.utagData = {};
    const wrapper = mount(<CartOrderSummary {...PROPS} />);
    wrapper.setState({ value: 'Test' });
    wrapper
      .find('#promoSubmitBtn')
      .props()
      .onClick();
    expect(PROPS.promoCall.mock.calls.length).toBe(1);
    wrapper.instance().handleSubmit();
    wrapper
      .find('#secondPromoBtn')
      .props()
      .onClick();
  });

  test('Check handle change function of promotext input been called', () => {
    const wrapper = mount(<CartOrderSummary {...PROPS} />);
    const event = { target: { value: '12345' } };
    wrapper.instance().handleChange(event);
    expect(wrapper.instance().state.value).toBe('12345');
  });

  test('Check remove promo code has been called', () => {
    const wrapper = mount(<CartOrderSummary {...PROPS} />);
    wrapper
      .find('#removePromoCodeBtn')
      .at(0)
      .props()
      .onClick();
    expect(PROPS.removePromoCodeCall.mock.calls.length).toBe(1);
  });
});
