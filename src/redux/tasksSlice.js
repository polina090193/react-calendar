import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { tasksAPI } from "@/api"

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    status: 'idle',
    tasks: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'success'
        state.tasks[action.payload.dayDate] = action.payload.tasks
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        console.error(action.error.message)
      })
  }
})

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async dayDate => {
    const res = await tasksAPI.getTasks(dayDate)
    return { dayDate, tasks: res }
  })


export const selectTasks = state => state.tasks.tasks
export const selectTasksLoadingStatus = state => state.tasks.status

export default tasksSlice.reducer
