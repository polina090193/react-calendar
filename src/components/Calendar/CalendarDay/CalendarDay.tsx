import React, { useEffect, useReducer } from 'react'
import { tasksAPI } from "@/api/todoAPI"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { styled } from '@mui/material/styles'
import CalendarDayCss from './CalendarDay.module.css'
import { colors } from '@/consts/css'

import TasksList from "@/components/Calendar/CalendarDay/TasksList/TasksList"
import DayDialog from '../DayDialog/DayDialog'

const paperSizes = {
  height: 200,
  titlePadding: '5px 10px 0',
}

const CalendarPaper = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.backgroundYellow,
  color: colors.mainTextColor,
  height: paperSizes.height,
  border: `1px ${colors.middleYellow} solid`,

  ':hover': {
    backgroundColor: colors.middleYellow,
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
  const { dayDate } = props
  const [state, dispatch] = useReducer(calendarDayReducer, initialDayState)
  const [isLoading, setIsLoading] = React.useState(true)

  const setTasks = async (dayDate) => {
    if (!dayDate) {
      setIsLoading(false)
      return
    }
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
      <Typography
        variant="h6"
        sx={{
          cursor: 'pointer',
          padding: paperSizes.titlePadding
        }}
        onClick={handleClickOpenDay}>{dayDate}
      </Typography>

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