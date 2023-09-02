import getDaysInfo from '../helpers/getDaysInfo';

describe('getDaysInfo', () => {

  test('Common date', () => {
    const correctDates = []
    for (let i = 28; i <= 31; i++) {
      correctDates.push(`2023-08-${i}`)
    }
    for (let i = 1; i <= 30; i++) {
      const dayNum = i.toString().length === 1 ? `0${i}` : i
      correctDates.push(`2023-09-${dayNum}`)
    }
    correctDates.push('2023-10-01')

    expect(getDaysInfo(new Date('2023-09-02'))).toEqual({
      days: correctDates,
      monthFilter: 'due after: 2023-08-28 | due before: 2023-10-01',
    })
  })
})
