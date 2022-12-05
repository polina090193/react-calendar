import { range } from '@/helpers/mathHelpers'
import { months } from '@/consts/daysConsts'
import { weekDays, calendarLength } from '@/consts/daysConsts'

const getFirstDayOfMonth = (year, month) =>  new Date(year, month, 1)

const getDayNames = (nums, month) => nums.map(dayNum => `${months[month].name} ${dayNum}`)
 
const today = new Date()

// const currentDate = ... // make objects for curr, prev, next, and reduce variable names

const currentMonth: number = today.getMonth()
const currentMonthName: string = months[currentMonth].name
const currentYear: number = today.getFullYear()
const numDaysInCurrentMonth: number = months[currentMonth].daysNum

const firstDayOfMonthWeekday = getFirstDayOfMonth(currentYear, currentMonth).getDay()

const isCurrentMonthJan: boolean = currentMonth - 1 < 0
const isCurrentMonthDec: boolean = currentMonth === 11

const prevMonth: number = isCurrentMonthJan ? 11 : currentMonth - 1
const prevMonthName: string = months[prevMonth].name
const prevYear: number = isCurrentMonthJan ? currentYear - 1 : currentYear
const numDaysInPrevMonth: number = months[prevMonth].daysNum
const numDaysForAddingFromPrevMonth: number = weekDays.length - firstDayOfMonthWeekday

const getNumDaysForAddingFromNextMonth = (): number => {
  const daysAfterMonth: number = calendarLength - numDaysForAddingFromPrevMonth - numDaysInCurrentMonth
  // const daysAfterMonth: number = 42 - 3 - 31
  const nextDays: number = daysAfterMonth >= weekDays.length ? daysAfterMonth - weekDays.length : daysAfterMonth
  return nextDays
}

const nextMonth: number = isCurrentMonthDec ? 0 : currentMonth + 1
const nextMonthName: string = months[nextMonth].name
const nextYear: number = isCurrentMonthDec ? currentYear + 1 : currentYear
const numDaysInNextMonth: number = months[nextMonth].daysNum
const numDaysForAddingFromNextMonth: number = getNumDaysForAddingFromNextMonth()

// Make 1 function from next two?
const prevMonthDaysNums = (): number[] => {
  
  const prevMonthDays = range(1, numDaysInPrevMonth)
  return prevMonthDays.slice(-numDaysForAddingFromPrevMonth)
}

const nextMonthDaysNums = (): number[] => {
  const nextMonthDays = range(1, numDaysInNextMonth)
  return nextMonthDays.slice(0, numDaysForAddingFromNextMonth)
}


const getDaysNamesList = (): string[] => {
  // All above should be in this function when we will be able to change month
  const prevMonthDaysNames = getDayNames(prevMonthDaysNums(), prevMonth)
  const currMonthDaysNames = getDayNames(range(1, numDaysInCurrentMonth), currentMonth)
  const nextMonthDaysNames = getDayNames(nextMonthDaysNums(), nextMonth)
  

  return [...prevMonthDaysNames, ...currMonthDaysNames, ...nextMonthDaysNames]
}

const days = getDaysNamesList(/* date */) // date - for the future, to add an option for month changing (today or first day of next/prev month)

export default days
