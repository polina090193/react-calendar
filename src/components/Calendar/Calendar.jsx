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
        <CalendarDay weekDay="M" dayDate="2022/04/18" />
        <CalendarDay weekDay="Tu" dayDate="2022/04/19" />
        <CalendarDay weekDay="W" dayDate="2022/04/20" />
        <CalendarDay weekDay="Th" dayDate="2022/04/21" />
        <CalendarDay weekDay="F" dayDate="2022/04/22" />
        <CalendarDay weekDay="Sa" dayDate="2022/04/23" />
        <CalendarDay weekDay="Su" dayDate="2022/04/24" />
      </div>
    </div>
  );
}

export default Calendar;