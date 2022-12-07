import React from 'react'
import { tasksAPI } from "@/api/todoAPI"
import { FormikErrors, useFormik } from 'formik'
import { months } from '@/consts/daysConsts'

import FormControl from '@mui/material/FormControl';
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

// const TaskListItemIcon = styled(ListItemIcon)(() => ({
//   minWidth: 'unset',
//   height: 30,
// }))

// const ClosingTaskProgress = styled(CircularProgress)(() => ({
//   margin: '5px 12px 0 10px',
// }))

const MonthSelectForm = props => {
  const { setTasks } = props

  const [dateFormWaiting, setDateFormWaiting] = React.useState<boolean>(false);
  // const [selectedMonth, setSelectedMonth] = React.useState<number>(new Date().getMonth())
  // const [selectedYear, setSelectedYear] = React.useState<number>(new Date().getFullYear())

  const resetToToday = () => {

  }

  const setDate = async ({monthID, year}) => {
    setDateFormWaiting(true)
    const monthName = months.find(month => month.id === monthID).name
    const filter = `1 ${monthName} ${year}`
    console.log('setDate filter', filter);
    await setTasks(filter)
    setDateFormWaiting(false)
  }

  const { handleSubmit, handleChange, handleBlur, values, touched } = useFormik<{
    monthID: number;
    year: number;
  }>({
    initialValues: {
      monthID: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
    onSubmit: (values, { resetForm }) => {
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
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={resetToToday}>Today</Button>
      </ButtonGroup>
    </form>
  );
}

export default MonthSelectForm
