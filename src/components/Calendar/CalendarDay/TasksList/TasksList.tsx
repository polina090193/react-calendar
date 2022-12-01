import { List } from "@mui/material"
import Task from "../Task/Task"
import { styled } from '@mui/material/styles'
import { CircularProgress } from '@mui/material'

const TaskListProgress = styled(CircularProgress)(() => ({
  margin: 'auto',
}))

const TasksList = props => {
  const { tasks, setTasks, isDialog, className, dayDate, isLoading } = props

  return isLoading ? <TaskListProgress /> : (
    <List className={className}>
      {
        tasks?.map(taskItem => (
          <Task
            key={taskItem.id}
            id={taskItem.id}
            content={taskItem.content}
            dayDate={dayDate}
            setTasks={setTasks}
            isDialog={isDialog}
          />
        ))
      }
    </List>
  )
}

export default TasksList;