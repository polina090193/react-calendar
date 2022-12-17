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

type DayDialogProps = {
  onClose: () => void,
  open: boolean,
  tasks: Task[],
  updateTasks: (dayDate: string) => void,
  dayDate: string,
  dayTitle: string,
}

const DayDialog: React.FC<DayDialogProps> = ({
  onClose,
  open,
  tasks,
  updateTasks,
  dayDate,
  dayTitle,
}): JSX.Element => {
  const [isAddTaskFormActive, setIsAddTaskFormActive] = React.useState<boolean>(false)

  const handleClose = (): void => {
    onClose()
  }

  const openAddTaskForm = () => {
    setIsAddTaskFormActive(true)
  }

  const closeAddTaskForm = () => {
    setIsAddTaskFormActive(false)
  }

  return (
    <DayModal onClose={handleClose} open={open}>
      <DialogTitle sx={{ color: colors.mainTextColor }}>{dayTitle}</DialogTitle>

      <TasksList
        tasks={tasks}
        updateTasks={updateTasks}
        isDialog
        dayDate={dayDate}
      />

      {isAddTaskFormActive ?
        <AddTask dayDate={dayDate} closeAddTaskForm={closeAddTaskForm} updateTasks={updateTasks} />
        : <OpenAddTaskInputButton onClick={openAddTaskForm}>+</OpenAddTaskInputButton>}

    </DayModal>
  )
}


export default DayDialog