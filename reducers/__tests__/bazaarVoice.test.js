import bazaarVoice from '../bazaarVoice';

describe(' form data', () => {

 test('should return the initial state', () => {
    expect(bazaarVoice(undefined, {})).toEqual({
      readyStatus: 'BV_INVALID',
      err: null,
      bvConfig: {}
    });
  });

   test('should handle BV_REQUESTING', () => {
    expect(
      bazaarVoice(undefined, {
        type: 'BV_REQUESTING',
        err: null,
        bvConfig: {}
      })
    ).toEqual({
      readyStatus: 'BV_REQUESTING',
      err: null,
      bvConfig: {}
    });
  });

  test('should handle BV_FAILURE', () => {
    expect(
      bazaarVoice(undefined, {
        type: 'BV_FAILURE',
        err: 'Oops! Something went wrong.',
        bvConfig: {}
      })
    ).toEqual({
      readyStatus: 'BV_FAILURE',
      err: 'Oops! Something went wrong.',
      bvConfig: {}
    });
  });

  test('should handle BV_SUCCESS', () => {
    expect(
      bazaarVoice(undefined, {
        type: 'BV_SUCCESS',
        err: null,
        data: [{ RR_AZRWEB_SHELF_TAG: "false" }]
      })
    ).toEqual({
      readyStatus: 'BV_SUCCESS',
      err: null,
      bvConfig: [{ RR_AZRWEB_SHELF_TAG: "false" }]
    });
  });

});
