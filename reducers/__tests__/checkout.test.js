import checkout from '../checkout';

describe('checkout reducer', () => {
  const checkoutData = {
    paymentMethodInfo: {
      '@class': 'com.autozone.diy.vo.AZPaymentOptionsVO',
      creditCardEnabled: true,
      giftcertificateEnabled: false,
      rewardsRedeemEnabled: false,
      payPalEnabled: true,
      storeCreditEnabled: false
    },
    '@class': 'com.autozone.diy.vo.AZCheckoutDetailsResponseVO',
    orderSummaryVO: {
      itemSubtotal: 1349.93,
      orderSubtotal: 1349.93,
      '@class': 'com.autozone.diy.vo.AZOrdersSummaryVO',
      shipping: 0,
      coreDeposit: 0,
      taxes: 0,
      totalSavings: 0
    },
    lineItemsListVO: {
      '@class': 'com.autozone.diy.vo.AZLineItemsListVO',
      lineItemsList: [
        {
          storeItem: false,
          rawTotalPrice: 89.99,
          estDeliveryTime: 'Est. Delivery: Mar  28-29',
          displayName: 'Coverking/Floor Mat',
          availability: null,
          commerceItemId: 'ci540000499',
          techNotes: null,
          productNotes: null,
          vehicleFit: false,
          imageURL:
            'https://contentinfo.autozone.com/znetcs/product-info/en/US/dsk/DG9211-M2/image/1/',
          onSale: true,
          rebateAvailable: false,
          warrenty: null,
          discounted: false,
          eligibleForNextDay: false,
          amount: 89,
          '@class': 'com.autozone.diy.vo.AZLineItemsVO',
          quantity: 1,
          salePrice: 6.24,
          dealAvailable: false,
          catalogRefId: '377780',
          application: '',
          unitAmount: 89.99,
          location: null,
          partNumber: 'DG9211-M2',
          quickNote: '425 Cold cranking Amps (530 cranking Amps)',
          currencyCode: 'USD',
          listPrice: 89.99,
          corePrice: 0,
          productURL:
            '/external-engine/spark-plug/autolite-xp-iridium-spark-plug/942338_296179_0_186484/'
        },
        {
          storeItem: false,
          rawTotalPrice: 89.99,
          estDeliveryTime: 'Est. Delivery: Mar  28-29',
          displayName: 'Coverking/Floor Mat',
          availability: null,
          commerceItemId: 'ci5400004992',
          techNotes: null,
          productNotes: null,
          vehicleFit: false,
          imageURL:
            'https://contentinfo.autozone.com/znetcs/product-info/en/US/dsk/DG9211-M2/image/1/',
          onSale: true,
          rebateAvailable: false,
          warrenty: null,
          discounted: false,
          eligibleForNextDay: false,
          amount: 89.99,
          '@class': 'com.autozone.diy.vo.AZLineItemsVO',
          quantity: 1,
          salePrice: 6.24,
          dealAvailable: false,
          catalogRefId: '377780',
          application: '',
          unitAmount: 89.99,
          location: null,
          partNumber: 'DG9211-M2',
          quickNote: '425 Cold cranking Amps (530 cranking Amps)',
          currencyCode: 'USD',
          listPrice: 89.99,
          corePrice: 0,
          productURL:
            '/external-engine/spark-plug/autolite-xp-iridium-spark-plug/942338_296179_0_186484/'
        },
        {
          storeItem: false,
          rawTotalPrice: 89.99,
          estDeliveryTime: 'Est. Delivery: Mar  28-29',
          displayName: 'Coverking/Floor Mat',
          availability: null,
          commerceItemId: 'ci5400004993',
          techNotes: null,
          productNotes: null,
          vehicleFit: false,
          imageURL:
            'https://contentinfo.autozone.com/znetcs/product-info/en/US/dsk/DG9211-M2/image/1/',
          onSale: true,
          rebateAvailable: false,
          warrenty: null,
          discounted: false,
          eligibleForNextDay: false,
          amount: 89.99,
          '@class': 'com.autozone.diy.vo.AZLineItemsVO',
          quantity: 1,
          salePrice: 6.24,
          dealAvailable: false,
          catalogRefId: '377780',
          application: '',
          unitAmount: 89.99,
          location: null,
          partNumber: 'DG9211-M2',
          quickNote: '425 Cold cranking Amps (530 cranking Amps)',
          currencyCode: 'USD',
          listPrice: 89.99,
          corePrice: 0,
          productURL:
            '/external-engine/spark-plug/autolite-xp-iridium-spark-plug/942338_296179_0_186484/'
        },
        {
          storeItem: false,
          rawTotalPrice: 89.99,
          estDeliveryTime: 'Est. Delivery: Mar  28-29',
          displayName: 'Coverking/Floor Mat',
          availability: null,
          commerceItemId: 'ci5400004994',
          techNotes: null,
          productNotes: null,
          vehicleFit: false,
          imageURL:
            'https://contentinfo.autozone.com/znetcs/product-info/en/US/dsk/DG9211-M2/image/1/',
          onSale: false,
          rebateAvailable: false,
          warrenty: null,
          discounted: false,
          eligibleForNextDay: false,
          amount: 89.99,
          '@class': 'com.autozone.diy.vo.AZLineItemsVO',
          quantity: 1,
          salePrice: 0,
          dealAvailable: false,
          catalogRefId: '377780',
          application: '',
          unitAmount: 89.99,
          location: null,
          partNumber: 'DG9211-M2',
          quickNote: '425 Cold cranking Amps (530 cranking Amps)',
          currencyCode: 'USD',
          listPrice: 89.99,
          corePrice: 0,
          productURL:
            '/external-engine/spark-plug/autolite-xp-iridium-spark-plug/942338_296179_0_186484/'
        },
        {
          storeItem: true,
          rawTotalPrice: 1259.94,
          estDeliveryTime: 'Est. Delivery: Feb  08-09',
          displayName: 'Duralast Platinum / Battery',
          availability: null,
          commerceItemId: 'ci312000024',
          techNotes: null,
          productNotes: null,
          vehicleFit: true,
          vehicleDescription: '2016 Chevrolet Silverado 1500',
          imageURL:
            'https://contentinfo.autozone.com/znetcs/product-info/en/US/jci/65-AGM/image/1/',
          onSale: true,
          rebateAvailable: false,
          warrenty: null,
          discounted: false,
          eligibleForNextDay: false,
          amount: 1259.94,
          '@class': 'com.autozone.diy.vo.AZLineItemsVO',
          quantity: 6,
          salePrice: 6.35,
          dealAvailable: false,
          catalogRefId: '319465',
          application: null,
          unitAmount: 209.99,
          location: null,
          partNumber: '65-AGM',
          quickNote: '',
          currencyCode: 'USD',
          listPrice: 209.99,
          corePrice: 0,
          productURL:
            '/external-engine/spark-plug/autolite-xp-iridium-spark-plug/942338_296179_0_186484/'
        }
      ]
    },
    shippingAddress: {
      firstName: null,
      lastName: null,
      '@class': 'com.autozone.diy.vo.AZShippingAddressVO',
      phoneNumber: '',
      address2: '',
      city: '',
      address1: '',
      postalCode: '',
      state: '',
      email: null
    },
    storeDetails: {
      zip: '381047143',
      storeNumber: '117',
      '@class': 'com.autozone.diy.vo.AZStoreDetailsVO',
      address2: 'NULL',
      city: 'Memphis',
      address1: '385 N Cleveland St',
      latitude: 35.149151,
      active: true,
      open24Hours: false,
      storeFullHours: {
        WEDNESDAY: {
          close: '10:00:00 PM',
          open: '07:30:00 AM'
        },
        MONDAY: {
          close: '10:00:00 PM',
          open: '07:30:00 AM'
        },
        THURSDAY: {
          close: '10:00:00 PM',
          open: '07:30:00 AM'
        },
        SUNDAY: {
          close: '10:00:00 PM',
          open: '07:30:00 AM'
        },
        TUESDAY: {
          close: '10:00:00 PM',
          open: '07:30:00 AM'
        },
        FRIDAY: {
          close: '10:00:00 PM',
          open: '07:30:00 AM'
        },
        SATURDAY: {
          close: '10:00:00 PM',
          open: '07:30:00 AM'
        }
      },
      nextTransitionDateTime: '03/12/2018 10:00:00 PM',
      phoneNumber: '9012781437',
      currentTimeZoneDateTime: '03/12/2018 09:21:53 AM',
      openedNow: true,
      state: 'TN',
      longitude: -90.014338
    },
    billingAddress: {
      firstName: null,
      lastName: null,
      '@class': 'com.autozone.diy.vo.AZBillingAddressVO',
      phoneNumber: '',
      address2: '',
      city: '',
      address1: '',
      postalCode: '',
      state: '',
      email: null
    },
    shippingMethods: {
      '@class': 'com.autozone.diy.vo.AZShippingMethodsVO',
      regularShippingMethods: [],
      nextDayShippingMethods: [],
      shoprunnerShippingMethods: []
    }
  };
  const orderSummaryVO = {
    itemSubtotal: 1349.93,
    orderSubtotal: 1349.93,
    '@class': 'com.autozone.diy.vo.AZOrdersSummaryVO',
    shipping: 0,
    coreDeposit: 0,
    taxes: 0,
    totalSavings: 0
  };

  const fedExData = {
    suggestedAddress: null,
    '@class': 'com.autozone.diy.vo.AZShippingBillingAddressVO',
    shopRunnerDetails: {
      '@class': 'com.autozone.diy.vo.AZShopRunnerVO',
      itemsEligibleForSR: false,
      srAuthenticatedUser: false,
      srMaxDate: 'Apr  03',
      shippingAddressEligibleForSR: false,
      eligibleForShopRunner: false,
      srMinDate: 'Apr  02'
    },
    orderSummary: {
      itemSubtotal: 209.99,
      additionalInformation: false,
      orderSubtotal: 263.26,
      '@class': 'com.autozone.diy.vo.AZOrdersSummaryVO',
      shipping: 0,
      coreDeposit: 35,
      taxes: 18.27,
      applyCouponServiceUrl: null,
      totalSavings: 0
    },
    shippingMethods: {
      '@class': 'com.autozone.diy.vo.AZShippingMethodsVO',
      regularShippingMethods: [
        {
          discounted: true,
          shopRunnerEligible: false,
          amount: 11.4,
          '@class': 'com.autozone.diy.integration.shipping.AZShippingMethod',
          shippingMethod: 'Ground (3-5 business days)',
          errorMessage: null,
          shippingMethodName: 'Ground',
          shippingMethodId: 'sg21240041:Ground',
          amountAfterDiscount: 0,
          hasAllNextDay: false,
          nextDayEligible: false,
          shippingMethodETA: 'Est. Delivery: Apr  04-05',
          regular: true,
          selected: true
        },
        {
          discounted: false,
          shopRunnerEligible: false,
          amount: 29.2,
          '@class': 'com.autozone.diy.integration.shipping.AZShippingMethod',
          shippingMethod: 'Rush (2 business days)',
          errorMessage: null,
          shippingMethodName: 'Rush',
          shippingMethodId: 'sg21240041:Rush',
          amountAfterDiscount: 0,
          hasAllNextDay: false,
          nextDayEligible: false,
          shippingMethodETA: 'Est. Delivery: Apr  03',
          regular: true,
          selected: false
        },
        {
          discounted: false,
          shopRunnerEligible: false,
          amount: 56.99,
          '@class': 'com.autozone.diy.integration.shipping.AZShippingMethod',
          shippingMethod: 'Express (1 business day)',
          errorMessage: null,
          shippingMethodName: 'Express',
          shippingMethodId: 'sg21240041:Express',
          amountAfterDiscount: 0,
          hasAllNextDay: false,
          nextDayEligible: false,
          shippingMethodETA: 'Est. Delivery: Apr  02',
          regular: true,
          selected: false
        }
      ],
      nextDayShippingMethods: [],
      shoprunnerShippingMethods: []
    }
  };

  test('should return the initial state for checkout data', () => {
    expect(checkout(undefined, {})).toEqual({
      readyStatus: 'CHECKOUT_INVALID',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      orderSummary: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle CHECKOUT_REQUESTING', () => {
    expect(
      checkout(undefined, {
        type: 'CHECKOUT_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_REQUESTING',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      orderSummary: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle SET_VIEW', () => {
    expect(
      checkout(undefined, {
        type: 'SET_LAYOUT',
        layout: 'PAYPAL'
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_SUCCESS',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'PAYPAL',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      orderSummary: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle CHECKOUT_SUCCESS', () => {
    expect(
      checkout(undefined, {
        type: 'CHECKOUT_SUCCESS',
        data: checkoutData
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_SUCCESS',
      err: null,
      cartData: {},
      checkOutData: checkoutData,
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: checkoutData.shopRunnerDetails,
      orderSummary: checkoutData.orderSummaryVO,
      shippingMethods: checkoutData.shippingMethods,
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle CHECKOUT_FAILURE', () => {
    expect(
      checkout(undefined, {
        type: 'CHECKOUT_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_FAILURE',
      err: 'Oops! Something went wrong.',
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      orderSummary: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle UPDATE_DELIVERY_SUCCESS', () => {
    expect(
      checkout(undefined, {
        type: 'UPDATE_DELIVERY_SUCCESS',
        data: orderSummaryVO
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_SUCCESS',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle UPDATE_DELIVERY_FAILURE', () => {
    expect(
      checkout(undefined, {
        type: 'UPDATE_DELIVERY_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'UPDATE_DELIVERY_FAILURE',
      err: 'Oops! Something went wrong.',
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      orderSummary: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle SET_CARD_TYPE', () => {
    expect(
      checkout(undefined, {
        type: 'SET_CARD_TYPE',
        data: 'visa'
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_SUCCESS',
      err: null,
      cartData: {},
      cardType: 'visa',
      checkOutData: {},
      paymentLayout: 'CARD',
      orderSummary: {},
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle LOAD_FORM_DATA', () => {
    expect(
      checkout(undefined, {
        type: 'LOAD_FORM_DATA',
        layout: 'PAYPAL'
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_SUCCESS',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'PAYPAL',
      orderSummary: {},
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle FEDX_VALIDATION_SUCCESS', () => {
    expect(
      checkout(undefined, {
        type: 'FEDX_VALIDATION_SUCCESS',
        data: fedExData,
        enteredAddress: {}
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_SUCCESS',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: fedExData,
      fedExValidated: true,
      formValueAdded: false,
      shopRunnerDetails: fedExData.shopRunnerDetails,
      orderSummary: fedExData.orderSummary,
      shippingMethods: fedExData.shippingMethods,
      fedExError: `  Unfortunately, the shipping address you entered is not eligible for ShopRunner shipping. To complete your order: Change your shipping address AND Click Checkout to continue with AutoZone shipping.`,
      isAddressError: true,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle FEDX_VALIDATION_FAILURE', () => {
    expect(
      checkout(undefined, {
        type: 'FEDX_VALIDATION_FAILURE',
        err:{ response: { data: {title: 'Oops! Something went wrong.'}}}
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_INVALID',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      orderSummary: {},
      shippingMethods: {},
      fedExError: 'Oops! Something went wrong.',
      isAddressError: true,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle SET_FORM_DATA', () => {
    expect(
      checkout(undefined, {
        type: 'SET_FORM_DATA',
        addressForm: {firstName:'Mallappa'}
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_SUCCESS',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      orderSummary: {},
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: true,
      shopRunnerDetails: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      formValues:{firstName:'Mallappa'},
      form: {AddressFormValues:{firstName:'Mallappa'}},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle SRVALIDATION_SUCCESS', () => {
    expect(
      checkout(undefined, {
        type: 'SRVALIDATION_SUCCESS'
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_SUCCESS',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      orderSummary: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle CHECKOUT_PROMO_UPDATE_SUCCESS', () => {
    expect(
      checkout(undefined, {
        type: 'CHECKOUT_PROMO_UPDATE_SUCCESS',
        data: orderSummaryVO
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_PROMO_UPDATE_SUCCESS',
      err: null,
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      orderSummary: orderSummaryVO,
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

  test('should handle CHECKOUT_PROMO_UPDATE_FAILURE', () => {
    expect(
      checkout(undefined, {
        type: 'CHECKOUT_PROMO_UPDATE_FAILURE',
        err: 'Oops! Something went wrong.'
      })
    ).toEqual({
      readyStatus: 'CHECKOUT_PROMO_UPDATE_FAILURE',
      err: 'Oops! Something went wrong.',
      cartData: {},
      checkOutData: {},
      paymentLayout: 'CARD',
      fedExDetails: {},
      fedExValidated: false,
      formValueAdded: false,
      shopRunnerDetails: {},
      orderSummary: {},
      shippingMethods: {},
      fedExError: '',
      isAddressError: false,
      enteredAddress: {},
      form: {},
      BillingFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      },
      AddressFormValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Address1: '',
        Address2: '',
        zipCode: '',
        state: ''
      }
    });
  });

});
