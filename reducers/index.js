/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import home from './home';
import userInfo from './userInfo';
import navInfo from './navInfo';
import subMenuData from './subMenuReducer';
import formInfo from './createAccount';
import ymmeData from './ymme';
import bazaarVoice from './bazaarVoice';
import forgotFormData from './forgotPassword';
import resetFormData from './resetPassword';
import heroContentData from './heroContentData';
import topNavData from './topNav';
import { category, subCategory } from './category';
import shelf from './shelf';
import price from './price';
import productData from './productDetails';
import appData from './app';
import cart from './cart';
import orderSummary from './orderSummary';
import checkout from './checkout';
import complete from './complete';
import cartUpdate from './cartUpdate';
import header from './header';
import completePurchase from './completePurchase';
import store from './store';
import routing from './routing';
import orderConfirmation from './orderConfirmation';
import orderHistory from './orderHistory';
import myVehicle from './myVehicle';
import preferredStore from './preferredStore';
import paypal from './paypal';
import search from './search';
import orderDetails from './orderDetails';
import myProfile from './myProfile';
import rewardsData from './rewardsReducer';
import scroll from './scroll';
import recalls from './recalls';
import addEditMileage from './addEditMileage';
import serviceHistory from './serviceHistory';
import maintenanceIntervals from './maintenanceIntervals';
import deals from './deals';
import repairGuides from './repairGuides';
import contactUs from './contactUs';
import dealsMaker from './dealsMaker';
import dealsProductDetails from './dealsProductDetails';
import trackOrder from './trackOrder';
import requestCredit from './requestCredit';
import rewardsPage from './rewards';
import userContent from './userSpecificContent';

const reducers = {
  appData,
  home,
  userInfo,
  router,
  routing,
  navInfo,
  subMenuData,
  formInfo,
  completePurchase,
  complete,
  forgotFormData,
  resetFormData,
  heroContentData,
  form: reduxFormReducer,
  topNavData,
  category,
  subCategory,
  cartUpdate,
  ymmeData,
  bazaarVoice,
  shelf,
  price,
  productData,
  cart,
  orderSummary,
  checkout,
  header,
  store,
  orderConfirmation,
  myVehicle,
  orderHistory,
  preferredStore,
  paypal,
  orderDetails,
  search,
  myProfile,
  rewardsData,
  rewardsPage,
  scroll,
  recalls,
  addEditMileage,
  serviceHistory,
  maintenanceIntervals,
  deals,
  repairGuides,
  contactUs,
  dealsMaker,
  dealsProductDetails,
  trackOrder,
  requestCredit,
  userContent
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);
