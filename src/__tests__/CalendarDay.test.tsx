import { fireEvent, render, screen } from '@testing-library/react'
import { mockTasks } from '../api/mockTasks'
import '@testing-library/jest-dom'
import CalendarDay from '@/components/Calendar/CalendarDay/CalendarDay'

describe('CalendarDay', () => {
  it('handles dialog open', () => {
    const dayDate = '2022-12-09'

    render(<CalendarDay dayDate={dayDate} dayTasks={mockTasks} />)

    const headerOfDay = screen.getByRole('heading')
    fireEvent.click(headerOfDay)
    const dialogOfDay = screen.getByTestId(`dialog-${dayDate}`)

    expect(dialogOfDay).toBeInTheDocument()
  })
})
