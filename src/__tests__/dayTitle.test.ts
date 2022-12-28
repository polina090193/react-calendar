import { makeDateTitle } from '../helpers/dateHelpers';

describe('makeDateTitle', () => {

  test('Common date like from input', () => {
    expect(makeDateTitle('2022-11-17')).toEqual('17 Nov 2022')
  })

  test('Zero year', () => {
    expect(makeDateTitle('00-01-01')).toEqual('1 Jan 2000')
  })

  test('With dots', () => {
    expect(makeDateTitle('02.02.03')).toEqual('2 Feb 2003')
  })

  test('29 Feb of a leap year', () => {
    expect(makeDateTitle('2020-02-29')).toEqual('29 Feb 2020')
  })

  test('29 Feb of a non-leap year should be equal to 1 Mar', () => {
    expect(makeDateTitle('2021-02-29')).toEqual('1 Mar 2021')
  })

  test('Invalid date (zeros)', () => {
    expect(() => {
      makeDateTitle('0000-00-00')
    }).toThrow('Invalid date')
  })

  test('Invalid date (no date)', () => {
    expect(() => {
      makeDateTitle('thatsNotADate')
    }).toThrow('Invalid date')
  })
})
