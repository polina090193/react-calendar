import React from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from "formik";

import { addTask } from '@/redux/tasksSlice'

const AddTask = (props) => {
  const dispatch = useDispatch()

  const validate = values => {

    const errors = {};

    if (!values.taskTitle) {
      errors.taskTitle = 'Required';
    } else if (values.taskTitle.length > 120) {
      errors.taskTitle = 'Must be 120 characters or less. Add description if you would like to add more.';
    }

    return errors;
  };

  const addTaskForm = useFormik({
    initialValues: {
      taskTitle: '',
    },
    validate,
    onSubmit: values => {
      dispatch(addTask({ dayDate: props.dayDate, ...values }))
    }
  });

  return (
    <form onSubmit={addTaskForm.handleSubmit}>
      <input
        type="text"
        id="taskTitle"
        name="taskTitle"
        onChange={addTaskForm.handleChange}
        onBlur={addTaskForm.handleBlur}
        value={addTaskForm.values.taskTitle}
      />
      {addTaskForm.touched.title && addTaskForm.errors.title ? <div>{addTaskForm.errors.title}</div> : null}

      <button type="submit">Add</button>
      <button type="button" onClick={props.closeAddTaskForm}>X</button>
    </form>
  );
}


export default AddTask