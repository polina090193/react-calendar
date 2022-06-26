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
        <CalendarDay weekDay="M" dayDate="2022/06/27" />
        <CalendarDay weekDay="Tu" dayDate="2022/06/28" />
        <CalendarDay weekDay="W" dayDate="2022/06/29" />
        <CalendarDay weekDay="Th" dayDate="2022/06/30" />
        <CalendarDay weekDay="F" dayDate="2022/07/01" />
        <CalendarDay weekDay="Sa" dayDate="2022/07/02" />
        <CalendarDay weekDay="Su" dayDate="2022/07/03" />
      </div>
    </div>
  );
}

export default Calendar;