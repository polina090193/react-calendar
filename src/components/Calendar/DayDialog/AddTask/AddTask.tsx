import React, { useRef } from 'react'
import { useFormik, FormikErrors } from "formik"
import { tasksAPI } from "@/api/todoAPI"

import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import CircularProgress from '@mui/material/CircularProgress'

import { styled } from '@mui/material/styles'
import AddTaskCSS from './AddTask.module.css'
import { colors } from '@/consts/css'


const AddTaskInput = styled(Input)(() => ({
  width: '100%',
}))

const AddTaskFormButton = styled(Button)(() => ({
  backgroundColor: colors.middleYellow,
  width: '50%',
  height: 40,
  marginTop: 10,
  color: colors.mainTextColor,

  ':hover': {
    backgroundColor: colors.strongYellow,
  },
}))

const SubmitTaskButton = styled(AddTaskFormButton)(() => ({
  flexGrow: 1,
  marginRight: 20,
}))

const CancelTaskButton = styled(AddTaskFormButton)(() => ({
  width: 40,
}))

const AddTask = (props) => {
  const { updateTasks, dayDate, closeAddTaskForm } = props

  const [taskIsAdding, setTaskIsAdding] = React.useState<boolean>(false)

  interface FormValues {
    taskTitle: string
  }

  const errors: FormikErrors<FormValues> = {}

  const validate = (values: FormValues) => {
    if (!values.taskTitle) {
      errors.taskTitle = 'Required'
    } else if (values.taskTitle.length > 120) {
      errors.taskTitle = 'Must be 120 characters or less' // Add description if you would like to add more.
    }

    return errors
  }
  
  const titleInputRef = useRef(null)
  
  const addTask = async ({taskTitle}) => {
    setTaskIsAdding(true)
    await tasksAPI.addTask(dayDate, taskTitle)
    await updateTasks(dayDate)
    setTaskIsAdding(false)

    if (titleInputRef.current) {
      titleInputRef.current.children[0].focus()
    }
  }

  const { handleSubmit, handleChange, handleBlur, values, touched } = useFormik<{
    taskTitle: string
  }>({
    initialValues: {
      taskTitle: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      addTask({ ...values })
      resetForm()
    }
  })


  return (
    <form onSubmit={handleSubmit}>
      <AddTaskInput
        type="text"
        id="taskTitle"
        name="taskTitle"
        autoComplete="off"
        autoFocus
        ref={titleInputRef}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.taskTitle}
      />
      {touched.taskTitle && errors.taskTitle && <div>{errors.taskTitle}</div>}
      <div className={AddTaskCSS.buttons}>
        <SubmitTaskButton type="submit">{ taskIsAdding ? <CircularProgress size={30} /> : 'Add' }</SubmitTaskButton>
        <CancelTaskButton onClick={closeAddTaskForm}>X</CancelTaskButton>
      </div>
    </form>
  )
}


export default AddTask
