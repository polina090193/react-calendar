import SizesConsts from "@/consts/sizes"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { styled } from '@mui/material/styles';
import yellow from "@mui/material/colors/yellow"

const noteSizes = {
  width: '20%',
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

function CalendarNote() {

  return (
    <CalendarPaper>
      <Typography variant="h5">Default Paper</Typography>
    </CalendarPaper>
  );
}

export default CalendarNote;