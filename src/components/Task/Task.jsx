import Checkbox from "@mui/material/Checkbox"
import taskCss from './Task.module.css'
import { Box } from "@mui/material";
import { useDispatch } from 'react-redux'

import { closeTask } from '@/redux/tasksSlice'

const Task = props => {
  const dispatch = useDispatch()

  const handleCloseTask = () => {
    dispatch(closeTask({id: props.id, dayDate: props.dayDate}))
  }

  return (
    <Box>
      <li className={taskCss.task} key={props.id}>
        <Checkbox onChange={handleCloseTask} /> {props.content}
      </li>
    </Box>
  );
} 

export default Task;