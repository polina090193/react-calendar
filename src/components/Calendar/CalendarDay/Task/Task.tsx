import React from 'react'
import Checkbox from "@mui/material/Checkbox"
import { tasksAPI } from "@/api/todoAPI"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material'
import { colors } from '@/consts/css'

const TaskListItemIcon = styled(ListItemIcon)(() => ({
  minWidth: 'unset',
  height: 30,
}))

const ClosingTaskProgress = styled(CircularProgress)(() => ({
  margin: '5px 12px 0 10px',
}))

const Task = props => {
  const { id, dayDate, content, isDialog, setTasks } = props
  const [taskIsClosing, setTaskIsClosing] = React.useState<boolean>(false);

  const closeTask = async () => {
    setTaskIsClosing(true)
    await tasksAPI.closeTask(id)
    await setTasks(dayDate)
    setTaskIsClosing(false)
  }

  return (
    <ListItemButton component="a" disableGutters sx={{ padding: '1px', color: colors.mainTextColor }}>
      <TaskListItemIcon>
        {taskIsClosing ? <ClosingTaskProgress size={20} /> : <Checkbox onChange={closeTask} />}
      </TaskListItemIcon>
      <ListItemText primary={content} primaryTypographyProps={{ fontSize: isDialog ? '1 rem' : '0.8rem' }} />
    </ListItemButton>
  );
}

export default Task
