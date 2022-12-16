import { range } from '../helpers/mathHelpers';

describe('range', () => {
  it('returns array with ranged numbers', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5])
  })
})