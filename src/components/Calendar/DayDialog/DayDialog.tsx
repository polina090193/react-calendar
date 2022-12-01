import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import TasksList from '../CalendarDay/TasksList/TasksList'
import Button from '@mui/material/Button'
import AddTask from './AddTask/AddTask'
import { styled } from '@mui/material/styles'
import yellow from "@mui/material/colors/yellow"

const DayModal = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '20vw',
    height: '80vh',
    backgroundColor: yellow[100],
    padding: 10,
  },
  color: '#20b2aa',
  border: `1px ${yellow[200]} solid`,
}))

const OpenAddTaskInputButton = styled(Button)(() => ({
  backgroundColor: yellow[200],
  color: '#20b2aa',

  ':hover': {
    backgroundColor: yellow[300],
  },
}))

const DayDialog = (props) => {

  const { onClose, open, tasks, setTasks, dayDate } = props;
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
    <DayModal onClose={handleClose} open={open}>
      <DialogTitle>{dayDate}</DialogTitle>

      <TasksList tasks={tasks} setTasks={setTasks} isDialog dayDate={dayDate} />

      {isAddTaskFormActive ?
        <AddTask dayDate={dayDate} closeAddTaskForm={closeAddTaskForm} setTasks={setTasks} />
        : <OpenAddTaskInputButton onClick={openAddTaskForm}>+</OpenAddTaskInputButton>}

    </DayModal>
  );
}


export default DayDialog;