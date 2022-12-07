import { range } from '@/helpers/mathHelpers'
import { weekDays, calendarLength } from '@/consts/daysConsts'
import { getFirstDayOfMonth, getDates, getNumDaysInMonth } from '@/helpers/dateHelpers'

interface DateData {
  monthIndex: number,
  year: number,
  daysInMonthAmount: () => number,
  firstDayOfMonthWeekday?: () => number,
  isJan?: () => boolean,
  isDec?: () => boolean,
  daysForAddingAmount?: () => number,
  daysNumsForAdding?: () => number[],
  datesForAdding?: () => string[],
}

interface DaysInfo {
  days: string[],
  monthFilter: string,
}

const getDaysInfo = (currentDate: Date = new Date()): DaysInfo => {

  const currentData: DateData = {
    monthIndex: currentDate.getMonth(),
    year: currentDate.getFullYear(),
    daysInMonthAmount() {return getNumDaysInMonth(this.monthIndex)},
    firstDayOfMonthWeekday() {return getFirstDayOfMonth(this.year, this.monthIndex).getDay()},
    isJan() {return this.monthIndex + 1 === 1},
    isDec() {return this.monthIndex === 11},
    datesForAdding() {return getDates(range(1, this.daysInMonthAmount()), this.monthIndex, this.year)}
  }

  const prevData: DateData = {
    monthIndex: currentData.isJan() ? 11 : currentData.monthIndex - 1,
    year: currentData.isJan() ? currentData.year - 1 : currentData.year,
    daysInMonthAmount() {return getNumDaysInMonth(this.monthIndex)},
    daysForAddingAmount() {return weekDays.length - currentData.firstDayOfMonthWeekday()},

    daysNumsForAdding() {
      const allDaysNums: number[] = range(1, this.daysInMonthAmount())
      return allDaysNums.slice(-this.daysForAddingAmount() - 1)
    },

    datesForAdding() {return getDates(this.daysNumsForAdding(), this.monthIndex, this.year)}
  }

  const nextData: DateData = {
    monthIndex: currentData.isDec() ? 0 : currentData.monthIndex + 1,
    year: currentData.isDec() ? currentData.year + 1 : currentData.year,
    daysInMonthAmount() {return getNumDaysInMonth(this.monthIndex)},

    daysForAddingAmount() {
      const daysAfterMonth: number = calendarLength - prevData.daysForAddingAmount() - prevData.daysInMonthAmount()
      const nextDays: number = daysAfterMonth >= weekDays.length ? daysAfterMonth - weekDays.length : daysAfterMonth
      return nextDays
    },

    daysNumsForAdding() {
      const allDaysNums: number[] = range(1, this.daysInMonthAmount())
      return allDaysNums.slice(0, this.daysForAddingAmount() + 1)
    },

    datesForAdding() {return getDates(this.daysNumsForAdding(), this.monthIndex, this.year)}
  }

  return {
    days: [
      ...prevData.datesForAdding().slice(1),
      ...currentData.datesForAdding(),
      ...nextData.datesForAdding().slice(0, 1),
    ],
    monthFilter: `
      due after: ${prevData.datesForAdding()[0]} | due before: ${nextData.datesForAdding()[nextData.daysNumsForAdding().length - 1]}
    `,
  }
}

const daysInfo: DaysInfo = getDaysInfo(/* Date */)

export default daysInfo
