import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { StaticRouter, Link } from 'react-router-dom';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MiniCartModalContent } from '../MiniCartModalContent';

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
describe('<MiniCartModalContent />', () => {
  let PROPS;
  let ConnectedProduct;
  let mapStateToProps;
  let mapDispatchToProps;

  beforeEach(() => {
    PROPS = {
      orderReadyStatus: "ORDER_SUMMARY_SUCCESS",
      isModalOpen: true,
      staticData: staticData,
      checkOut: jest.fn(),
      image: "https://contentinfo.autozone.com/znetcs/product-info/en/US/mrg/5122/image/2/",
      successData: successData,
      productDetails: productDetails,
      cartTotalData: {itemCount: 0, orderSubTotal: 0},
      miniCartData: successData,
      closeStoreModal: jest.fn(),
      url: "/batteries-starting-and-chargingbsc/alternator-performance/mr-gasket-alternator-performance/82156_395140_4426"
    };
  });

  test('renders correctly MiniCartModalContent', () => {
    const wrapper = mount(
      <StaticRouter context={{}}>
        <MiniCartModalContent {...PROPS} />
      </StaticRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

//   test('Link on click', () => {
//     PROPS.pageType = "productDetail"
//   const wrapper = mount(
//     <StaticRouter context={{}}>
//       <MiniCartModalContent {...PROPS} />
//     </StaticRouter>
//   );
//   wrapper
//     .find(Link)
//     .props()
//     .onClick();
// });


  // test('check crossBTN click', () => {
  //   const wrapper = mount(
  //     <MiniCartModalContent {...PROPS} />
  //   );
  //   wrapper
  //     .find('#crossBTN')
  //     .props()
  //     .onClick();
  //   expect(PROPS.closeStoreModal.mock.calls.length).toBe(1);      
  // });
});
