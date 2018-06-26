import search from '../search';

describe('search reducer', () => {
  test('should return the initial state', () => {
    expect(search(undefined, {})).toEqual({
      readyStatus: 'INVALID_SEARCH',
      queryDisplayLabel: '',
      searchResult: {},
      searchValue: '',
      query: ''
    });
  });

  test('should handle SEARCH_REQUESTING', () => {
    expect(
      search(undefined, {
        type: 'SEARCH_REQUESTING'
      })
    ).toEqual({
      readyStatus: 'SEARCH_REQUESTING',
      queryDisplayLabel: '',
      searchResult: {},
      searchValue: '',
      query: ''
    });
  });

  test('should handle SEARCH_SUCCESS', () => {
    expect(
      search(undefined, {
        type: 'SEARCH_SUCCESS',
        data: 123,
        query: 'test'
      })
    ).toEqual({
      readyStatus: 'SEARCH_SUCCESS',
      queryDisplayLabel: 'test',
      searchResult: 123,
      searchValue: '',
      query: ''
    });
  });

  test('should handle SEARCH_FAILURE', () => {
    expect(
      search(undefined, {
        type: 'SEARCH_FAILURE',
        err: 'error'
      })
    ).toEqual({
      readyStatus: 'SEARCH_FAILURE',
      queryDisplayLabel: '',
      searchResult: {},
      searchValue: '',
      query: '',
      err: 'error'
    });
  });

  test('should handle CLEAR_SEARCH', () => {
    expect(
      search(undefined, {
        type: 'CLEAR_SEARCH'
      })
    ).toEqual({
      readyStatus: 'INVALID_SEARCH',
      queryDisplayLabel: '',
      searchResult: {},
      searchValue: '',
      query: ''
    });
  });

  test('should handle MISSPELL_WORD_VALUE', () => {
    expect(
      search(undefined, {
        type: 'MISSPELL_WORD_VALUE',
        data: '123'
      })
    ).toEqual({
      readyStatus: 'INVALID_SEARCH',
      queryDisplayLabel: '',
      searchResult: {},
      searchValue: '',
      query: '123'
    });
  });

  test('should handle HEADER_SEARCH_CHANGE', () => {
    expect(
      search(undefined, {
        type: 'HEADER_SEARCH_CHANGE',
        query: 'test'
      })
    ).toEqual({
      readyStatus: 'INVALID_SEARCH',
      queryDisplayLabel: '',
      searchResult: {},
      searchValue: '',
      query: 'test'
    });
  });
});
