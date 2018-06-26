/* @flow */
import type { YMMEDataType, Action } from '../types';

type State = YMMEDataType;

const initialState = {
  readyStatus: 'YMME_INVALID',
  openYmmeModal: false,
  err: null,
  data: {},
  yearList: [],
  makeList: [],
  modelList: [],
  engineList: [],
  selectedYear: '',
  selectedMake: '',
  selectedModel: '',
  selectedEngine: '',
  disableYear: false,
  disableMake: true,
  disableModel: true,
  disableEngine: true,
  resetYearField: false,
  resetMakeField: false,
  resetModelField: false,
  resetEngineField: false,
  isVehicleAdded: false,
  errorMsg: ''
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'SHOW_YMME_MODAL': {
      return {
        ...state,
        readyStatus: 'SHOW_YMME_MODAL',
        openYmmeModal: action.value
      };
    }
    case 'YMME_YEAR_REQUESTING': {
      return {
        ...state,
        readyStatus: 'YMME_YEAR_REQUESTING'
      };
    }
    case 'YMME_YEAR_SUCCESS': {
      return {
        ...state,
        readyStatus: 'YMME_YEAR_SUCCESS',
        yearList: action.data
      };
    }
    case 'FORM_YEAR_SUCCESS': {
      return {
        ...state,
        readyStatus: 'FORM_YEAR_SUCCESS',
        yearList: action.data
      };
    }
    case 'YMME_YEAR_FAILURE': {
      return {
        ...state,
        readyStatus: 'YMME_YEAR_FAILURE',
        err: action.err,
        errorMsg: 'Oops Something Went Wrong...'
      };
    }
    case 'YMME_MAKE_REQUESTING': {
      return {
        ...state,
        readyStatus: 'YMME_MAKE_REQUESTING',
        selectedYear: action.selectedYear,
        resetMakeField: false
      };
    }
    case 'YMME_MAKE_SUCCESS': {
      return {
        ...state,
        readyStatus: 'YMME_MAKE_SUCCESS',
        makeList: action.data,
        disableMake: false,
        disableModel: true,
        disableEngine: true,
        resetMakeField: true,
        resetModelField: true,
        resetEngineField: true
      };
    }
    case 'YMME_MAKE_FAILURE': {
      return {
        ...state,
        readyStatus: 'YMME_MAKE_FAILURE',
        err: action.err,
        errorMsg: 'No Data Found for the Selected Year...'
      };
    }
    case 'YMME_MODEL_REQUESTING': {
      return {
        ...state,
        readyStatus: 'YMME_MODEL_REQUESTING',
        selectedMake: action.selectedMake
      };
    }
    case 'YMME_MODEL_SUCCESS': {
      return {
        ...state,
        readyStatus: 'YMME_MODEL_SUCCESS',
        modelList: action.data,
        disableModel: false,
        disableEngine: true,
        resetYearField: false,
        resetMakeField: false,
        resetModelField: true,
        resetEngineField: true
      };
    }
    case 'YMME_MODEL_FAILURE': {
      return {
        ...state,
        readyStatus: 'YMME_MODEL_FAILURE',
        resetMakeField: false,
        resetEngineField: true,
        disableModel: true,
        err: action.err,
        errorMsg: 'No Data Found for the Selected Make...'
      };
    }
    case 'YMME_ENGINE_REQUESTING': {
      return {
        ...state,
        readyStatus: 'YMME_ENGINE_REQUESTING',
        selectedModel: action.selectedModel
      };
    }
    case 'YMME_ENGINE_SUCCESS': {
      return {
        ...state,
        readyStatus: 'YMME_ENGINE_SUCCESS',
        engineList: action.data,
        disableEngine: false,
        resetYearField: false,
        resetMakeField: false,
        resetModelField: false,
        resetEngineField: false
      };
    }
    case 'YMME_ENGINE_FAILURE': {
      return {
        ...state,
        readyStatus: 'YMME_ENGINE_FAILURE',
        err: action.err,
        errorMsg: 'No Data Found for the Selected Model...'
      };
    }
    case 'YMME_RESET_ALL': {
      return {
        ...state,
        readyStatus: 'YMME_RESET_ALL',
        makeList: [],
        modelList: [],
        engineList: [],
        selectedYear: '',
        selectedMake: '',
        selectedModel: '',
        selectedEngine: '',
        disableYear: false,
        disableMake: true,
        disableModel: true,
        disableEngine: true,
        resetYearField: false,
        resetMakeField: false,
        resetModelField: false,
        resetEngineField: false,
        isVehicleAdded: false,
        errorMsg: ''
      };
    }
    case 'YMME_ADD_VEHICLE_REQUESTING': {
      return {
        ...state,
        readyStatus: 'YMME_ADD_VEHICLE_REQUESTING'
      };
    }
    case 'YMME_ADD_VEHICLE_SUCCESS': {
      return {
        ...state,
        readyStatus: 'YMME_ADD_VEHICLE_SUCCESS',
        addedVehicle: action.data,
        isVehicleAdded: true
      };
    }
    case 'YMME_ADD_VEHICLE_FAILURE': {
      return {
        ...state,
        readyStatus: 'YMME_ADD_VEHICLE_FAILURE',
        err: action.err
      };
    }
    case 'YMME_REMOVE_DEFAULT_VEHICLE_REQUESTING': {
      return {
        ...state,
        readyStatus: 'YMME_REMOVE_DEFAULT_VEHICLE_REQUESTING'
      };
    }
    case 'YMME_REMOVE_DEFAULT_VEHICLE_SUCCESS': {
      return {
        ...state,
        readyStatus: 'YMME_REMOVE_DEFAULT_VEHICLE_SUCCESS',
        data: {},
        isVehicleAdded: false
      };
    }
    case 'YMME_REMOVE_DEFAULT_VEHICLE_FAILURE': {
      return {
        ...state,
        readyStatus: 'YMME_REMOVE_DEFAULT_VEHICLE_FAILURE',
        err: action.err
      };
    }
    case 'YMME_SET_ENGINE': {
      return {
        ...state,
        readyStatus: 'YMME_SET_ENGINE',
        selectedEngine: action.engine,
        resetYearField: false,
        resetMakeField: false,
        resetModelField: false,
        resetEngineField: false
      };
    }
    case 'YMME_RESET_YEAR': {
      return {
        ...state,
        readyStatus: 'YMME_YEAR_SUCCESS',
        selectedYear: '',
        selectedMake: '',
        selectedModel: '',
        selectedEngine: ''
      };
    }
    case 'YMME_RESET_MAKE': {
      return {
        ...state,
        readyStatus: 'YMME_MAKE_SUCCESS',
        selectedMake: '',
        selectedModel: '',
        selectedEngine: ''
      };
    }
    case 'YMME_RESET_MODEL': {
      return {
        ...state,
        readyStatus: 'YMME_MODEL_SUCCESS',
        selectedModel: '',
        selectedEngine: ''
      };
    }
    case 'CLOSE_VEHICLE_BANNER': {
      return {
        ...state,
        readyStatus: 'CLOSE_VEHICLE_BANNER',
        isVehicleAdded: false
      };
    }
    default:
      return state;
  }
};
