import CalendarDay from "./CalendarDay/CalendarDay"
import { weekDays } from '@/consts/days'
import CalendarCss from './Calendar.module.css'

const days = [
  '2022/07/03',
  '2022/07/04',
  '2022/07/05',
  '2022/07/06',
  '2022/07/07',
  '2022/07/08',
  '2022/07/09',
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