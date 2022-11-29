import { range } from '@/helpers/mathHelpers'
import { months } from '@/consts/daysConsts'

const currentMonth = months[new Date('2022/12/01').getMonth()]
const currentMonthName = currentMonth.name
const numDaysInMonth = currentMonth.daysNum

const daysNumbers = range(1, numDaysInMonth)

const days = daysNumbers.map(num => `${currentMonthName} ${num}`)

export default days
