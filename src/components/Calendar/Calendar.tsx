import CalendarDay from "./CalendarDay/CalendarDay"
import { weekDays/* , calendarLength */ } from '@/consts/daysConsts'
import CalendarCSS from './Calendar.module.css'
import days from "@/api/daysChoosing"
import Grid from '@mui/material/Grid'
import Typography from "@mui/material/Typography"
import { colors } from "@/consts/css"

// const { /* firstDayOfMonthWeekday,  */days/* , numDaysInMonth */ } = daysInfo

/* const addEmptyDays = (num) => {
  return [...Array(num)].map((num, i) => (
    <Grid item xs={1.7} key={i}>
      <CalendarDay />
    </Grid>
  ))
} */

const Calendar = () => {
  return (
    <div className={CalendarCSS.calendar}>
      <div className={CalendarCSS.days}>

        <Grid container rowSpacing={1} columnSpacing={1}>

          {weekDays.map((weekDay) => (<Grid item xs={1.7} key={weekDay}>
            <Typography
              variant="h6"
              sx={{ color: colors.mainTextColor, textAlign: 'center', }}
            >
              {weekDay}
            </Typography>
          </Grid>))}

          {/* {addEmptyDays(emptyDaysBeginning)} */}

          {days.map((date) => (<Grid item xs={1.7} key={date}>
            <CalendarDay dayDate={date} />
          </Grid>))}

          {/* {addEmptyDays(emptyDaysEnd)} */}
        </Grid>

      </div>
    </div>
  );
}

export default Calendar
