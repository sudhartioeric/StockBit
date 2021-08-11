import {convertDataToQuery, getQueryUrl} from './index';

test('test function getQueryUrl', function () {
  const query = getQueryUrl(`?page=1&s=Avengers`),
    _failQuery = getQueryUrl('page=1,s=Avengers');
  expect(_failQuery).toBe(false);
  expect(query.page).toBe('1');
  expect(query.s).toBe('Avengers');
})
test('Test function convertDataToQuery', function () {
  const convert = convertDataToQuery({page: '1', s: 'Avengers'}),
    _failConvert = convertDataToQuery(['page=1', 's=Avengers']);
  expect(convert).toBe('?page=1&s=Avengers');
  expect(_failConvert).toBe('');
})