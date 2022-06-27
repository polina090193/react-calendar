import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tasksAPI } from "@/api"

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    getTasksStatus: 'idle',
    addTaskStatus: 'idle',
    tasks: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.getTasksStatus = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.getTasksStatus = 'success'
        state.tasks[action.payload.dayDate] = action.payload.tasks
        state.addTaskStatus = 'idle'
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.getTasksStatus = 'failed'
        console.error(action.error.message)
      })
      .addCase(addTask.pending, (state) => {
        state.addTaskStatus = 'loading'
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.addTaskStatus = 'success'
      })
      .addCase(addTask.rejected, (state, action) => {
        state.addTaskStatus = 'failed'
      })
  }
})

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async dayDate => {
    const res = await tasksAPI.getTasks(dayDate)
    return { dayDate, tasks: res }
  })

export const addTask = createAsyncThunk('tasks/addTask', async ({dayDate, text}) => {
    const newTask = await tasksAPI.addTask(dayDate, text)
    return newTask
  })


export const selectTasks = state => state.tasks.tasks
export const selectTasksLoadingStatus = state => state.tasks.getTasksStatus
export const selectAddTaskStatus = state => state.tasks.addTaskStatus

export default tasksSlice.reducer
