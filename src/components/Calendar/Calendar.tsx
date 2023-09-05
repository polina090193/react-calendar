import { useCallback, useEffect, useState } from "react"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from 'react-dnd'
import { tasksAPI } from "@/api/todoAPI"
import { weekDays } from '@/consts/daysConsts'
import getDaysInfo from "@/helpers/getDaysInfo"

import Grid from '@mui/material/Grid'
import MonthSelectForm from "../MonthSelectForm/MonthSelectForm"
import CalendarDay from "./CalendarDay/CalendarDay"
import Typography from "@mui/material/Typography"

import CalendarCSS from './Calendar.module.css'
import { colors } from "@/consts/css"
import TaskListProgress from "../TaskListProgress/TaskListProgress"

const Calendar: React.FunctionComponent = (): JSX.Element => {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [days, setDays] = useState<Array<string>>([])
  const [monthDate, setMonthDate] = useState<Date>(new Date())
  const [monthFilter, setMonthFilter] = useState<string>('')

  const updateTasksListForCalendar = useCallback(async (filter = null): Promise<void> => {
    const loadedTasks: Task[] = await tasksAPI.getTasks(filter)
    
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
    updateTasksListForCalendar(monthFilter)
  }, [updateTasksListForCalendar, monthFilter])

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  )
}

export default Calendar
