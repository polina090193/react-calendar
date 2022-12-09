import React from 'react'
import { FormikErrors, useFormik } from 'formik'
import { months } from '@/consts/daysConsts'

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

import { styled } from '@mui/material/styles';
import { colors } from '@/consts/css'
import MonthSelectFormCSS from './MonthSelectForm.module.css'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const MonthSelectForm = props => {
  const { getCalendarInfo } = props

  const [isDateFormWaiting, setDateFormWaiting] = React.useState<boolean>(false);

  const resetToToday = () => {
    setDate({ monthID: new Date().getMonth(), year: new Date().getFullYear() })
  }

  const setDate = async ({monthID, year}) => {
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
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="monthID"
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
      <TextField
        id="year"
        name="year"
        label="Number"
        type="number"
        value={values.year}
        onChange={handleChange}
      />
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button type="submit">{ isDateFormWaiting ? <CircularProgress /> : 'Submit' }</Button>
        <Button type="button" onClick={() => {
          resetToToday()
          resetForm()
        }}>{ isDateFormWaiting ? <CircularProgress /> : 'Today' }</Button>
      </ButtonGroup>
    </form>
  );
}

export default MonthSelectForm
