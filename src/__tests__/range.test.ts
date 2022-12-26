import { rangeAbsolute } from '../helpers/mathHelpers';

describe('rangeAbsolute', () => {
  it('returns array with ranged numbers', () => {

    expect(rangeAbsolute(1, 5)).toEqual([1, 2, 3, 4, 5])

    expect(rangeAbsolute(1, -3)).toEqual([1, 2, 3])

    expect(rangeAbsolute(3, 1)).toEqual([3, 2, 1])

  })
})
