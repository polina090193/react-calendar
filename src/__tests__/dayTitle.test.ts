import { makeDateTitle } from '../helpers/dateHelpers';

describe('makeDateTitle', () => {
  it('makes nice title from the date string', () => {
    expect(makeDateTitle('2023-01-09')).toEqual('9 Jan 2023')
  })
})
