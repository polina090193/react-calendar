type month = {
  name: string,
  daysNum: number,
}

const leapYear = (year) => {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export const months: month[] = [
  { name: 'Jan', daysNum: 31 },
  { name: 'Feb', daysNum: leapYear(new Date().getFullYear()) ? 29 : 28 },
  { name: 'Mar', daysNum: 31 },
  { name: 'Apr', daysNum: 30 },
  { name: 'May', daysNum: 31 },
  { name: 'Jun', daysNum: 30 },
  { name: 'Jul', daysNum: 31 },
  { name: 'Aug', daysNum: 31 },
  { name: 'Sep', daysNum: 30 },
  { name: 'Oct', daysNum: 31 },
  { name: 'Nov', daysNum: 30 },
  { name: 'Dec', daysNum: 31 },
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