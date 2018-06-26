/* @flow */
import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DeliveryOption } from '../DeliveryOption';

describe('<DeliveryOption />', () => {
  let PROPS = {};
  let mockData = null;
  let ConnectedProduct;
  let mapStateToProps;
  let mapDispatchToProps;
  let staticLabelData;
  beforeEach(() => {
    staticLabelData = {
    "label_cart_lineItem_ShipToHomeHyphenated":"",
    "StorePickUpHyphenated":"",
    "label_cart_lineItem_StorePickUpHyphenated":""
  };
    mockData = {
      staticLabelData,
      data: {
        readyStatus: 'STORECHANGE_SUCCESS',
        storeItem: true,
        rawTotalPrice: 7.99,
        estDeliveryTime: 'Est. Delivery: Feb  14-15',
        displayName: 'Pilot Automotive/Antenna',
        availability: 'In Stock',
        commerceItemId: 'ci343000002',
        techNotes: null,
        productNotes: null,
        vehicleFit: false,
        imageURL:
          'https://contentinfo.autozone.com/znetcs/product-info/en/US/pil/CZ-241EC/image/1/',
        onSale: false,
        rebateAvailable: false,
        warrenty: null,
        eligibleForNextDay: false,
        amount: 7.99,
        '@class': 'com.autozone.diy.vo.AZCartCommerceItems',
        quantity: 1,
        salePrice: 0,
        dealAvailable: false,
        catalogRefId: '20372',
        application: null,
        unitAmount: 7.99,
        location: null,
        partNumber: 'CZ-241EC',
        quickNote: '425 Cold cranking Amps (530 cranking Amps)',
        currencyCode: 'USD',
        listPrice: 7.99,
        skuPricingAndAvailability: {
          lowestPrice: 0,
          corePriceAvailable: true,
          rebateUrl: null,
          vendorId: null,
          bopusStore: false,
          productLine: null,
          storePickupCSSClass: null,
          SRElegible: false,
          configurableSkuMessage: null,
          shipToHomeCSSClass: null,
          storePickupLabel: 'Store Pick Up',
          shipToHomeLabel: 'Ship To Home',
          skuId: '319462',
          highestPrice: 0,
          '@class': 'com.autozone.diy.commerce.pricing.AZPricingDealsInfo',
          onlineStockLabel: null,
          productId: null,
          rebatesAvaialble: false,
          shipToHomeStockLabel: 'In Stock',
          skuAddedTocart: false,
          storePickupAvailable: true,
          dealAvailable: false,
          skuUnavailable: false,
          storePickupStockLabel: 'Out of Stock',
          skuAvailabilityInfo: {
            unAvailableInStoreAndVdpStore: false,
            lowestPrice: null,
            unavailOnlineQoh: false,
            hubAvail: false,
            storeAvail: true,
            availableInOnline: false,
            webCorePrice: null,
            availableInVdpOnline: false,
            shippingAvailabilityMessage: {
              eligibleForNextDay: false,
              '@class':
                'com.autozone.diy.integration.shipping.ShippingAvailabilityMessage',
              inventoryMessage: null,
              holiday: false,
              cutOffTime: null,
              orderByMessage: null,
              calculatedDate: null,
              carrierHoliday: false,
              commerceItemId: null,
              qoHAvailable: false,
              displayDate: null,
              nextDayAvailableMessage: null,
              messageCutoffTime: null,
              messageDate: null
            },
            availableInStore: true,
            storeTotalPrice: '192.99',
            orderByMessage: null,
            showSearchAnotherStoreLink: false,
            storeRetailPrice: '174.99',
            unAvailableInOnlineAndVdpOnline: true,
            unavailQoh: true,
            eligibleForNextDay: false,
            item: null,
            '@class': 'com.autozone.diy.valueobject.SKUAvailabilityPriceInfo',
            webRetailPrice: null,
            webTotalPrice: null,
            availableForDirectShipping: false,
            exceptionItem: false,
            storeCorePrice: '18.0',
            availableInVdpStore: false,
            messageCutOffTime: null,
            nextDayAvailableMessage: null,
            skuid: '319462'
          },
          estimatedDeliveryMessage: 'Not Available',
          shipToHomeAvailable: false,
          dealUrl: false,
          configurableSku: false,
          retailPrice: 174.99,
          categoryId: null,
          corePrice: 18
        }
      }
    };

    PROPS = mockData;
  });
  test('renders correctly', () => {
    PROPS.staticLabelData = {
    "label_cart_lineItem_ShipToHomeHyphenated":"AAA",
    "StorePickUpHyphenated":"aaa",
    "label_cart_lineItem_StorePickUpHyphenated":"aaa"
  };
    const wrapper = mount(
      <StaticRouter context={{}}>
        <DeliveryOption {...PROPS} />
      </StaticRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('check whether component will receive props is called correctly', () => {
    PROPS.staticLabelData = {"TEST":""};
    const wrapper = mount(
      <StaticRouter context={{}}>
        <DeliveryOption {...PROPS} />
      </StaticRouter>
    );
    var dat = {
        quantityData: "Message",
        quantityStatus: "STORECHANGE_SUCCESS"
    }; 
    wrapper.find(DeliveryOption).instance().componentWillReceiveProps(dat);
  });
});
