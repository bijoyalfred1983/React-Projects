import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import { fetchDealsProductData } from '../dealsProductDetail';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('dealsProductDetail action', () => {
  const response = {
    viewInfo: {
      'altPartNumber': 'R5704A77',
      'featuresAndBenefits': {
        'productSpecification': {
          'Position on Vehicle': 'Front/Rear',
          'Package Contents': 'Front/Rear Mat',
          'Chemical Resistant': 'Yes',
          'Mat Quantity': '4',
          'Floor Mat Material': 'Rubber Compound',
          'Color': 'Tan',
          'Theme': 'None',
          'Cut To Fit': 'Yes',
          'Non-Slide Mat Backing': 'Yes',
          'Vehicle Category': 'Universal'
        },
        'name': 'Features &amp; Benefits',
        'featureAttributes': [
          'Rugged Construction',
          'All weather performance',
          '70-85% Semi Fit Floor Pan Coverage',
          'Non Slip Backing'
        ],
        'value': 'The Pro Elite Deluxe 4  piece Heavy Duty All Weather Floor Mat provides tough protection for your vehicles interior against dirt, liquid and debris. Semi custom trim lines can be cut with household scissors to achieve 70% floor pan coverage for many of today most popular vehicles on the road. Easy to clean with vacuum and mild detergent.'
      },
      'imageUrl': 'https://contentinfo.autozone.com/znetcs/product-info/en/US/jeh/G5704RTAN/image/3/',
      'weight': '10.35',
      'productDetails': {
        'lineCode': 'JEH',
        'brandName': 'ProElite',
        'shoprunnerElegible': false,
        'partTypeId': 37,
        'systemCode': 0,
        'repositoryId': '758558',
        'active': false,
        'description': 'ProElite Floor Mat',
        'vehicleFitmentLabel': 'Universal Products',
        'partNumber': 'G5704RTAN',
        'itemIdentifier': '758558_0_0_',
        'partType': 'Floor Mat'
      }
    }
      
  };

  const errorMessage = 'Request failed with status code 404';
  let URL = '/ecomm/b2c/v1/deals/dealMaker/dealItemQuickView';
  let dealId = '93551';
  let skuId = '758558';

  beforeEach(() => {
    nock.disableNetConnect();
  });

  test('creates DEAL_PRODUCT_SUCCESS when fetching deals data has been done', () => {
    nock(host)
      .get(`${URL}/${dealId}/${skuId}`)
      .reply(200, response);
    const expectedActions = [
      { type: 'DEAL_PRODUCT_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchDealsProductData(axios, dealId, skuId, URL)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates DEAL_PRODUCT_FAILURE when fetching deals data has been done', () => {
    nock(host)
    .get(`${URL}/${dealId}/${skuId}`)
    .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'DEAL_PRODUCT_FAILURE',  err: errorMessage  }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchDealsProductData(axios, dealId, skuId, URL)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});