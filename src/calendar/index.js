import CalendarNote from "./components/CalendarNote"
import './calendar.css';

function Calendar() {
  return (
    <div className="calendar-wrapper">
      <CalendarNote />
      <CalendarNote />
      <CalendarNote />
    </div>
  );
}

export default Calendar;