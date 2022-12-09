type month = {
  id: number,
  name: string,
  daysNum: number,
}

const leapYear = (year) => {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export const months: month[] = [
  { id: 0, name: 'Jan', daysNum: 31 },
  { id: 1, name: 'Feb', daysNum: leapYear(new Date().getFullYear()) ? 29 : 28 },
  { id: 2, name: 'Mar', daysNum: 31 },
  { id: 3, name: 'Apr', daysNum: 30 },
  { id: 4, name: 'May', daysNum: 31 },
  { id: 5, name: 'Jun', daysNum: 30 },
  { id: 6, name: 'Jul', daysNum: 31 },
  { id: 7, name: 'Aug', daysNum: 31 },
  { id: 8, name: 'Sep', daysNum: 30 },
  { id: 9, name: 'Oct', daysNum: 31 },
  { id: 10, name: 'Nov', daysNum: 30 },
  { id: 11, name: 'Dec', daysNum: 31 },
];

export const weekDays: string[] = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
]

export const calendarLength: number = 42

export default { months, weekDays, calendarLength }