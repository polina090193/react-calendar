import CalendarDay from "./components/CalendarDay"
import { weekDays } from '@/consts/days'
import './calendar.css';

function Calendar() {
  return (
    <div className="calendar">
      <div className="weekdays">
        {weekDays}
      </div>
      <div className="days">
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