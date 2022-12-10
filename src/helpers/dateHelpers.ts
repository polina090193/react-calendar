import { months } from '@/consts/daysConsts'

export const makeDateTitle = (dayDate) => {
  const dateObj = new Date(dayDate)
  const day = dateObj.getDate()
  const month = months.find((month, i) => i === dateObj.getMonth()).name
  const year = dateObj.getFullYear()
  return `${day} ${month} ${year}`
}

export const getFirstDayOfMonth = (year, month) => {
  const weekDay = new Date(year, month, 1).getDay()
  const weekDayWithSunday = weekDay/*  === 0 ?  */
  return weekDayWithSunday
}

export const adjustDate = num => num.toString().length === 1 ? `0${num}` : num

export const getDates = (nums, month, year) => nums.map(dayNum => `${year}-${adjustDate(month + 1)}-${adjustDate(dayNum)}`)

export const getNumDaysInMonth = monthIndex => months[monthIndex].daysNum

export const getPrevMonth = (monthIndex, year) => {
  const isCurrentMonthJan: boolean = monthIndex === 0
  const prevMonthIndex: number = isCurrentMonthJan ? 11 : monthIndex - 1
  const prevYear: number = isCurrentMonthJan ? year - 1 : year
  return { prevMonthIndex, prevYear }
}

export const getNextMonth = (monthIndex, year) => {
  const isCurrentMonthDec: boolean = monthIndex === 11
  const nextMonthIndex: number = isCurrentMonthDec ? 0 : monthIndex + 1
  const nextYear: number = isCurrentMonthDec ? year + 1 : year
  return { nextMonthIndex, nextYear }
}

export default { makeDateTitle, getFirstDayOfMonth, adjustDate, getDates, getNumDaysInMonth, getPrevMonth, getNextMonth }
