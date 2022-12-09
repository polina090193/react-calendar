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

export default { makeDateTitle, getFirstDayOfMonth, adjustDate, getDates, getNumDaysInMonth }
