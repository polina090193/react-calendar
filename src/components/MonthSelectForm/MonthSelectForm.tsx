import React, { useCallback, useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import { months } from '@/consts/daysConsts'
import { getPrevMonth, getNextMonth } from '@/helpers/dateHelpers'

import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import getDaysInfo from '@/helpers/getDaysInfo'

type MonthSelectFormProps = {
  setCalendarInfo: (date: Date, daysInfo: DaysInfo) => void,
  selectedDate: Date,
}

const MonthSelectForm: React.FC<MonthSelectFormProps> = ({ setCalendarInfo, selectedDate }): JSX.Element => {

  const selectedMonth: MonthData = useMemo(() => ({
      monthIndex: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
  }), [selectedDate]) 

  const todaysMonth = { monthIndex: new Date().getMonth(), year: new Date().getFullYear() }

  const { prevMonth, nextMonth } = useMemo(() => ({
    prevMonth: getPrevMonth(selectedMonth.monthIndex, selectedMonth.year),
    nextMonth: getNextMonth(selectedMonth.monthIndex, selectedMonth.year),
  }), [selectedMonth])

  const [isDateFormWaiting, setDateFormWaiting] = React.useState<boolean>(false)

  const resetToToday = (): void => {
    setDate(todaysMonth)
  }

  const setDate = useCallback(async ({ monthIndex, year }: MonthData): Promise<void> => {
    setDateFormWaiting(true)
    const monthDate = new Date(year, monthIndex, 1)
    const daysInfo: DaysInfo = getDaysInfo(monthDate)
    await setCalendarInfo(monthDate, daysInfo)
    setDateFormWaiting(false)
  }, [])
  
  const { handleSubmit, handleChange, values, resetForm, setFieldValue } = useFormik<MonthData>({
    initialValues: selectedMonth,
    onSubmit: (values) => {
      setDate({ ...values })
    }
  })

  useEffect(() => {
    setFieldValue('monthIndex', selectedMonth.monthIndex)
    setFieldValue('year', selectedMonth.year)
  }, [setFieldValue, selectedMonth])

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Box sx={{ marginRight: 1 }}>
          <InputLabel id="monthIndex-label">Month</InputLabel>
          <Select
            labelId="monthIndex-label"
            id="monthIndex"
            name="monthIndex"
            value={values.monthIndex}
            label="Month"
            onChange={handleChange}
          >
            {
              months.map(month => <MenuItem key={month.id} value={month.id}>{month.name}</MenuItem>)
            }
          </Select>
        </Box>
        <Box sx={{ marginRight: 1 }}>
          <InputLabel htmlFor="year">Year</InputLabel>
          <TextField
            id="year"
            name="year"
            type="number"
            value={values.year}
            sx={{ maxWidth: '6rem' }}
            onChange={handleChange}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', marginTop: 1, marginBottom: 2 }}>
        <Button
          variant="contained"
          sx={{ marginRight: 2, }}
          type="submit">
          {isDateFormWaiting ? <CircularProgress /> : 'Submit'}
        </Button>

        <Button
          variant="contained"
          type="button"
          onClick={() => {
            resetToToday()
            resetForm()
          }}>
          {isDateFormWaiting ? <CircularProgress /> : 'Today'}
        </Button>

        <Button
          variant="contained"
          sx={{
            marginRight: 2, marginLeft: 2
          }}
          type="button"
          onClick={() => { setDate(prevMonth) }}>
          {isDateFormWaiting ? <CircularProgress /> : '🡰'}
        </Button>

        <Button
          variant="contained"
          type="button"
          onClick={() => { setDate(nextMonth) }}>
          {isDateFormWaiting ? <CircularProgress /> : '🡲'}
        </Button>
      </Box>
    </form>
  )
}

export default MonthSelectForm
