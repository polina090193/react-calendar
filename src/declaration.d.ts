declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

type Task = import('@doist/todoist-api-typescript/dist/types/entities').Task

type MathFunc = (num: number, i: number) => number

interface TasksAPI {
  getTasks: (filter: string | null) => Promise<Task[]>,
  addTask: (dayDate: string, taskTitle: string) => Promise<Task>,
  closeTask: (id: string) => Promise<boolean>,
}

interface MonthData {
  monthIndex: number,
  year: number,
  getDaysInMonthAmount?: () => number,
  getWeekdayOfFirstDay?: () => number,
  getDaysForAddingAmount?: () => number,
  getDaysNumsForAdding?: () => number[],
  getDatesForAdding?: () => string[],
  getFirstDate?: () => string,
  getLastDate?: () => string,
}

interface DaysInfo {
  days: string[],
  monthFilter: string,
}