import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import TasksList from '../CalendarDay/TasksList/TasksList'
import Button from '@mui/material/Button'
import AddTask from './AddTask/AddTask'
import { styled } from '@mui/material/styles'
import { colors } from '@/consts/css'

const DayModal = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '20vw',
    maxHeight: '80vh',
    backgroundColor: colors.backgroundYellow,
    padding: 10,
  },
  color: colors.mainTextColor,
  border: `1px ${colors.middleYellow} solid`,
}))

const OpenAddTaskInputButton = styled(Button)(() => ({
  backgroundColor: colors.middleYellow,
  color: colors.mainTextColor,

  ':hover': {
    backgroundColor: colors.strongYellow,
  },
}))

const DayDialog = (props) => {

  const { onClose, open, tasks, setTasks, dayDate, isLoading } = props;
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
      <DialogTitle sx={{ color: colors.mainTextColor }}>{dayDate}</DialogTitle>

      <TasksList
        tasks={tasks}
        setTasks={setTasks}
        isDialog
        dayDate={dayDate}
        isLoading={isLoading}
      />

      {isAddTaskFormActive ?
        <AddTask dayDate={dayDate} closeAddTaskForm={closeAddTaskForm} setTasks={setTasks} />
        : <OpenAddTaskInputButton onClick={openAddTaskForm}>+</OpenAddTaskInputButton>}

    </DayModal>
  );
}


export default DayDialog;