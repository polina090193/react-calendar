import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tasksAPI } from "@/api"

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    getTasksStatus: 'idle',
    changeTasksStatus: 'idle',
    tasks: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(fetchTasks.pending, (state) => {
        state.getTasksStatus = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log('fetchTasks')
        state.getTasksStatus = 'success'
        state.tasks[action.payload.dayDate] = action.payload.tasks
        state.changeTasksStatus = 'idle'
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.getTasksStatus = 'failed'
        console.error(action.error.message)
      })
      
      .addCase(addTask.pending, (state) => {
        state.changeTasksStatus = 'loading'
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.changeTasksStatus = 'success'
      })
      .addCase(addTask.rejected, (state, action) => {
        state.changeTasksStatus = 'failed'
      })
      
      .addCase(closeTask.pending, (state) => {
        state.changeTasksStatus = 'loading'
      })
      .addCase(closeTask.fulfilled, (state, action) => {
        state.changeTasksStatus = 'success'
      })
      .addCase(closeTask.rejected, (state, action) => {
        state.changeTasksStatus = 'failed'
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

export const closeTask = createAsyncThunk('tasks/closeTask', async (id) => {
  const closedTask = await tasksAPI.closeTask(id)
  return closedTask
})


export const selectTasks = state => state.tasks.tasks
export const selectTasksLoadingStatus = state => state.tasks.getTasksStatus
export const selectChangeTasksStatus = state => state.tasks.changeTasksStatus

export default tasksSlice.reducer
