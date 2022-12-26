import React, { useEffect } from 'react'
import { tasksAPI } from "@/api/todoAPI"
import { Task } from '@doist/todoist-api-typescript/dist/types/entities'

import { styled } from '@mui/material/styles'
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import CalendarDayCss from './CalendarDay.module.css'
import { colors } from '@/consts/css'

import TasksList from "@/components/Calendar/CalendarDay/TasksList/TasksList"
import DayDialog from '../DayDialog/DayDialog'

import { makeDateTitle } from '@/helpers/dateHelpers'

const paperSizes = {
  height: 200,
  titlePadding: '5px 10px 0',
}

const CalendarPaper = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.backgroundYellow,
  color: colors.mainTextColor,
  height: paperSizes.height,
  border: `1px ${colors.middleYellow} solid`,

  ':hover': {
    backgroundColor: colors.middleYellow,
  }
}))

const getTasks = async (dayDate: string): Promise<Task[]> => {
  const tasks = await tasksAPI.getTasks(dayDate)
  return tasks

}
type CalendarDayProps = {
  dayDate: string,
  dayTasks: Task[],
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  dayDate,
  dayTasks
}): JSX.Element => {
  const [tasks, setTasks] = React.useState<Array<Task>>()
  
  const updateTasks = async (): Promise<Task[]> => {
    if (!dayDate) return
    const gottenTasks: Task[] = await getTasks(dayDate)
    setTasks(gottenTasks)
  }

  const dayTitle: string = makeDateTitle(dayDate)

  useEffect(() => {
    setTasks(dayTasks)
  }, [dayTasks])

  const [openDay, setOpenDay] = React.useState<boolean>(false)

  const handleClickOpenDay = (): void => {
    setOpenDay(true)
  }

  const handleCloseDay = (): void => {
    setOpenDay(false)
  }

  return (
    <CalendarPaper>
      <Typography
        variant="h6"
        sx={{
          cursor: 'pointer',
          padding: paperSizes.titlePadding
        }}
        role="heading"
        onClick={handleClickOpenDay}>{dayTitle}
      </Typography>

      <TasksList
        className={CalendarDayCss.tasksList}
        tasks={tasks}
        updateTasks={updateTasks}
        dayDate={dayDate}
      />

      <DayDialog
        open={openDay}
        onClose={handleCloseDay}
        tasks={tasks}
        dayTitle={dayTitle}
        dayDate={dayDate}
        updateTasks={updateTasks}
      />
    </CalendarPaper>
  )
}

export default CalendarDay