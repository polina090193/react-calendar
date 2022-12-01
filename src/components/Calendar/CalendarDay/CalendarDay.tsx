import React, { useEffect, useReducer } from 'react'
import { tasksAPI } from "@/api/todoAPI"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { styled } from '@mui/material/styles'
import yellow from "@mui/material/colors/yellow"
import CalendarDayCss from './CalendarDay.module.css'

import TasksList from "@/components/Calendar/CalendarDay/TasksList/TasksList"
import DayDialog from '../DayDialog/DayDialog'

const paperSizes = {
  height: 200,
  titlePadding: '5px 10px 0',
}

const CalendarPaper = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: yellow[100],
  color: '#20b2aa',
  height: paperSizes.height,
  border: `1px ${yellow[200]} solid`,

  ':hover': {
    backgroundColor: yellow[200],
    color: '#2e8b57',
  }
}))

type DayState = {
  tasks: [],
}

const initialDayState: DayState = {
  tasks: [],
}

enum DayActionKind {
  SetTasks = 'SET_TASKS',
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

async function getTasks(dayDate) {
  const tasks = await tasksAPI.getTasks(dayDate)
  return tasks
}

const CalendarDay = (props) => {
  const { dayDate, weekDay } = props
  const [state, dispatch] = useReducer(calendarDayReducer, initialDayState)
  const [isLoading, setIsLoading] = React.useState(true)

  const setTasks = async (dayDate) => {
    const tasks = await getTasks(dayDate)
    await dispatch({
      type: DayActionKind.SetTasks,
      data: { tasks }
    })
    setIsLoading(false)
  }

  useEffect(() => {
    setTasks(dayDate)
  }, [dayDate]);

  const [openDay, setOpenDay] = React.useState(false)

  const handleClickOpenDay = () => {
    setOpenDay(true);
  };

  const handleCloseDay = () => {
    setOpenDay(false);
  };

  return (
    <CalendarPaper>
      <Typography variant="h6" sx={{ cursor: 'pointer', padding: paperSizes.titlePadding }} onClick={handleClickOpenDay}>{weekDay}</Typography>

      <TasksList
        className={CalendarDayCss.tasksList}
        tasks={state.tasks}
        setTasks={setTasks}
        dayDate={dayDate}
        isLoading={isLoading}
      />

      <DayDialog
        open={openDay}
        onClose={handleCloseDay}
        tasks={state.tasks}
        dayDate={dayDate}
        setTasks={setTasks}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        isDialog
      />
    </CalendarPaper>
  );
}

export default CalendarDay;