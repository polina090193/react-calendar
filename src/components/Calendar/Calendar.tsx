import { useCallback, useEffect, useState } from "react"
import { tasksAPI } from "@/api/todoAPI"
import { weekDays } from '@/consts/daysConsts'
import getDaysInfo from "@/api/daysChoosing"

import Grid from '@mui/material/Grid'
import MonthSelectForm from "../MonthSelectForm/MonthSelectForm"
import CalendarDay from "./CalendarDay/CalendarDay"
import Typography from "@mui/material/Typography"
import CircularProgress from '@mui/material/CircularProgress'

import { styled } from '@mui/material/styles'
import CalendarCSS from './Calendar.module.css'
import { colors } from "@/consts/css"

async function getTasks(filter) {
  const tasks = await tasksAPI.getTasks(filter)
  return tasks
}

const TaskListProgress = styled(CircularProgress)(() => ({
  margin: '40px auto',
}))

const Calendar: React.FunctionComponent = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [days, setDays] = useState([])
  const [monthDate, setMonthDate] = useState(new Date())
  const [monthFilter, setMonthFilter] = useState('')

  const getTasksForCalendar = useCallback(async (filter = null) => {
    const loadedTasks = await getTasks(filter)
    setTasks(loadedTasks)
    setIsLoading(false)
  }, [])

  const getCalendarInfo = useCallback((date: Date = new Date()) => {
    const daysInfo = getDaysInfo(date)
    setDays(daysInfo.days)
    setMonthDate(date)
    setMonthFilter(daysInfo.monthFilter)
  }, [])

  useEffect(() => {
    getCalendarInfo(monthDate)
  }, [getCalendarInfo, monthDate])

  useEffect(() => {
    getTasksForCalendar(monthFilter)
  }, [getTasksForCalendar, monthFilter])

  return (
    <div className={CalendarCSS.calendar}>
      <MonthSelectForm date={monthDate} getCalendarInfo={getCalendarInfo} />
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
