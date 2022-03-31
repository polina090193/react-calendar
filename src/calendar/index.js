import CalendarDay from "./components/CalendarDay"
import { weekDays } from '@/consts/days'
import './calendar.css';

function Calendar() {
  return (
    <div className="calendar-wrapper">
      <div className="weekdays-wrapper">
        {weekDays}
      </div>
      <div className="days-wrapper">
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