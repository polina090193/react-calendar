import { memo, useCallback, useEffect, useState } from "react"
import { tasksAPI } from "@/api/todoAPI"
import { weekDays } from '@/consts/daysConsts'
import getDaysInfo from "@/helpers/daysChoosing"

import Grid from '@mui/material/Grid'
import MonthSelectForm from "../MonthSelectForm/MonthSelectForm"
import CalendarDay from "./CalendarDay/CalendarDay"
import Typography from "@mui/material/Typography"
import CircularProgress from '@mui/material/CircularProgress'

import { styled } from '@mui/material/styles'
import CalendarCSS from './Calendar.module.css'
import { colors } from "@/consts/css"

async function getTasks(filter: string): Promise<Task[]> {
  const tasks: Task[] = await tasksAPI.getTasks(filter)
  return tasks
}

const TaskListProgress = memo(styled(CircularProgress)(() => ({
  margin: '40px auto',
})))

const Calendar: React.FunctionComponent = (): JSX.Element => {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [days, setDays] = useState<Array<string>>([])
  const [monthDate, setMonthDate] = useState<Date>(new Date())
  const [monthFilter, setMonthFilter] = useState<string>('')

  const getTasksForCalendar = useCallback(async (filter = null): Promise<void> => {
    const loadedTasks: Task[] = await getTasks(filter)
    
    setTasks(loadedTasks)
    setIsLoading(false)
  }, [])

  const setCalendarInfo = useCallback((date: Date = monthDate, daysInfo: DaysInfo): void => {
    setDays(daysInfo.days)
    setMonthDate(date)
    setMonthFilter(daysInfo.monthFilter)
  }, [])

  useEffect(() => {
    const daysInfo: DaysInfo = getDaysInfo(monthDate)
    setCalendarInfo(monthDate, daysInfo)
  }, [setCalendarInfo, monthDate])

  useEffect(() => {
    getTasksForCalendar(monthFilter)
  }, [getTasksForCalendar, monthFilter])

  return (
    <div className={CalendarCSS.calendar}>
      <MonthSelectForm selectedDate={monthDate} setCalendarInfo={setCalendarInfo} />
      <div className={CalendarCSS.days}>

        <Grid container rowSpacing={1} columnSpacing={1}>

          {weekDays.map((weekDay) => (<Grid item xs={1.7} sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }} key={weekDay}>
            <Typography
              role="weekday"
              variant="h6"
              sx={{ color: colors.mainTextColor, textAlign: 'center', }}
            >
              {weekDay}
            </Typography>
          </Grid>))}

          { isLoading ? <TaskListProgress /> : 

          days.map((dayDate: string) => {

            const dayTasks = tasks.filter(task => task.due.date === dayDate)

            return (<Grid item xs={1.7} key={dayDate}>
              <CalendarDay dayDate={dayDate} dayTasks={dayTasks} />
            </Grid>)
          })
        }

        </Grid>

      </div>
    </div>
  )
}

export default Calendar
