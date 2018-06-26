import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import toJson from 'enzyme-to-json';

import MiniCartModal from '../MiniCartModal';

describe('<MiniCartModal />', () => {
  let PROPS;

  const staticData = {
    pagecontent_cart_corePopup_CoreDetails: "Core Text",
    label_cart_lineItem_Was: "was",
    label_cart_lineItem_Core: "Core",
    label_cart_lineItem_WhatIsIt: "what is it"
  };

  const successData = {
    quantity: 4,
    priceInfo: {
      unitAmount: 26.59,
      rawTotalPrice: 56,
      onSale: false
    },
    id: 25684,
    sku: {
      displayName: "Optima / Battery",
      id: "437833"
    }
  };

  const productDetails = {
    categoryId: null,
    corePrice: 18,
    corePriceAvailable: true,
    dealAvailable: false,
    estimatedDeliveryMessage: "Ships within 1-2 business days.",
    productId: null,
    rebateUrl: null,
    rebatesAvaialble:false,
    retailPrice: 227.99
  }

  beforeEach(() => {
    PROPS = {
      isModalOpen: true,
      staticData: staticData,
      image: "https://contentinfo.autozone.com/znetcs/product-info/en/US/mrg/5122/image/2/",
      successData: successData,
      productDetails: productDetails,
      miniCartData: {itemCount: 0, orderSubTotal: 0},
      closeStoreModal: jest.fn(),
      myStoreEnable: true,
      showMyStore: jest.fn(),
      url: "/batteries-starting-and-chargingbsc/alternator-performance/mr-gasket-alternator-performance/82156_395140_4426"
    };
  });

  test('renders correctly MiniCartModal', () => {
    const wrapper = mount(<MuiThemeProvider><MiniCartModal /></MuiThemeProvider>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('renders correctly MiniCartModal with props', () => {
    const wrapper = mount(<MuiThemeProvider><MiniCartModal {...PROPS} /></MuiThemeProvider>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
