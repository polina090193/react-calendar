import * as React from 'react';
import SizesConsts from "@/consts/sizes"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { styled } from '@mui/material/styles';
import yellow from "@mui/material/colors/yellow"
// import tasks from '@/fakeData/tasks'
import { TodoistApi } from '@doist/todoist-api-typescript'

import Task from "@/components/Task/Task";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';

const todoAPI = new TodoistApi('7716d8a22975bcfb4e28ffb524e54fef937b616d')

const noteSizes = {
  width: '10%',
  height: '20%',
}

const CalendarPaper = styled(Paper)`
background-color: ${yellow[200]};
color: #20b2aa;
width: ${noteSizes.width};
height: ${noteSizes.height};
padding: ${SizesConsts.defaultPadding};

:hover {
  color: #2e8b57;
}
`;

const CalendarDay = (props) => {
  
  let tasksElements = []
  
  const updateTasks = (tasks) => {
    tasksElements = tasks.map(task => <Task key={task.id} id={task.id} content={task.content} />)
  }
  
  todoAPI.getTasks({filter: props.dayDate}).then(res => {
    updateTasks(res)
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <CalendarPaper>
      <Typography variant="h5" sx={{cursor: 'pointer'}} onClick={handleClickOpen}>{props.weekDay}</Typography>
      <ul>{tasksElements}</ul>
      <DayDialog
        open={open}
        onClose={handleClose}
        tasksElements={tasksElements}
      />
    </CalendarPaper>
  );
}

const DayDialog = (props) => {

  const { onClose, open } = props;
  
  const handleClose = () => {
    onClose();
  };
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Tasks</DialogTitle>
      <List sx={{ pt: 0 }}>
        {props.tasksElements}
      </List>
    </Dialog>
  );
}


export default CalendarDay;