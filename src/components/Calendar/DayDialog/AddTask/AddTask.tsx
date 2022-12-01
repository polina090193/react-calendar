import React from 'react'
import { useFormik, FormikErrors } from "formik";
import { tasksAPI } from "@/api/todoAPI"
import { styled } from '@mui/material/styles'
import yellow from "@mui/material/colors/yellow"

import Button from '@mui/material/Button'
import Input from '@mui/material/Input'

const AddTaskInput = styled(Input)(() => ({
  width: '100%',
}))

const AddTaskFormButton = styled(Button)(() => ({
  width: '50%',
  marginTop: 10,
  color: '#20b2aa',

  ':hover': {
    backgroundColor: yellow[300],
  },
}))

const SubmitTaskButton = styled(AddTaskFormButton)(() => ({
  
}))

const CancelTaskButton = styled(AddTaskFormButton)(() => ({

}))

const AddTask = (props) => {
  interface FormValues {
    taskTitle: string;
  }

  const errors: FormikErrors<FormValues> = {};
  const validate = (values: FormValues) => {


    if (!values.taskTitle) {
      errors.taskTitle = 'Required';
    } else if (values.taskTitle.length > 120) {
      errors.taskTitle = 'Must be 120 characters or less'; // Add description if you would like to add more.
    }

    return errors;
  };

  const addTask = ({dayDate, taskTitle}) => {
    tasksAPI.addTask(dayDate, taskTitle).then(() => props.setTasks(dayDate))
  }

  const { handleSubmit, handleChange, handleBlur, values, touched } = useFormik<{
    taskTitle: string;
  }>({
    initialValues: {
      taskTitle: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      addTask({ dayDate: props.dayDate, ...values })
      resetForm()
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <AddTaskInput
        type="text"
        id="taskTitle"
        name="taskTitle"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.taskTitle}
      />
      {touched.taskTitle && errors.taskTitle && <div>{errors.taskTitle}</div>}

      <SubmitTaskButton type="submit">Add</SubmitTaskButton>
      <CancelTaskButton onClick={props.closeAddTaskForm}>X</CancelTaskButton>
    </form>
  );
}


export default AddTask