import React/* , { useEffect } */ from 'react'
// import { useSelector, useDispatch } from 'react-redux'

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AddTask from '../AddTask/AddTask';

// import { fetchTasks, selectChangeTasksStatus } from '@/redux/tasksSlice'

const DayDialog = (props) => {
  // const dispatch = useDispatch()

  const { onClose, open } = props;
  // const changeTasksStatus = useSelector(selectChangeTasksStatus)
  const [isAddTaskFormActive, setIsAddTaskFormActive] = React.useState(false);
  
  const handleClose = () => {
    onClose();
  };

  const openAddTaskForm = () => {
    setIsAddTaskFormActive(true);
  };

  const closeAddTaskForm = () => {
    setIsAddTaskFormActive(false);
  };
  
  // useEffect(() => {
  //   if (changeTasksStatus === 'success') {
  //     console.log("changeTasksStatus === 'success'")
  //     dispatch(fetchTasks(props.dayDate))
  //   }
  // }, [changeTasksStatus, props.dayDate, dispatch])
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.dayDate}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {props.tasksElements}
      </List>
      { isAddTaskFormActive && <AddTask dayDate={props.dayDate} closeAddTaskForm={closeAddTaskForm} /> }
      <button onClick={openAddTaskForm}>+</button>

    </Dialog>
  );
}


export default DayDialog;