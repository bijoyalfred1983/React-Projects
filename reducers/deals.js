/* @flow */

import _ from 'lodash/fp';

import type { DealsSplitContentData, Action } from '../types';

type State = DealsSplitContentData;

const initialState = {
  readyStatus: 'DEALSSPLIT_INVALID',
  err: null,
  dealsAvailable: { storeDeals: [] },
  showYmme: false,
  partTypes: [],
  temporaryPartTypes: [],
  selectedFirstLevelItem: {},
  temporarySelectedFirstLevelItem: {},
  selectedPartType: { nId: -1 },
  temporarySelectedPartType: { nId: -1 },
  showCategoryListDrawer: false,
  showPartTypeListDrawer: false,
  filters: [],
  viewInfo: {},
  layout: 'home',
  filteredDeal: [],
  storeChecked: true,
  onlineChecked: true,
  universalChecked: true,
  vehicleChecked: false,
  hideNoVehicleWarning: false
};

export const getFilteredData = (
  state: State,
  dealType: string,
  checked: boolean
) => {
  const {
    dealsAvailable,
    storeChecked,
    onlineChecked,
    universalChecked,
    vehicleChecked
  } = state;
  const dealsToBeReturned = {};
  dealsToBeReturned.dealsImages = dealsAvailable.dealsImages;
  switch (dealType) {
    case 'store':
      dealsToBeReturned.filtered = checked ? dealsAvailable.storeDeals : {};
      dealsToBeReturned.count = checked ? dealsAvailable.storeDealsCount : 0;
      break;
    case 'online':
      dealsToBeReturned.filtered = checked ? dealsAvailable.onlineDeals : {};
      dealsToBeReturned.count = checked ? dealsAvailable.onlineDealsCount : 0;
      break;
    case 'universal':
      if (storeChecked) {
        dealsToBeReturned.filtered = storeChecked
          ? dealsAvailable.storeDeals
          : {};
        dealsToBeReturned.count = checked ? dealsAvailable.storeDealsCount : 0;
      } else if (onlineChecked) {
        dealsToBeReturned.filtered = checked ? dealsAvailable.onlineDeals : {};
        dealsToBeReturned.count = checked ? dealsAvailable.onlineDealsCount : 0;
      }
      break;
    case 'vehicle':
      if (checked && storeChecked) {
        dealsToBeReturned.filtered = checked
          ? dealsAvailable.vehicleFilteredInstoreDeals
          : {};
        dealsToBeReturned.count = checked
          ? dealsAvailable.vehicleFilteredInstoreDealsCount
          : 0;
      } else if (storeChecked) {
        dealsToBeReturned.filtered = dealsAvailable.storeDeals;
        dealsToBeReturned.count = dealsAvailable.storeDealsCount;
      }

      // } else if (onlineChecked) {
      //   dealsToBeReturned.filtered = checked
      //     ? dealsAvailable.onlineDeals
      //     : {};
      //   dealsToBeReturned.count = checked
      //     ? dealsAvailable.onlineDealsCount
      //     : 0;

      break;
    default:
      if (storeChecked) {
        dealsToBeReturned.filtered = vehicleChecked
          ? dealsAvailable.vehicleFilteredInstoreDeals
          : dealsAvailable.storeDeals;
        dealsToBeReturned.count = vehicleChecked
          ? dealsAvailable.vehicleFilteredInstoreDealsCount
          : dealsAvailable.storeDealsCount;
      } else if (onlineChecked) {
        dealsToBeReturned.filtered = universalChecked
          ? dealsAvailable.onlineDeals
          : {};
        dealsToBeReturned.count = universalChecked
          ? dealsAvailable.onlineDealsCount
          : 0;
      }
  }
  return dealsToBeReturned;
};

export const setCheckedState = (dealType, checked) => {
  let checkedState = false;
  if (dealType) {
    checkedState = !!checked;
  }
  return checkedState;
};

const contentDeals = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'DEALSSPLIT_REQUESTING':
      return _.assign(state, {
        readyStatus: 'DEALS_REQUESTING',
        selectedPartType: {},
        selectedFirstLevelItem: {}
      });
    case 'DEALSSPLIT_FAILURE':
      return _.assign(state, {
        readyStatus: 'DEALSSPLIT_FAILURE',
        err: action.err
      });
    case 'DEALSSPLIT_SUCCESS':
      return _.assign(state, {
        readyStatus: 'DEALSSPLIT_SUCCESS',
        viewInfo: action.data
      });
    case 'DEALSREBATES_REQUESTING':
      return _.assign(state, {
        readyStatus: 'DEALSREBATES_REQUESTING'
      });
    case 'DEALSREBATES_FAILURE':
      return _.assign(state, {
        readyStatus: 'DEALSREBATEST_FAILURE',
        err: action.err
      });
    case 'DEALSREBATES_SUCCESS':
      return _.assign(state, {
        readyStatus: 'DEALSREBATES_SUCCESS',
        viewInfo: action.data
      });
    case 'SELECT_FIRST_LEVEL_ITEM':
      return {
        ...state,
        ...{
          selectedFirstLevelItem: action.item || {}
        }
      };
    case 'SELECT_TEMPORARY_FIRST_LEVEL_ITEM':
      return {
        ...state,
        ...{
          temporarySelectedFirstLevelItem: action.item || {}
        }
      };
    case 'CLEAR_TEMPORARY_FIRST_LEVEL_ITEM':
      return {
        ...state,
        ...{
          temporarySelectedFirstLevelItem: {}
        }
      };
    case 'SELECT_PART_TYPE':
      return {
        ...state,
        ...{ selectedPartType: action.item || { nId: -1 } }
      };
    case 'CLEAR_TEMPORARY_PART_TYPE':
      return {
        ...state,
        ...{ temporarySelectedPartType: { nId: -1 } }
      };
    case 'SELECT_TEMPORARY_PART_TYPE':
      return {
        ...state,
        ...{ temporarySelectedPartType: action.item || { nId: -1 } }
      };
    case 'CLEAR_PART_TYPE':
      return { ...state, ...{ selectedPartType: { nId: -1 } } };
    case 'PART_TYPES_REQUESTING':
      return { ...state, readyStatus: 'PART_TYPES_REQUESTING' };
    case 'PART_TYPES_FAILURE':
      return { ...state, readyStatus: 'PART_TYPES_FAILURE' };
    case 'PART_TYPES_SUCCESS':
      return {
        ...state,
        readyStatus: 'PART_TYPES_SUCCESS',
        temporaryPartTypes: action.data.partTypes || []
      };
    case 'DEALS_LEVEL1_SUCCESS':
      return {
        ...state,
        readyStatus: 'DEALS_LEVEL1_SUCCESS',
        dealsAvailable: action.data,
        partTypes: action.data.partTypes || [],
        layout: 'dealsPage',
        level1Label: action.level1Label,
        buffUrl: action.buffUrl,
        filteredDeal: getFilteredData({
          ...state,
          dealsAvailable: action.data,
          dealsImages: action.data.dealsImages
        })
      };
    case 'DEALS_LEVEL1_REQUESTING':
      return {
        ...state,
        readyStatus: 'DEALS_LEVEL1_REQUESTING'
      };
    case 'DEALS_LEVEL1_FAILURE':
      return {
        ...state,
        readyStatus: 'DEALS_LEVEL1_FAILURE',
        err: action.err
      };
    case 'DEALS_PART_TYPES_SUCCESS':
      return {
        ...state,
        readyStatus: 'DEALS_PART_TYPES_SUCCESS',
        dealsAvailable: action.data,
        layout: 'dealsPage',
        level1Label: action.level1Label,
        filteredDeal: getFilteredData(
          {
            ...state,
            dealsAvailable: action.data,
            dealsImages: action.data.dealsImages
          },
          action.dealType,
          action.checked,
          state
        )
      };
    case 'DEALS_PART_TYPES_REQUESTING':
      return {
        ...state,
        readyStatus: 'DEALS_PART_TYPES_REQUESTING'
      };
    case 'DEALS_PART_TYPES_FAILURE':
      return {
        ...state,
        readyStatus: 'DEALS_PART_TYPES_FAILURE',
        err: action.err
      };
    case 'CLEAR_DEALS':
      return {
        ...state,
        dealsAvailable: { storeDeals: [] },
        partTypes: [],
        selectedFirstLevelItem: {},
        selectedPartType: { nId: -1 },
        viewInfo: {},
        layout: 'home',
        filteredDeal: {}
      };
    case 'SHOW_CATEGORY_DRAWER':
      return { ...state, showCategoryListDrawer: true };
    case 'HIDE_CATEGORY_DRAWER':
      return { ...state, showCategoryListDrawer: false };
    case 'SHOW_FILTERS_DRAWER':
      return { ...state, showFiltersDrawer: true };
    case 'HIDE_FILTERS_DRAWER':
      return { ...state, showFiltersDrawer: false };
    case 'DEALS_HOME':
      return { ...state, layout: 'home', partTypes: [] };
    case 'DEAL_FILTER':
      return {
        ...state,
        filteredDeal: !action.isMobile
          ? getFilteredData(state, action.dealType, action.checked)
          : state.filteredDeal,
        storeChecked:
          action.dealType && action.dealType === 'store'
            ? setCheckedState(action.dealType, action.checked)
            : state.storeChecked,
        onlineChecked:
          action.dealType && action.dealType === 'online'
            ? setCheckedState(action.dealType, action.checked)
            : state.onlineChecked,
        vehicleChecked:
          action.dealType && action.dealType === 'vehicle'
            ? setCheckedState(action.dealType, action.checked)
            : state.vehicleChecked,
        universalChecked:
          action.dealType && action.dealType === 'universal'
            ? setCheckedState(action.dealType, action.checked)
            : state.universalChecked
      };
    case 'CLEAR_STORE_FILTER':
      return {
        ...state,
        storeChecked: false,
        filteredDeal: { ...state, storeChecked: false }
      };
    case 'CLEAR_ONLINE_FILTER':
      return {
        ...state,
        onlineChecked: false,
        filteredDeal: { ...state, onlineChecked: false }
      };
    case 'CLEAR_VEHICLE_FILTER':
      return {
        ...state,
        vehicleChecked: false,
        filteredDeal: { ...state, onlineChecked: false }
      };
    case 'CLEAR_UNIVERSAL_FILTER':
      return {
        ...state,
        universalChecked: false,
        filteredDeal: { ...state, onlineChecked: false }
      };
    case 'SHOW_YMME':
      return {
        ...state,
        showYmme: true
      };
    case 'HIDE_YMME':
      return {
        ...state,
        showYmme: false
      };
    case 'HIDE_NO_VEHICLE_WARNING':
      return { ...state, hideNoVehicleWarning: true };
    default:
      return state;
  }
};

export default contentDeals;
