import { List } from "@mui/material"
import Task from "../Task/Task"

const TasksList = props => {
  const { tasks, updateTasks, isDialog, className, dayDate } = props

  return (
    <List className={className}>
      {
        tasks?.map(taskItem => (
          <Task
            key={taskItem.id}
            id={taskItem.id}
            content={taskItem.content}
            dayDate={dayDate}
            updateTasks={updateTasks}
            isDialog={isDialog}
          />
        ))
      }
    </List>
  )
}

export default TasksList