import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchCheckOutDetails, setLayout, validateAddress, shoprunnerTokenValidation, setDeliveryOption, SetCardType } from '../checkout';
import azURL from '../../config/serviceAPI';

jest.mock('../../config/serviceAPI');
const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('checkout action', () => {
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
	      }]
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

	const srData = {
		suggestedAddress: null,
		'@class': 'com.autozone.diy.vo.AZShippingBillingAddressVO',
		shopRunnerDetails: {
			'@class': 'com.autozone.diy.vo.AZShopRunnerVO',
			itemsEligibleForSR: true,
			srAuthenticatedUser: false,
			srMaxDate: 'Apr  25',
			shippingAddressEligibleForSR: true,
			eligibleForShopRunner: true,
			srMinDate: 'Apr  24'
		},
		orderSummary: {
			itemSubtotal: 166.99,
			additionalInformation: false,
			orderSubtotal: 199.44,
			'@class': 'com.autozone.diy.vo.AZOrdersSummaryVO',
			shipping: 0,
			couponVOList: {
				'@class': 'com.autozone.diy.vo.AZCouponVO',
				couponList: [
					{
						'@class': 'com.autozone.diy.vo.AZCouponResponseVO',
						applied: false,
						response: 'failure',
						errorMessage: null,
						name: null,
						description: null,
						id: null,
						removeEndurl: null
					}
				]
			},
			coreDeposit: 17,
			taxes: 15.45,
			applyCouponServiceUrl: null,
			totalSavings: 0
		},
		shippingMethods: {
			'@class': 'com.autozone.diy.vo.AZShippingMethodsVO',
			regularShippingMethods: [
				{
					discounted: true,
					shopRunnerEligible: false,
					amount: 7.75,
					'@class': 'com.autozone.diy.integration.shipping.AZShippingMethod',
					shippingMethod: 'Ground (3-5 business days)',
					errorMessage: null,
					shippingMethodName: 'Ground',
					shippingMethodId: 'sg23920032:Ground',
					amountAfterDiscount: 0,
					hasAllNextDay: false,
					nextDayEligible: false,
					shippingMethodETA: 'Est. Delivery: Apr  25-26',
					regular: true,
					selected: true
				},
				{
					discounted: false,
					shopRunnerEligible: false,
					amount: 30.44,
					'@class': 'com.autozone.diy.integration.shipping.AZShippingMethod',
					shippingMethod: 'Rush (2 business days)',
					errorMessage: null,
					shippingMethodName: 'Rush',
					shippingMethodId: 'sg23920032:Rush',
					amountAfterDiscount: 0,
					hasAllNextDay: false,
					nextDayEligible: false,
					shippingMethodETA: 'Est. Delivery: Apr  24',
					regular: true,
					selected: false
				},
				{
					discounted: false,
					shopRunnerEligible: false,
					amount: 59.74,
					'@class': 'com.autozone.diy.integration.shipping.AZShippingMethod',
					shippingMethod: 'Express (1 business day)',
					errorMessage: null,
					shippingMethodName: 'Express',
					shippingMethodId: 'sg23920032:Express',
					amountAfterDiscount: 0,
					hasAllNextDay: false,
					nextDayEligible: false,
					shippingMethodETA: 'Est. Delivery: Apr  20-23',
					regular: true,
					selected: false
				}
			],
			nextDayShippingMethods: [],
			shoprunnerShippingMethods: []
		}
	};
	const address = {
		actionType: 'shippingBilling',
		address1: '123 South Front St',
		address2: '',
		city: 'Memphis',
		email: 'guest@autozone.com',
		firstName: 'Caverri',
		lastName: 'Lakshmanan',
		phoneNumber: '2018393454',
		postalCode: '38103',
		state: 'TN'
	};

const errorMessage = 'Request failed with status code 404';
  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates CHECKOUT_SUCCESS when fetching checkoutDetails data has been done', () => {
    nock(host)
      .get(azURL('checkoutDetails'))
      .reply(200, checkoutData);

    const expectedActions = [
      { type: 'CHECKOUT_REQUESTING' },
      { type: 'CHECKOUT_SUCCESS', data: checkoutData }
    ];
    const initialState = {
      readyStatus: 'CHECKOUT_INVALID',
      err: null,
      checkOutData: {},
      paymentLayout: 'CARD'
    };
    const store = mockStore(initialState);

    return store.dispatch(fetchCheckOutDetails(axios)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

    test('creates CHECKOUT_FAILURE when fetching checkoutDetails data has been done', () => {
      nock(host)
        .get(azURL('checkoutDetails'))
        .replyWithError(errorMessage);

      const expectedActions = [
        { type: 'CHECKOUT_REQUESTING' },
        { type: 'CHECKOUT_FAILURE',  err: errorMessage  }
      ];
      const initialState = {
        readyStatus: 'CHECKOUT_INVALID',
        err: null,
        checkOutData: {},
        paymentLayout: 'CARD'
      };
      const store = mockStore(initialState);

      return store.dispatch(fetchCheckOutDetails(axios)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
	});
	
	test('creates FEDX_VALIDATION_SUCCESS when User entred Address', () => {
    nock(host)
      .post(azURL('shippingAddress'), address)
      .reply(200, srData);

    const expectedActions = [
      { type: 'FEDX_VALIDATION_SUCCESS', data: srData, enteredAddress: address }
    ];
    const initialState = {
      readyStatus: 'CHECKOUT_INVALID',
      err: null,
      checkOutData: {},
      paymentLayout: 'CARD'
		};
		
    const store = mockStore(initialState);

    return store.dispatch(validateAddress(axios, address)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
	});
	let errorMessages = [Error: "Request failed with status code 404"] ;
	test('creates CHECKOUT_FAILURE when fetching checkoutDetails data has been done', () => {
		
		nock(host)
			.post(azURL('shippingAddress'), address)
			.replyWithError(errorMessages);

		const expectedActions = [
			{ type: 'FEDX_VALIDATION_FAILURE',  err: errorMessages  }
		];
		const initialState = {
			readyStatus: 'CHECKOUT_INVALID',
			err: null,
			checkOutData: {},
			paymentLayout: 'CARD'
		};
		const store = mockStore(initialState);

		return store.dispatch(validateAddress(axios, address)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
});

const srResponse = {success:true, links:[]};
const srRequeest = {action:"srSignIn", sr_token:"6cf258420f0f3e2e999193f80ec48bfa"};
// const srRequeest = '6cf258420f0f3e2e999193f80ec48bfa';
test('creates SRVALIDATION_SUCCESS when User entred Address', () => {
	nock(host)
		.post(azURL('srValidation'), srRequeest)
		.reply(200, srResponse);

	const expectedActions = [
		{ type: 'SRVALIDATION_SUCCESS', data: srResponse }
	];
	const initialState = {
		readyStatus: 'CHECKOUT_INVALID',
		err: null,
		checkOutData: {},
		paymentLayout: 'CARD'
	};
	
	const store = mockStore(initialState);
const token = "6cf258420f0f3e2e999193f80ec48bfa";
	return store.dispatch(shoprunnerTokenValidation(axios, token)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});
let erMessage = [Error: "Request failed with status code 404"] ;
test('creates SRVALIDATION_FAILURE when fetching checkoutDetails data has been done', () => {
	
	nock(host)
		.post(azURL('srValidation'), srRequeest)
		.replyWithError(erMessage);

	const expectedActions = [
		{ type: 'SRVALIDATION_FAILURE',  err: undefined  }
	];
	const initialState = {
		readyStatus: 'CHECKOUT_INVALID',
		err: null,
		checkOutData: {},
		paymentLayout: 'CARD'
	};
	const store = mockStore(initialState);
	const token = "6cf258420f0f3e2e999193f80ec48bfa";

	return store.dispatch(shoprunnerTokenValidation(axios, token)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});



const deliveryResponse = {
  '@class': 'com.autozone.diy.vo.AZUpdateShippingDeliveryResponseVO',
  selectedDeliveryMethod: 'sg23920066:Express',
  orderSummary: {
    itemSubtotal: 166.99,
    additionalInformation: false,
    orderSubtotal: 204.89000000000001,
    '@class': 'com.autozone.diy.vo.AZOrdersSummaryVO',
    shipping: 4.99,
    couponVOList: {
      '@class': 'com.autozone.diy.vo.AZCouponVO',
      couponList: [
        {
          '@class': 'com.autozone.diy.vo.AZCouponResponseVO',
          applied: false,
          response: 'failure',
          errorMessage: null,
          name: null,
          description: null,
          id: null,
          removeEndurl: null
        }
      ]
    },
    coreDeposit: 17,
    taxes: 15.91,
    applyCouponServiceUrl: null,
    totalSavings: 0
  }
};

const deliveryRequeest = {shippingMethodSelected: "sg23920066:Express"};
test('creates UPDATE_DELIVERY_SUCCESS when User updated Delivery options', () => {
	nock(host)
		.post(azURL('updateDeliveryMethod'), deliveryRequeest)
		.reply(200, deliveryResponse);

	const expectedActions = [
		{ type: 'UPDATE_DELIVERY_SUCCESS', data: deliveryResponse }
	];
	const initialState = {
		readyStatus: 'CHECKOUT_INVALID',
		err: null,
		checkOutData: {},
		paymentLayout: 'CARD'
	};
	
	const store = mockStore(initialState);
const shippingMethodSelected =  "sg23920066:Express";
	return store.dispatch(setDeliveryOption(axios, shippingMethodSelected)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});
let erMessages = [Error: "Request failed with status code 404"] ;
test('creates UPDATE_DELIVERY_FAILURE when User updated Delivery options', () => {
	
	nock(host)
		.post(azURL('updateDeliveryMethod'), deliveryRequeest)
		.replyWithError(erMessages);

	const expectedActions = [
		{ type: 'UPDATE_DELIVERY_FAILURE',  err: erMessages  }
	];
	const initialState = {
		readyStatus: 'CHECKOUT_INVALID',
		err: null,
		checkOutData: {},
		paymentLayout: 'CARD'
	};
	const store = mockStore(initialState);
	const shippingMethodSelected = "sg23920066:Express";

	return store.dispatch(setDeliveryOption(axios, shippingMethodSelected)).then(() => {
		expect(store.getActions()).toEqual(expectedActions);
	});
});

});



describe('setLayout', () => {
  test('check the actions for setLayout', () => {
    const layout = 'PAYPAL';
    const expectedActions = [{ type: 'SET_LAYOUT', layout }];
    const store = mockStore({ checkoutData: {} });
    store.dispatch(setLayout(layout));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('SetCardType', () => {
  test('check the actions for SetCardType', () => {
    const card = 'visa';
    const expectedActions = [{ type: 'SET_CARD_TYPE', data:card }];
    const store = mockStore({ checkoutData: {} });
    store.dispatch(SetCardType(card));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
