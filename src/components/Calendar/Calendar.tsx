import CalendarDay from "./CalendarDay/CalendarDay"
import { weekDays } from '@/consts/daysConsts'
import CalendarCSS from './Calendar.module.css'
import days from "@/api/daysChoosing";
import Grid from '@mui/material/Grid';

const dates = weekDays.map((weekDay, index) => {
  return {weekDay, date: days[index]}
})

function Calendar() {
  return (
    <div className={CalendarCSS.calendar}>
      <div className={CalendarCSS.days}>

      <Grid container rowSpacing={1} columnSpacing={1}>
        {dates.map(({weekDay, date}) => (<Grid item xs={1.7} key={date}>
          <CalendarDay weekDay={weekDay} dayDate={date} />
        </Grid>) )}
      </Grid>

      </div>
    </div>
  );
}

export default Calendar;