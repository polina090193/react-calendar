import React from 'react'
import { useFormik } from 'formik'
import { months } from '@/consts/daysConsts'

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const MonthSelectForm = props => {
  const { getCalendarInfo } = props

  const [isDateFormWaiting, setDateFormWaiting] = React.useState<boolean>(false);

  const resetToToday = () => {
    setDate({ monthID: new Date().getMonth(), year: new Date().getFullYear() })
  }

  const setDate = async ({ monthID, year }) => {
    setDateFormWaiting(true)
    await getCalendarInfo(new Date(year, monthID, 1))
    setDateFormWaiting(false)
  }

  const { handleSubmit, handleChange, values, resetForm } = useFormik<{
    monthID: number;
    year: number;
  }>({
    initialValues: {
      monthID: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
    onSubmit: (values) => {
      setDate({ ...values })
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Box sx={{ marginRight: 1 }}>
          <InputLabel id="monthID-label">Month</InputLabel>
          <Select
            labelId="monthID-label"
            id="monthID"
            name="monthID"
            value={values.monthID}
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
        <Button variant="contained" sx={{ marginRight: 2, }} type="submit">{isDateFormWaiting ? <CircularProgress /> : 'Submit'}</Button>
        <Button variant="contained" type="button" onClick={() => {
          resetToToday()
          resetForm()
        }}>{isDateFormWaiting ? <CircularProgress /> : 'Today'}</Button>
      </Box>
    </form>
  );
}

export default MonthSelectForm
