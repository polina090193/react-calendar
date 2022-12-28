import { rangeAbsolute } from '../helpers/mathHelpers';

describe('rangeAbsolute', () => {

  test('Start smaller than end', () => {
    expect(rangeAbsolute(1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  test('End is negative', () => {
    expect(rangeAbsolute(1, -3)).toEqual([1, 2, 3])
  })

  test('Start bigger than end', () => {
    expect(rangeAbsolute(3, 1)).toEqual([3, 2, 1])
  })

  test('Start is zero', () => {
    expect(rangeAbsolute(0, 2)).toEqual([0, 1, 2])
  })

  test('Start is negative', () => {
    expect(rangeAbsolute(-5, 2)).toEqual([5, 4, 3, 2])
  })

  test('Arguments are not numbers', () => {
    expect(() => {
      // @ts-expect-error
      rangeAbsolute('one', 'NaN')
    }).toThrow('One of the arguments is not a number')
  })

})
