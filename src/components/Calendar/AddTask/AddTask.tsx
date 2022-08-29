import React from 'react'
import { useFormik, FormikErrors } from "formik";
import { tasksAPI } from "@/api"

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
      <input
        type="text"
        id="taskTitle"
        name="taskTitle"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.taskTitle}
      />
      {touched.taskTitle && errors.taskTitle && <div>{errors.taskTitle}</div>}

      <button type="submit">Add</button>
      <button type="button" onClick={props.closeAddTaskForm}>X</button>
    </form>
  );
}


export default AddTask