import { months } from '@/consts/daysConsts'

export const isDateStringValidCheck = (dateString: string) => {
  return !isNaN(Date.parse(dateString))
}

export const makeDateTitle = (dayDate: string): string => {
  if (!isDateStringValidCheck(dayDate)) {
    throw new Error('Invalid date')
  }

  const dateObj = new Date(dayDate)
  const day = dateObj.getDate()
  const month = months.find((month, i) => i === dateObj.getMonth()).name
  const year = dateObj.getFullYear()
  return `${day} ${month} ${year}`
}

export const getFirstDayOfMonth = (year: number, month: number): number => new Date(year, month, 1).getDay()

export const adjustDate = (num: number): string => num.toString().length === 1 ? `0${num}` : num.toString()

export const getDates = (nums: number[], month: number, year: number): string[] => nums.map(dayNum => `${year}-${adjustDate(month + 1)}-${adjustDate(dayNum)}`)

export const getNumDaysInMonth = (monthIndex: number): number => months[monthIndex].daysNum

export const getPrevMonth = (monthIndex: number, year: number): MonthData => {
  const isCurrentMonthJan: boolean = monthIndex === 0
  const prevMonthIndex: number = isCurrentMonthJan ? 11 : monthIndex - 1
  const prevYear: number = isCurrentMonthJan ? year - 1 : year
  return { monthIndex: prevMonthIndex, year: prevYear }
}

export const getNextMonth = (monthIndex: number, year: number): MonthData => {
  const isCurrentMonthDec: boolean = monthIndex === 11
  const nextMonthIndex: number = isCurrentMonthDec ? 0 : monthIndex + 1
  const nextYear: number = isCurrentMonthDec ? year + 1 : year
  return { monthIndex: nextMonthIndex, year: nextYear }
}

export default { makeDateTitle, getFirstDayOfMonth, adjustDate, getDates, getNumDaysInMonth, getPrevMonth, getNextMonth }
