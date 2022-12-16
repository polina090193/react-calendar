import { render, screen } from '@testing-library/react'
import Calendar from '@/components/Calendar/Calendar'
import '@testing-library/jest-dom'

describe('Calendar', () => {
  it('has weekdays', () => {
    render(<Calendar />)

    const weekdays = screen.getAllByRole('weekday')

    expect(weekdays[0]).toHaveTextContent('Mon')
    expect(weekdays[4]).toHaveTextContent('Fri')
  })
})
