import CalendarDay from "./CalendarDay/CalendarDay"
import { weekDays } from '@/consts/days'
import CalendarCss from './Calendar.module.css'

const days = [
  '2022/06/26',
  '2022/06/27',
  '2022/06/28',
  '2022/06/29',
  '2022/06/30',
  '2022/07/01',
  '2022/07/02',
]

const dates = weekDays.map((weekDay, index) => {
  return {weekDay, date: days[index]}
})

function Calendar() {
  return (
    <div className={CalendarCss.calendar}>
      <div className={CalendarCss.days}>
        {dates.map(({weekDay, date}) => <CalendarDay key={date} weekDay={weekDay} dayDate={date} />)}
      </div>
    </div>
  );
}

export default Calendar;