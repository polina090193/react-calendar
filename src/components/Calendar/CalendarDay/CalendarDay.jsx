import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SizesConsts from "@/consts/sizes"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { styled } from '@mui/material/styles';
import yellow from "@mui/material/colors/yellow"

import Task from "@/components/Task/Task";
import DayDialog from '../DayDialog/DayDialog'

import { fetchTasks, selectTasks, selectTasksLoadingStatus } from '@/redux/tasksSlice'

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

const CalendarDay = (props) => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectTasks)
  const tasksLoadingStatus = useSelector(selectTasksLoadingStatus)

  useEffect(() => {
    if (tasksLoadingStatus === 'idle') {
      dispatch(fetchTasks(props.dayDate))
    }
  }, [tasksLoadingStatus, props.dayDate, dispatch])

  const tasksElements = tasks[props.dayDate]?.map(task => <Task key={task.id} id={task.id} dayDate={props.dayDate} content={task.content} />)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <CalendarPaper>
      <Typography variant="h5" sx={{cursor: 'pointer'}} onClick={handleClickOpen}>{props.weekDay}</Typography>
      <ul>{ tasksElements }</ul>
      <DayDialog
        open={open}
        onClose={handleClose}
        tasksElements={tasksElements}
        dayDate={props.dayDate}
      />
    </CalendarPaper>
  );
}

export default CalendarDay;