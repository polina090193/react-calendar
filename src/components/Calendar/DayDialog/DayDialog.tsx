import React from 'react'

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AddTask from '../AddTask/AddTask';

const DayDialog = (props) => {

  const { onClose, open } = props;
  const [isAddTaskFormActive, setIsAddTaskFormActive] = React.useState<boolean>(false);
  
  const handleClose = () => {
    onClose();
  };

  const openAddTaskForm = () => {
    setIsAddTaskFormActive(true);
  };

  const closeAddTaskForm = () => {
    setIsAddTaskFormActive(false);
  };
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.dayDate}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {props.tasksElements}
      </List>
      { isAddTaskFormActive && <AddTask dayDate={props.dayDate} closeAddTaskForm={closeAddTaskForm} setTasks={props.setTasks} /> }
      <button onClick={openAddTaskForm}>+</button>

    </Dialog>
  );
}


export default DayDialog;