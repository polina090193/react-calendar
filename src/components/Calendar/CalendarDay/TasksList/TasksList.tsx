import { List } from "@mui/material"
import Task from "../Task/Task"

type TasksListProps = {
  tasks: Task[],
  updateTasks: (dayDate: string) => void,
  isDialog?: boolean,
  className?: string,
  dayDate: string,
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  updateTasks,
  isDialog = false,
  className,
  dayDate
}): JSX.Element => {

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