import Checkbox from "@mui/material/Checkbox"
import taskCss from './Task.module.css'
import { Box } from "@mui/material";
import { tasksAPI } from "@/api/todoAPI"

const Task = props => {
  const closeTask = () => {
    tasksAPI.closeTask(props.id).then(() => props.setTasks(props.dayDate))
  }

  return (
    <Box>
      <li className={taskCss.task} key={props.id}>
        <Checkbox onChange={closeTask} /> {props.content}
      </li>
    </Box>
  );
} 

export default Task;