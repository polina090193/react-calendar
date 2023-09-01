import { rangeAbsolute } from '@/helpers/mathHelpers'
import { weekDays, calendarLength } from '@/consts/daysConsts'
import { getFirstDayOfMonth, getDates, getNumDaysInMonth, getPrevMonth, getNextMonth } from '@/helpers/dateHelpers'

const getDaysInfo = (currentDate: Date = new Date()): DaysInfo => {
  const currentData: MonthData = {
    monthIndex: currentDate.getMonth(),
    year: currentDate.getFullYear(),
    getDaysInMonthAmount() {return getNumDaysInMonth(this.monthIndex)},
    getWeekdayOfFirstDay() {return getFirstDayOfMonth(this.year, this.monthIndex)},
    getDatesForAdding() {return getDates(rangeAbsolute(1, this.getDaysInMonthAmount()), this.monthIndex, this.year)},
    getFirstDate() {return this.getDatesForAdding()[0]},
    getLastDate() {return this.getDatesForAdding()[this.getDatesForAdding().length - 1]},
  }

  const prevData: MonthData = {
    monthIndex: getPrevMonth(currentData.monthIndex, currentData.year).monthIndex,
    year: getPrevMonth(currentData.monthIndex, currentData.year).year,
    getDaysInMonthAmount() {return getNumDaysInMonth(this.monthIndex)},
    getDaysForAddingAmount() {
      const firstDayOfCurrentMonth = currentData.getWeekdayOfFirstDay()
      return firstDayOfCurrentMonth === 0 ? 6 : weekDays.length - (weekDays.length - firstDayOfCurrentMonth) - 1
    },

    getDaysNumsForAdding() {
      const allDaysNums: number[] = rangeAbsolute(1, this.getDaysInMonthAmount())
      return allDaysNums.slice(-this.getDaysForAddingAmount() - 1)
    },

    getDatesForAdding() {return getDates(this.getDaysNumsForAdding(), this.monthIndex, this.year).slice(1)},
    getFirstDate() {return this.getDatesForAdding()[0]},
  }

  const nextData: MonthData = {
    monthIndex: getNextMonth(currentData.monthIndex, currentData.year).monthIndex,
    year: getNextMonth(currentData.monthIndex, currentData.year).year,
    getDaysInMonthAmount() {return getNumDaysInMonth(this.monthIndex)},

    getDaysForAddingAmount() {
      const daysAfterMonth: number = calendarLength - prevData.getDaysForAddingAmount() - currentData.getDaysInMonthAmount()
      const nextDays: number = daysAfterMonth >= weekDays.length ? daysAfterMonth - weekDays.length : daysAfterMonth
      return nextDays
    },

    getDaysNumsForAdding() {
      const allDaysNums: number[] = rangeAbsolute(1, this.getDaysInMonthAmount())
      return allDaysNums.slice(0, this.getDaysForAddingAmount())
    },

    getDatesForAdding() {return getDates(this.getDaysNumsForAdding(), this.monthIndex, this.year)},
    getLastDate() {return this.getDatesForAdding()[this.getDatesForAdding().length - 1]},
  }

  const dueAfter = prevData.getFirstDate() || currentData.getFirstDate()
  const dueBefore = nextData.getLastDate() || currentData.getLastDate()

  return {
    days: [
      ...prevData.getDatesForAdding(),
      ...currentData.getDatesForAdding(),
      ...nextData.getDatesForAdding(),
    ],
    monthFilter: `
      due after: ${dueAfter} | due before: ${dueBefore}
    `,
  }
}

export default getDaysInfo
