import React, { useEffect, useReducer } from 'react'
import { tasksAPI } from "@/api/todoAPI"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { styled } from '@mui/material/styles';
import yellow from "@mui/material/colors/yellow"
import CalendarDayCss from './CalendarDay.module.css'

import TasksList from "@/components/Calendar/CalendarDay/TasksList/TasksList";
import DayDialog from '../DayDialog/DayDialog'

const paperSizes = {
  height: '15vh',
  titlePadding: '5px 10px',
}

const CalendarPaper = styled(Paper)(() => ({
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
  loadingTasksStatus: boolean,
}

const initialDayState: DayState = {
  tasks: [],
  loadingTasksStatus: true,
}

enum DayActionKind {
  SetTasks = 'SET_TASKS',
}

function calendarDayReducer(state, action) {
  const {type, data} = action;
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
  const [state, dispatch] = useReducer(calendarDayReducer, initialDayState);
  
  async function setTasks(dayDate) {
    getTasks(dayDate).then(tasks => dispatch({
        type: DayActionKind.SetTasks,
        data: { loadingTasksStatus: false, tasks: tasks }
      })
    )
  }

  useEffect(() => {
    setTasks(props.dayDate)
  }, [props.dayDate]);

  const [openDay, setOpenDay] = React.useState(false);

  const handleClickOpenDay = () => {
    setOpenDay(true);
  };

  const handleCloseDay = () => {
    setOpenDay(false);
  };

  return (
    <CalendarPaper>
      <Typography variant="h6" sx={{ cursor: 'pointer', padding: paperSizes.titlePadding }} onClick={handleClickOpenDay}>{props.weekDay}</Typography>
      <TasksList className={CalendarDayCss.tasksList} tasks={state.tasks} setTasks={setTasks} />
      <DayDialog
        open={openDay}
        onClose={handleCloseDay}
        tasks={state.tasks}
        dayDate={props.dayDate}
        setTasks={setTasks}
        isDialog
      />
    </CalendarPaper>
  );
}

export default CalendarDay;