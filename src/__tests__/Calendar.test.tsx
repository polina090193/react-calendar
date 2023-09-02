import { render, screen } from '@testing-library/react'
import Calendar from '@/components/Calendar/Calendar'
import '@testing-library/jest-dom'

describe('Calendar', () => {
  it('has weekdays', async () => {
    render(<Calendar />)

    const weekdays = await screen.findAllByRole('weekday')

    expect(weekdays[0]).toHaveTextContent('Mon')
    expect(weekdays[4]).toHaveTextContent('Fri')
  })

  it('doesn\'t have weekdays when didn\'t rendered', () => {
    expect(screen.queryByRole('weekday')).not.toBeInTheDocument()
  })
})
