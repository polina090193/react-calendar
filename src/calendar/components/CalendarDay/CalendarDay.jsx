import SizesConsts from "@/consts/sizes"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { styled } from '@mui/material/styles';
import yellow from "@mui/material/colors/yellow"
import tasks from '@/fakeData/tasks'

const tasksElements = tasks.map(task => <div>{task.content}</div>)

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

function CalendarDay() {

  return (
    <CalendarPaper>
      <Typography variant="h5">Default Paper</Typography>
      <div>{tasksElements}</div>
    </CalendarPaper>
  );
}

export default CalendarDay;