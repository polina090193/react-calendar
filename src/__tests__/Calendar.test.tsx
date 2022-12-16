import { render, screen } from '@testing-library/react'
import Calendar from '@/components/Calendar/Calendar'
import '@testing-library/jest-dom'

describe('Calendar', () => {
  it('has monday', () => {
    render(<Calendar />)

    const monday = screen.getByText('Tue')
    const friday = screen.getByText('Fri')

    expect(monday).toBeInTheDocument()
    expect(friday).toBeInTheDocument()
  })
})
