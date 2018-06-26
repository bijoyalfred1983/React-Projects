import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Item } from '../index';

 

jest.mock(

  '../DeliveryOption',

  () =>

    function DeliveryOption() {

      return <span>Delivery Option</span>;

    }

);

jest.mock(

  '../CounterPart',

  () =>

    function CounterPart() {

      return <span>CounterPart</span>;

    }

);

 

describe('<CartItem />', () => {

  let PROPS = {};

const appData = {"staticLabelData":{"en_US":{"aaa":"aaa"}}};

  beforeEach(() => {

    PROPS = {

      appData,

      data: {

        storeItem: false,

        rawTotalPrice: 3698.73,

        estDeliveryTime: 'Est. Delivery: Feb  15-16',

        displayName: 'Duralast / Alternator',

        availability: 'In Stock',

        commerceItemId: 'ci343000004',

        techNotes: null,

        productNotes: '***900 Cold cranking amps (1000 cranking amps)***',

        vehicleFit: true,

        vehicleDescription: '2016 Chevrolet Silverado 1500',

        imageURL:

          'https://contentinfo.autozone.com/znetcs/product-info/en/US/dur/DL3655-6-9/image/1/',

        onSale: false,

        rebateAvailable: true,

        warrenty: '3 years',

        eligibleForNextDay: true,

        amount: 3698.73,

        '@class': 'com.autozone.diy.vo.AZCartCommerceItems',

        quantity: 27,

        salePrice: 0,

        dealAvailable: false,

        catalogRefId: '209336',

        application:

          'Down-stream sensor (located after catalytic converter). ESA Engine Code.',

        unitAmount: 136.99,

        location: 'front',

        partNumber: 'DL3655-6-9',

        quickNote: '425 Cold cranking Amps (530 cranking Amps)',

        currencyCode: 'USD',

        listPrice: 136.99,

        "skuPricingAndAvailability":{

            "lowestPrice":0,

            "corePriceAvailable":true,

            "rebateUrl":null,

            "vendorId":null,

            "bopusStore":false,

            "productLine":null,

            "storePickupCSSClass":null,

            "SRElegible":false,

            "configurableSkuMessage":null,

            "shipToHomeCSSClass":null,

            "storePickupLabel":"Store Pick Up",

            "shipToHomeLabel":"Ship To Home",

            "skuId":"319462",

            "highestPrice":0,

            "@class":"com.autozone.diy.commerce.pricing.AZPricingDealsInfo",

            "onlineStockLabel":null,

            "productId":null,

            "rebatesAvaialble":false,

            "shipToHomeStockLabel":"In Stock",

            "skuAddedTocart":false,

            "storePickupAvailable":false,

            "dealAvailable":false,

            "skuUnavailable":false,

            "storePickupStockLabel":"Out of Stock",

            "skuAvailabilityInfo":{

               "unAvailableInStoreAndVdpStore":false,

               "lowestPrice":null,

               "unavailOnlineQoh":false,

               "hubAvail":false,

               "storeAvail":true,

               "availableInOnline":false,

               "webCorePrice":null,

               "availableInVdpOnline":false,

               "shippingAvailabilityMessage":{

                  "eligibleForNextDay":false,

                  "@class":"com.autozone.diy.integration.shipping.ShippingAvailabilityMessage",

                  "inventoryMessage":null,

                  "holiday":false,

                  "cutOffTime":null,

                  "orderByMessage":null,

                  "calculatedDate":null,

                  "carrierHoliday":false,

                  "commerceItemId":null,

                  "qoHAvailable":false,

                  "displayDate":null,

                  "nextDayAvailableMessage":null,

                  "messageCutoffTime":null,

                  "messageDate":null

               },

               "availableInStore":true,

               "storeTotalPrice":"192.99",

               "orderByMessage":null,

               "showSearchAnotherStoreLink":false,

               "storeRetailPrice":"174.99",

               "unAvailableInOnlineAndVdpOnline":true,

               "unavailQoh":true,

               "eligibleForNextDay":false,

               "item":null,

               "@class":"com.autozone.diy.valueobject.SKUAvailabilityPriceInfo",

               "webRetailPrice":null,

               "webTotalPrice":null,

               "availableForDirectShipping":false,

               "exceptionItem":false,

               "storeCorePrice":"18.0",

               "availableInVdpStore":false,

               "messageCutOffTime":null,

               "nextDayAvailableMessage":null,

               "skuid":"319462"

            },

            "estimatedDeliveryMessage":"Not Available",

            "shipToHomeAvailable":false,

            "dealUrl":false,

            "configurableSku":false,

            "retailPrice":174.99,

            "categoryId":null,

            "corePrice":18

        }

      }

    };

  });

 

  test('renders correctly if all data is available', () => {

    PROPS.appData = {"staticLabelData":{"en_US":{

      "pagecontent_cart_corePopup_CoreDetails":"aaa",

      "label_cart_lineItem_Remove":"",

      "label_cart_lineItem_MailInRebateAvailable":"",

      "label_cart_lineItem_PartNo":"",

      "label_cart_lineItem_Location":"",

      "label_cart_lineItem_Warranty":"",

      "label_cart_lineItem_SeeProductNotes":"",

      "label_cart_lineItem_RebateAvailable":"",

      "label_cart_lineItem_Was":"",

      "label_cart_lineItem_Core":"",

      "label_cart_lineItem_WhatIsIt":"",

      "label_cart_lineItem_Fits":"",

      "label_cart_lineItem_SeeProductNotesSmall":"",

      "label_cart_notesOpen_Notes":"",

      "label_cart_notesOpen_Application":"",

      "label_cart_lineItem_Back":"",

      "label_cart_notesOpen_Notes":"",

      "label_cart_notesOpen_Application":""

    }}};

    const wrapper = mount(<Item {...PROPS} />);

    expect(toJson(wrapper)).toMatchSnapshot();

  });

 

  test('renders correctly if some data is unavailable', () => {

    PROPS.data = {

      ...PROPS.data,

      ...{

        productNotes: null,

        vehicleFit: false,

        vehicleDescription: null,

        rebateAvailable: false,

        warrenty: null,

        eligibleForNextDay: false,

        application: null

      }

    };

    const wrapper = mount(<Item {...PROPS} />);

    expect(toJson(wrapper)).toMatchSnapshot();

  });

 

  test('see product notes functionality', () => {

    const wrapper = mount(<Item {...PROPS} />);

    expect(wrapper.state('expanded')).toBe(false);

    wrapper

      .find('.seeProductNotes')

      .at(0)

      .props()

      .onClick();

    expect(wrapper.state('expanded')).toBe(true);

    wrapper

      .find('.seeProductNotes')

      .at(1)

      .props()

      .onClick();

    expect(wrapper.state('expanded')).toBe(false);

  });

 

  test('popup back button works', () => {

    const wrapper = mount(<Item {...PROPS} />);

    wrapper

      .find('.seeProductNotes')

      .at(0)

      .props()

      .onClick();

    expect(wrapper.state('expanded')).toBe(true);

    wrapper.update();

    wrapper

      .find('.backButton')

      .props()

      .onClick();

    expect(wrapper.state('expanded')).toBe(false);

  });

});