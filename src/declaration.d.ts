declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

interface DateData {
    monthIndex: number,
    year: number,
    daysInMonthAmount?: () => number,
    firstDayOfMonthWeekday?: () => number,
    daysForAddingAmount?: () => number,
    daysNumsForAdding?: () => number[],
    datesForAdding?: () => string[],
  }

  interface DaysInfo {
    days: string[],
    monthFilter: string,
  }