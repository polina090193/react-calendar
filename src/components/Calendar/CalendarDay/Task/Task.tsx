import Checkbox from "@mui/material/Checkbox"
import { tasksAPI } from "@/api/todoAPI"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { styled } from '@mui/material/styles';

const TaskListItemIcon = styled(ListItemIcon)`
  min-width: unset;
`;

const Task = props => {
  const { id, dayDate, content, isDialog, setTasks } = props

  const closeTask = () => {
    tasksAPI.closeTask(id).then(() => setTasks(dayDate))
  }

  return (
    <ListItemButton component="a" href="#simple-list" disableGutters sx={{ padding: '1px' }}>
      <TaskListItemIcon>
        <Checkbox onChange={closeTask} />
      </TaskListItemIcon>
      <ListItemText primary={content} primaryTypographyProps={{ fontSize: isDialog ? '1 rem' : '0.8rem' }} />
    </ListItemButton>
  );
}

export default Task;