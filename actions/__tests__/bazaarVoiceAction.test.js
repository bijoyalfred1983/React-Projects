import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchBazaarVoiceGlobalData } from '../bazaarVoiceAction';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch create account data', () => {

const response = {
	"RR_AZRWEB_SHELF_ENABLED":"true","RR_AZRWEB_PDP_ENABLED":"false","RR_AZRWEB_SHELF_TAG":"https://display.ugc.bazaarvoice.com/bvstaging/static/autozone/en_US/bvapi.js","RR_AZRWEB_PDP_TAG":"https://apps.bazaarvoice.com/deployments/autozone/main_site/staging/en_US/bv.js"
}
const errorMessage = 'Request failed with status code 404';

  beforeEach(() => {
    nock.disableNetConnect();
  });

 test('creates BV_SUCCESS when fetching data has been done', () => {
    nock(host)
      .get('/')
      .reply(200, response);

    const expectedActions = [
      { type: 'BV_REQUESTING' },
      { type: 'BV_SUCCESS', data: response }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchBazaarVoiceGlobalData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates BV_FAILURE data', () => {
    nock(host)
      .get('/')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: 'BV_REQUESTING' },
      { type: 'BV_FAILURE', err: errorMessage }
    ];
    const initialState = {};
    const store = mockStore(initialState);

    return store.dispatch(fetchBazaarVoiceGlobalData(axios, host)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
