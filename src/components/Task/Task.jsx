import Checkbox from "@mui/material/Checkbox"
import taskCss from './Task.module.css'
import { Box } from "@mui/material";

// const tasksElements = tasks.map(task => <Task key={task.id} id={task.id} content={task.content} />)

const Task = props => (
  <Box>
    <li className={taskCss.task} key={props.id}>
      <Checkbox /> {props.content}
    </li>
  </Box>
);

export default Task;