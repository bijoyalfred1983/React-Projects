/* @flow */

const gatewayURLTemp =
  JSON.stringify(process.env.GATEWAY_URL) || __GATEWAY_URL__;
const backendURLTemp =
  JSON.stringify(process.env.BACKEND_URL) || __BACKEND_URL__;
const imageServerTemp =
  JSON.stringify(process.env.IMAGE_SERVER_URL) || __IMAGE_SERVER_URL__ || '';

const backendURL =
  typeof window !== 'undefined' ? backendURLTemp : JSON.parse(backendURLTemp);
const gatewayURL =
  typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : JSON.parse(gatewayURLTemp);
const imageServer =
  typeof window !== 'undefined' ? imageServerTemp : JSON.parse(imageServerTemp);
const customerMail = 'customercare@autozone.com';

const relPath = {
  getCatData: '/ecomm/b2c/v1/browse/page/category',
  currentUser: '/ecomm/b2c/v1/currentUser',
  currentUserProfileDetails: '/ecomm/b2c/v1/currentUser/profileDetails',
  requestCredit: '/ecomm/b2c/v1/currentUser/requestCredit',
  currentUserResetPwd: '/ecomm/b2c/v1/currentUser/resetPassword',
  forgotPwd: '/ecomm/b2c/v1/currentUser/forgotPassword',
  homePage: '/ecomm/b2c/v1/page/homePage',
  header: '/ecomm/b2c/v1/page/header',
  staticLabel: '/ecomm/b2c/v1/message/messageContent',
  topNavMenu: '/ecomm/b2c/v1/page/topNavMenu',
  splitContent: '/ecomm/b2c/v1/page/splitContent',
  pdpPageDetails: '/ecomm/b2c/v1/browse/page/product',
  commerceItems: '/ecomm/b2c/v1/cart/commerceItems',
  shelfPageDetails: '/ecomm/b2c/v1/browse/page/leafCategoryDetails',
  ymmeGetYrData: '/ecomm/b2c/v1/ymme/years',
  ymmeGetMakesData: '/ecomm/b2c/v1/ymme/makes',
  ymmeGetModelData: '/ecomm/b2c/v1/ymme/models',
  ymmeGetEngineData: '/ecomm/b2c/v1/ymme/engines',
  ymmeAddVehicle: '/ecomm/b2c/v1/ymme/addVehicle',
  removeDefaultVehicle: '/ecomm/b2c/v1/currentUser/vehicles/defaultVehicle',
  bazaarVoice: '/ecomm/b2c/v1/globalConfigs/siteGlobalConfigs',
  cart: '/ecomm/b2c/v1/shoppingCart/cartDetails',
  miniCart: '/ecomm/b2c/v1/shoppingCart/miniCart',
  cartOrderSummary: '/ecomm/b2c/v1/shoppingCart/orderSummary',
  checkoutDetails: '/ecomm/b2c/v1/checkout/page/checkoutDetails',
  shippingAddress: '/ecomm/b2c/v1/checkout/shippingAddress',
  updateDeliveryMethod: '/ecomm/b2c/v1/checkout/updateDeliveryMethod',
  commitOrder: '/ecomm/b2c/v1/checkout/commitOrder',
  quantityCart: '/ecomm/b2c/v1/shoppingCart/commerceItem',
  swapPickUp: '/ecomm/b2c/v1/shoppingCart/swapCommerceItem',
  verifyOrderCheckout: '/ecomm/b2c/v1/cart/verifyOrderForCheckout',
  promoCodeApply: '/ecomm/b2c/v1/coupons/claimCoupon',
  promoCodeRemove: '/ecomm/b2c/v1/coupons/revokeCoupon',
  preferredStore: '/ecomm/b2c/v1/store/preferredStore',
  findNearByStores: '/ecomm/b2c/v1/store/sisterStores',
  getMyVehicle: '/ecomm/b2c/v1/currentUser/vehicles',
  addServiceHistory: '/ecomm/b2c/v1/currentUser/vehicles/serviceHistory',
  vehicleRepairGuide: '/ecomm/b2c/v1/currentUser/vehicleRepairGuide',
  repairGuideChapterInfo: '/ecomm/b2c/v1/currentUser/repairGuideChapterInfo',
  dealNextStep: '/ecomm/b2c/v1/deals/dealMaker/dealNextStep',
  dealMaker: '/ecomm/b2c/v1/deals/dealMaker',
  onlineDealNextStep: '/ecomm/b2c/v1/deals/onlineOnlyDealMaker/dealNextStep',
  onlineDealMaker: '/ecomm/b2c/v1/deals/onlineOnlyDealMaker',
  createFormQaAPI:
    '/auth/oauth/v2/authorize?client_id=l7xx85b096d1f8c3426cb3ed7724c7863444&response_type=code&redirect_uri=https://example.com&scope=ecommb2c',
  myAccQaAPI:
    '/auth/oauth/v2/authorize?client_id=l7xx85b096d1f8c3426cb3ed7724c7863444&response_type=code&redirect_uri=https://example.com&scope=ecommb2c',
  sideNavMobQaAPI:
    '/auth/oauth/v2/authorize?client_id=l7xx85b096d1f8c3426cb3ed7724c7863444&response_type=code&redirect_uri=https://example.com&scope=ecommb2c',
  yextGeoSearch: '/locations/geosearch',
  srValidation: '/ecomm/b2c/v1/shoprunner/validateSRToken',
  orderConfirmation: '/ecomm/b2c/v1/checkout/page/orderConfirmation',
  orderHistory: '/ecomm/b2c/v1/order/orderHistory',
  paypalLookup: '/ecomm/b2c/v1/checkout/paypal/lookup',
  paypalAuth: '/ecomm/b2c/v1/checkout/paypal/authenticate',
  updatePreferredVehicle: '/ecomm/b2c/v1/ymme/updatePreferredVehicle',
  search: '/ecomm/b2c/v1/searchresult',
  searchFilter: '/ecomm/b2c/v1',
  orderDetails: '/ecomm/b2c/v1/order/orderDetails',
  rewards: '/ecomm/b2c/v1/checkout/payments/rewards',
  rewardsPage: 'ecomm/b2c/v1/currentUser/rewards',
  signOut: '/ecomm/b2c/v1/currentUser/logout',
  suggestions: '/ecomm/b2c/v1/typeahead',
  addEditMileage: '/ecomm/b2c/v1/currentUser/vehicles',
  states: '/ecomm/b2c/v1/utility/states',
  maintenanceIntervalParent: '/ecomm/b2c/v1/currentUser/vehicles',
  dealshomePage: '/ecomm/b2c/v1/deals/hotDeal',
  maintenanceIntervalChild: 'maintenanceInterval',
  contactUs: '/ecomm/b2c/v1/currentUser/contactUs',
  dealsRebatesURL: '/ecomm/b2c/v1/rebates/storeRebates',
  shopByCategory: '/ecomm/b2c/v1/deals/shopDealsByCategory',
  dealsProductDetail: '/ecomm/b2c/v1/deals/dealMaker/dealItemQuickView',
  trackOrder: '/ecomm/b2c/v1/order/track',
  personalizedContentBlock: '/ecomm/b2c/v1/page/personalizedContentBlocks',
  quickSubscribe: '/ecomm/b2c/v1/currentUser/quickSubscription'
};

const yextbackendURL = 'https://liveapi.yext.com/v2/accounts/';
const yextAccountID = 'me';
const yextAPIKey = 'd9fff9a11b6a73631536994d83b5f562';
const yextCompleteURL = (key: string) =>
  yextbackendURL + yextAccountID + relPath[key];
const DEFAULT_STORE_NUMBER = '9801';
const paypalCheckoutTermURL = `${gatewayURL}/checkoutpaypalauth`;
const paypalCartTermURL = `${gatewayURL}/cartpaypalauth`;

export {
  backendURL,
  imageServer,
  yextCompleteURL,
  yextAPIKey,
  paypalCheckoutTermURL,
  paypalCartTermURL,
  DEFAULT_STORE_NUMBER,
  customerMail
};

export default (key: string) => gatewayURL + relPath[key];
