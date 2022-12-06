import React from 'react'
import { tasksAPI } from "@/api/todoAPI"

import Checkbox from "@mui/material/Checkbox"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import CircularProgress from '@mui/material/CircularProgress'

import { styled } from '@mui/material/styles';
import { colors } from '@/consts/css'

const TaskListItemIcon = styled(ListItemIcon)(() => ({
  minWidth: 'unset',
  height: 30,
}))

const ClosingTaskProgress = styled(CircularProgress)(() => ({
  margin: '5px 12px 0 10px',
}))

const Task = props => {
  const { id, dayDate, content, isDialog, updateTasks } = props
  const [taskIsClosing, setTaskIsClosing] = React.useState<boolean>(false);

  const closeTask = async () => {
    setTaskIsClosing(true)
    await tasksAPI.closeTask(id)
    await updateTasks(dayDate)
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
