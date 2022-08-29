import React, { useEffect, useReducer } from 'react'
import { tasksAPI } from "@/api"
import SizesConsts from "@/consts/sizes"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { styled } from '@mui/material/styles';
import yellow from "@mui/material/colors/yellow"

import Task from "@/components/Task/Task";
import DayDialog from '../DayDialog/DayDialog'

const noteSizes = {
  width: '10%',
  height: '20%',
}

const CalendarPaper = styled(Paper)`
  background-color: ${yellow[200]};
  color: #20b2aa;
  width: ${noteSizes.width};
  height: ${noteSizes.height};
  padding: ${SizesConsts.defaultPadding};

  :hover {
    color: #2e8b57;
  }
`;

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

  const tasksElements = state.tasks?.map(task => (
    <Task 
      key={task.id}
      id={task.id}
      dayDate={props.dayDate}
      content={task.content}
      setTasks={setTasks}
    />
  ))

  const [openDay, setOpenDay] = React.useState(false);

  const handleClickOpenDay = () => {
    setOpenDay(true);
  };

  const handleCloseDay = () => {
    setOpenDay(false);
  };

  return (
    <CalendarPaper>
      <Typography variant="h5" sx={{ cursor: 'pointer' }} onClick={handleClickOpenDay}>{props.weekDay}</Typography>
      <ul>{tasksElements}</ul>
      <DayDialog
        open={openDay}
        onClose={handleCloseDay}
        tasksElements={tasksElements}
        dayDate={props.dayDate}
        setTasks={setTasks}
      />
    </CalendarPaper>
  );
}

export default CalendarDay;