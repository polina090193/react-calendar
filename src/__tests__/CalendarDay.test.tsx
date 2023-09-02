import { fireEvent, render, screen } from '@testing-library/react'
import { mockTasks } from '../api/mockTasks'
import '@testing-library/jest-dom'
import CalendarDay from '@/components/Calendar/CalendarDay/CalendarDay'

describe('CalendarDay', () => {
  it('handles dialog open', async () => {
    const dayDate = '2022-12-09'

    render(<CalendarDay dayDate={dayDate} dayTasks={mockTasks} />)

    const headerOfDay = await screen.findByRole('heading')
    fireEvent.click(headerOfDay)
    const dialogOfDay = await screen.findByTestId(`dialog-${dayDate}`)

    expect(dialogOfDay).toBeInTheDocument()
  })

  it('has wrong date', () => {
    const dayDate = 'wrong_date'

    expect(() => {
      render(<CalendarDay dayDate={dayDate} dayTasks={mockTasks} />)
    }).toThrow('Invalid date')
  })

  test('header was not clicked', () => {
    const dayDate = '2022-12-09'
    render(<CalendarDay dayDate={dayDate} dayTasks={mockTasks} />)
    expect(screen.queryByTestId(`dialog-${dayDate}`)).not.toBeInTheDocument()
  })
})
