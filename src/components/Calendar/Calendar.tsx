import { useCallback, useEffect, useReducer, useState } from "react"
import { tasksAPI } from "@/api/todoAPI"
import { Task } from '@doist/todoist-api-typescript/dist/types/entities'
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

type DayState = {
  tasks: Task[],
}

const initialDayState: DayState = {
  tasks: [],
}

enum DayActionKind {
  SetTasks = 'SET_TASKS',
}

async function getTasks(filter) {
  const tasks = await tasksAPI.getTasks(filter)
  return tasks
}

function calendarDayReducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case DayActionKind.SetTasks:
      return data
    default:
      return state
  }
}

const TaskListProgress = styled(CircularProgress)(() => ({
  margin: '40px auto',
}))

const Calendar = () => {
  const [state, dispatch] = useReducer(calendarDayReducer, initialDayState)
  const [isLoading, setIsLoading] = useState(true)
  const [days, setDays] = useState([])
  const [monthDate, setMonthDate] = useState(new Date())
  const [monthFilter, setMonthFilter] = useState('')

  const setTasks = useCallback(async (filter = null) => {
    const tasks = await getTasks(filter)
    await dispatch({
      type: DayActionKind.SetTasks,
      data: { tasks },
    })
    setIsLoading(false)
  }, [])

  const getCalendarInfo =  useCallback((date = new Date()) => {
    const daysInfo = getDaysInfo(date)
    setDays(daysInfo.days)
    setMonthDate(date)
    setMonthFilter(daysInfo.monthFilter)
  }, [])

  useEffect(() => {
    getCalendarInfo(state.date)
  }, [getCalendarInfo, state.date])

  useEffect(() => {
    setTasks(monthFilter)
  }, [setTasks, monthFilter])

  return (
    <div className={CalendarCSS.calendar}>
      <MonthSelectForm date={monthDate} getCalendarInfo={getCalendarInfo} />
      <div className={CalendarCSS.days}>

        <Grid container rowSpacing={1} columnSpacing={1}>

          {weekDays.map((weekDay) => (<Grid item xs={1.7} sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }} key={weekDay}>
            <Typography
              variant="h6"
              sx={{ color: colors.mainTextColor, textAlign: 'center', }}
            >
              {weekDay}
            </Typography>
          </Grid>))}

          { isLoading ? <TaskListProgress /> : 

          days.map((dayDate: string) => {

            const dayTasks = state.tasks.filter(task => task.due.date === dayDate)

            return (<Grid item xs={1.7} key={dayDate}>
              <CalendarDay dayDate={dayDate} dayTasks={dayTasks} />
            </Grid>)
          })
        }

        </Grid>

      </div>
    </div>
  );
}

export default Calendar
