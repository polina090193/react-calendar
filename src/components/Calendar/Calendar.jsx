import CalendarDay from "./CalendarDay/CalendarDay"
import { weekDays } from '@/consts/days'
import CalendarCss from './Calendar.module.css'

function Calendar() {
  return (
    <div className={CalendarCss.calendar}>
      <div className={CalendarCss.weekdays}>
        {weekDays}
      </div>
      <div className={CalendarCss.days}>
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
      </div>
    </div>
  );
}

export default Calendar;