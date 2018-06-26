/* @flow */
/* eslint-disable no-use-before-define */

import type { Store as ReduxStore } from 'redux';

import type { Reducers } from '../reducers';

// Reducers
export type Home = {
  +readyStatus: string,
  +err: any,
  +list: Array<Object>
};

export type UserInfo = {
  +[userId: string]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};

export type NavInfo = {
  +[title: string]: {
    +readyStatus: string,
    +err: any,
    +info: Object
  }
};

export type CreateAccountData = {
  +readyStatus: string,
  +err: any,
  +viewInfo: Object
};

export type submitForm = {
  +readyStatus: string,
  +err: any,
  +defaultFormData: Object,
  +SubmitStatus: boolean
};

export type ForgotData = {
  +readyStatus: string,
  +err: any,
  +viewInfo: Object
};

export type SubmitForgotForm = {
  +readyStatus: string,
  +err: any,
  +formValues: Object
};

export type ResetFormData = {
  +readyStatus: string,
  +err: any,
  +viewInfo: Object
};

export type ResetForgotForm = {
  +readyStatus: string,
  +err: any,
  +formValues: Object
};

export type subMenuData = {
  +readyStatus: string,
  +err: any,
  +list: any,
  +headingL1: any
};

export type HeroContentData = {
  +readyStatus: string,
  +err: any,
  +viewInfo: Object
};

export type CategoryData = {
  +readyStatus: string,
  +err: any,
  +catData: Object
};

export type SubCategoryData = {
  +readyStatus: string,
  +err: any,
  +subCatData: Object
};

export type SplitContentData = {
  +readyStatus: string,
  +err: any,
  +viewInfo: Object
};

export type ProductData = {
  +readyStatus: string,
  +err: any,
  +viewInfo: Object,
  +cartItemsPDP: Array
};

export type PaypalData = {
  +readyStatus: string,
  +err: any,
  +data: Object
};

export type rewardsPageData = {
  +readyStatus: string,
  +err: any,
  +data: Object
};

export type DealProductData = {
  +readyStatus: string,
  +err: any,
  +viewInfo: Object
};

export type ShelfData = {
  +readyStatus: string,
  +isList: boolean,
  +parts: Object,
  +price: any,
  +skuIds: Array<number>,
  +relatedParts: Object,
  +relatedProducts: Object,
  +cartItems: Array
};

export type TopNavData = {
  +readyStatus: string,
  +err: any,
  +subCatData: Object,
  +level1: Object,
  +level2MostPop: Object,
  +headingL1: any,
  +level2: Object,
  +headingL2: any,
  +level2Data: Object,
  +subPath: string
};

export type YMMEDataType = {
  +readyStatus: string,
  +err: any,
  +data: any
};

export type BVDataType = {
  +readyStatus: string,
  +err: any,
  +bvConfig: Object
};

export type AppData = {
  +isHeaderPresent: boolean,
  +isFooterPresent: boolean,
  +userAuthenticated: boolean
};

export type CartData = {
  +readyStatus: string,
  +err: any,
  +cartData: Object,
  +orderSummaryData: Object,
  +removeData: Object,
  +checkOutData: Object,
  +paymentLayout: string,
  +fedExDetails: Object,
  +fedExValidated: boolean,
  +shopRunnerDetails: Object,
  +orderSummary: Object,
  +shippingMethods: Object,
  +fedExError: string,
  +isAddressError: boolean,
  +enteredAddress: Object,
  +BillingFormState: Object
};

export type OrderSummaryData = {
  +readyStatus: string,
  +err: any,
  +orderSummaryData: Object
};

export type CartUpdateData = {
  +readyStatus: string,
  +err: any,
  +orderSummaryData: Object,
  +checkoutData: Object,
  +quantityData: Object,
  +removeData: Object,
  +storeData: Object,
  +cartData: Object,
  +promoData: Object,
  +promoMessage: boolean
};

export type HeaderData = {
  +readyStatus: string,
  +err: any,
  +headerHeight: number,
  +headerData: Object
};

export type StoreData = {
  +readyStatus: string,
  +nearByStoreStatus: string,
  +setStoreStatus: string,
  +err: any,
  +storeData: Object,
  +currentStore: string,
  +nearByStoreData: Object
};

export type MyVehicleData = {
  +readyStatus: string,
  +vehicleData: Object,
  +removedVehicleData: Object,
  +updateVehicleData: Object,
  +err: any,
  +vehicleDataById: Object
};

export type MaintenanceIntervalsData = {
  +readyStatus: string,
  +err: any,
  +viewInfo: Object
};

export type PreferredStoreData = {
  +readyStatus: string,
  +err: string,
  +storeDetails: Object,
  +currentDayTime: Object
};

export type SearchData = {
  +readyStatus: string,
  +queryDisplayLabel: string,
  +searchResult: Object,
  +searchValue: string,
  +query: string
};

export type Scroll = {
  +scrollY: number,
  +scrollX: number
};

export type ServiceHistoryData = {
  +addServiceStatus: boolean,
  +editServiceData: Object,
  +serviceHistoryData: Object,
  +initialServiceList: Array<Object>,
  +err: string
};

export type AddEditMileageData = {
  +readyStatus: string,
  +err: any,
  +data: Object
};

export type RepairGuideData = {
  +readyStatus: string,
  +repairGuidesData: Object,
  +chapterData: Object,
  +err: string
};

export type contactUsForm = {
  +readyStatus: string,
  +err: any,
  +defaultFormData: Object,
  +SubmitStatus: boolean,
  +profileDetails: Object
};

export type DealsSplitContentData = {
  +readyStatus: string,
  +err: any,
  +viewInfo: Object
};

export type MyProfileData = {
  +readyStatus: string,
  +updateStatus: string,
  +statesValueStatus: string,
  +err: any,
  +data: Object,
  +states: Object
};

export type DealsMakerData = {
  +readyStatus: string,
  +err: string,
  +dealsMakerData: Object
};

export type TrackOrderData = {
  +readyStatus: string,
  +err: string
};

// State
type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V; // eslint-disable-line no-undef
export type ReduxState = $ObjMap<Reducers, $ExtractFunctionReturn>; // eslint-disable-line no-undef

// Action
export type Action =
  | { type: 'USERS_REQUESTING' }
  | { type: 'USERS_SUCCESS', data: Array<Object> }
  | { type: 'USERS_FAILURE', err: any }
  | { type: 'USER_REQUESTING', userId: string }
  | { type: 'USER_SUCCESS', userId: string, data: Object }
  | { type: 'USER_FAILURE', userId: string, err: any }
  | { type: 'CREATE_REQUESTING' }
  | { type: 'CREATE_SUCCESS', data: Object }
  | { type: 'CREATE_FAILURE', err: any }
  | { type: 'FORGOT_REQUESTING' }
  | { type: 'FORGOT_SUCCESS', data: Object }
  | { type: 'FORGOT_FAILURE', err: any }
  | { type: 'RESET_REQUESTING' }
  | { type: 'RESET_SUCCESS', data: Object }
  | { type: 'RESET_FAILURE', err: any }
  | { type: 'SUBMIT_REQUESTING' }
  | { type: 'SUBMIT_SUCCESS', data: Object }
  | { type: 'SUBMIT_FAILURE', err: any }
  | { type: 'SUBMITFORGOT_REQUESTING' }
  | { type: 'SUBMITFORGOT_SUCCESS', data: Object }
  | { type: 'SUBMITFORGOT_FAILURE', err: any }
  | { type: 'SUBMITRESET_REQUESTING' }
  | { type: 'SUBMITRESET_SUCCESS', data: Object }
  | { type: 'SUBMITRESET_FAILURE', err: any }
  | { type: 'MOBILESUBMENU_REQUESTING' }
  | { type: 'MOBILESUBMENU_SUCCESS', data: Object, mostPopularLabel: any }
  | { type: 'MOBILESUBMENU_FAILURE', err: any }
  | { type: 'HERO_REQUESTING' }
  | { type: 'HERO_SUCCESS', data: Object }
  | { type: 'HERO_FAILURE', err: any }
  | { type: 'SPLIT_REQUESTING' }
  | { type: 'SPLIT_SUCCESS', data: Object }
  | { type: 'SPLIT_FAILURE', err: any }
  | { type: 'PRODUCT_REQUESTING', data: Object }
  | { type: 'PRODUCT_SUCCESS', data: Object }
  | { type: 'PRODUCT_FAILURE', err: any }
  | { type: 'CATEGORY_REQUESTING' }
  | { type: 'CATEGORY_SUCCESS', data: Object }
  | { type: 'CATEGORY_FAILURE', err: any }
  | { type: 'SUB_CATEGORY_REQUESTING' }
  | { type: 'SUB_CATEGORY_SUCCESS', data: Object }
  | { type: 'SUB_CATEGORY_FAILURE', err: any }
  | { type: 'ADD_TO_CART_REQUESTING' }
  | { type: 'ADD_TO_CART_SUCCESS', data: Object }
  | { type: 'ADD_TO_CART_FAILURE', err: any }
  | { type: 'SUBCAT_REQUESTING' }
  | { type: 'SUBCAT_SUCCESS', data: Object }
  | { type: 'SUBCAT_FAILURE', err: any }
  | { type: 'FETCH_SUBMENU', id: any, label: string }
  | { type: 'FETCH_SUBMENU_2', id: any, label: string }
  | { type: 'FETCH_MOST_POP' }
  | { type: 'RESET_NAV_DATA' }
  | { type: 'SET_VIEW', view: boolean }
  | { type: 'PARTS_SUCCESS', data: Object }
  | { type: 'PARTS_FAILURE', err: any }
  | { type: 'PARTS_REQUESTING' }
  | { type: 'PRICE_SUCCESS', data: any, skuIds: any }
  | { type: 'PRICE_FAILURE', err: any }
  | { type: 'YMME_REQUESTING' }
  | { type: 'YMME_SUCCESS', data: Object }
  | { type: 'YMME_YEAR_SUCCESS', data: Object }
  | { type: 'YMME_MAKE_SUCCESS', data: Object }
  | { type: 'YMME_MODEL_SUCCESS', data: Object }
  | { type: 'YMME_ENGINE_SUCCESS', data: Object }
  | { type: 'YMME_ADD_VEHICLE_SUCCESS', data: Object }
  | { type: 'YMME_FAILURE', err: any }
  | { type: 'YMME_VEHICLE_LIST_SUCCESS', data: Object }
  | { type: 'YMME_REMOVE_VEHICLE_SUCCESS', data: Object }
  | { type: 'HEADER_STATE_SUCCESS', status: boolean }
  | { type: 'HEADER_STATE_FAILURE' }
  | { type: 'HEADER_REQUESTING' }
  | { type: 'HEADER_SUCCESS', data: Object }
  | { type: 'HEADER_FAILURE', err: string }
  | { type: 'CART_REQUESTING' }
  | { type: 'CART_SUCCESS', data: Object }
  | { type: 'CART_FAILURE', err: string }
  | { type: 'CART_VERIFY_REQUESTING' }
  | { type: 'CART_VERIFY_SUCCESS', data: Object }
  | { type: 'CART_VERIFY_FAILURE', err: string }
  | { type: 'ORDER_SUMMARY_REQUESTING' }
  | { type: 'ORDER_SUMMARY_SUCCESS', data: Object }
  | { type: 'ORDER_SUMMARY_FAILURE', err: string }
  | { type: 'CHECKOUT_VERIFY_REQUESTING' }
  | { type: 'CHECKOUT_VERIFY_SUCCESS', data: Object }
  | { type: 'CHECKOUT_VERIFY_FAILURE', err: string }
  | { type: 'STORECHANGE_REQUESTING' }
  | { type: 'STORECHANGE_SUCCESS', id: any, data: Object }
  | { type: 'STORECHANGE_FAILURE', id: any, err: string }
  | { type: 'REMOVECART_REQUESTING' }
  | { type: 'REMOVECART_SUCCESS', id: any, data: Object }
  | { type: 'REMOVECART_FAILURE', id: any, err: string }
  | { type: 'ITEMQUANTITY_REQUESTING' }
  | { type: 'ITEMQUANTITY_SUCCESS', data: Object }
  | { type: 'ITEMQUANTITY_FAILURE', err: string }
  | { type: 'MINICART_REQUESTING' }
  | { type: 'MINICART_SUCCESS', data: Object }
  | { type: 'MINICART_FAILURE', err: string }
  | { type: 'BV_REQUESTING' }
  | { type: 'BV_SUCCESS', data: Object }
  | { type: 'BV_FAILURE', err: any }
  | { type: 'PROMOCODE_APPLY_REQUESTING' }
  | { type: 'PROMOCODE_APPLY_SUCCESS', data: Object }
  | { type: 'PROMOCODE_APPLY_FAILURE', err: any }
  | { type: 'PROMOCODE_REMOVE_REQUESTING' }
  | { type: 'PROMOCODE_REMOVE_SUCCESS', data: Object }
  | { type: 'PROMOCODE_REMOVE_FAILURE', err: any }
  | { type: 'STORE_SEARCH_REQUESTING' }
  | { type: 'STORE_SEARCH_SUCCESS', data: Object }
  | { type: 'STORE_SEARCH_FAILURE', err: string }
  | { type: 'SET_STORE_REQUESTING' }
  | { type: 'SET_STORE_SUCCESS', storeNumber: string }
  | { type: 'SET_STORE_FAILURE', err: string }
  | { type: 'GET_VEHICLE_REQUESTING' }
  | { type: 'GET_VEHICLE_SUCCESS', data: Object }
  | { type: 'GET_VEHICLE_FAILURE', err: string }
  | { type: 'STORE_CLEAR_SEARCH_DATA' }
  | { type: 'NEAR_BY_STORES_SUCCESS', data: Object }
  | { type: 'NEAR_BY_STORES_FAILURE', err: any }
  | { type: 'FETCH_PREFERRED_STORE_REQUESTING' }
  | { type: 'FETCH_PREFERRED_STORE_SUCCESS', data: Object }
  | { type: 'FETCH_PREFERRED_STORE_FAILURE', err: string }
  | { type: 'REMOVE_VEHICLE_REQUESTING' }
  | { type: 'REMOVE_VEHICLE_SUCCESS', data: Object }
  | { type: 'REMOVE_VEHICLE_FAILURE', err: string }
  | { type: 'UPDATE_VEHICLE_SUCCESS', data: Object }
  | { type: 'UPDATE_VEHICLE_FAILURE', err: string }
  | { type: 'MYVEHICLE_REMOVE_SUCCESS' }
  | { type: 'GET_VEHICLE_BY_ID_SUCCESS', vehicleId: string }
  | { type: 'GET_VEHICLE_BY_ID_FAILURE', err: string }
  | { type: 'ADD_SERVICE_HISTORY_SUCCESS' }
  | { type: 'ADD_SERVICE_HISTORY_FAILURE', err: string }
  | { type: 'FETCH_SERVICE_HISTORY_REQUESTING' }
  | { type: 'FETCH_SERVICE_HISTORY_SUCCESS', data: Object }
  | { type: 'FETCH_SERVICE_HISTORY_FAILURE', err: string }
  | { type: 'ADDEDITMILEAGE_REQUESTING' }
  | { type: 'ADDEDITMILEAGE_FAILURE', err: string }
  | { type: 'ADDEDITMILEAGE_SUCCESS', data: Object }
  | {
      type: 'FETCH_INITIAL_SERVICE_HISTORY',
      startIndex: number,
      endIndex: number
    }
  | { type: 'SORT_SERVICE_HISTORY', sortByValue: string }
  | { type: 'EDIT_SERVICE_HISTORY_SUCCESS', data: Object }
  | { type: 'MAINTENANCE_INTERVALS_REQUESTING' }
  | { type: 'MAINTENANCE_INTERVALS_SUCCESS', data: Object }
  | { type: 'MAINTENANCE_INTERVALS_FAILURE', err: string }
  | { type: 'DEALSSPLIT_REQUESTING' }
  | { type: 'DEALSSPLIT_SUCCESS', data: Object }
  | { type: 'DEALSSPLIT_FAILURE', err: string }
  | { type: 'FETCH_REPAIRGUIDS_REQUESTING' }
  | { type: 'FETCH_REPAIRGUIDS_SUCCESS', data: Object }
  | { type: 'FETCH_REPAIRGUIDS_FAILURE', err: string }
  | { type: 'PROFILE_DETAILS_REQUESTING' }
  | { type: 'PROFILE_DETAILS_SUCCESS', data: Object }
  | { type: 'PROFILE_DETAILS_FAILURE', err: string }
  | { type: 'FETCH_REPAIRGUIDS_CHAAPTERS_SUCCESS', data: Object }
  | { type: 'FETCH_REPAIRGUIDS_CHAAPTERS_FAILURE', err: string }
  | { type: 'MY_PROFILE_REQUESTING' }
  | { type: 'MY_PROFILE_FAILURE', err: string }
  | { type: 'MY_PROFILE_SUCCESS', data: Object }
  | { type: 'MY_PROFILE_PATCH_SUCCESS', data: Object }
  | { type: 'MY_PROFILE_PATCH_REQUESTING' }
  | { type: 'MY_PROFILE_PATCH_FAILURE', err: string }
  | { type: 'MY_PROFILE_STATES_SUCCESS', data: Object }
  | { type: 'MY_PROFILE_STATES_REQUESTING' }
  | { type: 'MY_PROFILE_STATES_FAILURE', err: string }
  | { type: 'PAYPAL_LOOKUP_REQUESTING' }
  | { type: 'PAYPAL_LOOKUP_SUCCESS', data: Object }
  | { type: 'PAYPAL_LOOKUP_FAILURE', err: string }
  | { type: 'PAYPAL_AUTH_REQUESTING' }
  | { type: 'PAYPAL_CHECKOUT_AUTH_SUCCESS', data: Object }
  | { type: 'PAYPAL_CART_AUTH_SUCCESS', data: Object }
  | { type: 'PAYPAL_AUTH_FAILURE', err: string }
  | { type: 'DEALS_MAKER_REQUESTING' }
  | { type: 'DEALS_MAKER_FAILURE', err: string }
  | { type: 'DEALS_MAKER_SUCCESS', data: Object }
  | { type: 'DEAL_PRODUCT_SUCCESS', err: string }
  | { type: 'DEAL_PRODUCT_FAILURE', data: Object }
  | {
      type: 'DEALS_MAKER_QUANTITY_UPDATE',
      constraintIndex: number,
      itemIndex: number,
      quantity: number
    }
  | { type: 'TRACK_ORDER_REQUESTING' }
  | { type: 'TRACK_ORDER_SUCCESS' }
  | { type: 'TRACK_ORDER_FAILURE', err: string }
  | { type: 'ORDER_DETAILS_SUCCESS', data: Object };

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
export type GetState = () => ReduxState;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

// Store
export type Store = ReduxStore<ReduxState, Action>;

export type BadgeDetails = {
  eligibleForNextDay: boolean,
  vehicleFit: boolean
};
