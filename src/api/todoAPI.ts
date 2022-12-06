import { TodoistApi } from '@doist/todoist-api-typescript'

const todoAPI = new TodoistApi('7ad18f9fb8f4bfc89b333b417520354e1071fdab')

export const tasksAPI = {
  async getTasks(filter = null) {
    try {
      const tasks = await todoAPI.getTasks(filter ? { filter } : null)
      return tasks
    } catch (err) {
      console.log(err)
    }
  },

  async addTask(dayDate, taskTitle) {
    try {
      const newTask = await todoAPI.addTask({
        content: taskTitle,
        dueString: dayDate,
      })
      return newTask
    } catch (err) {
      console.log(err)
    }
  },

  async closeTask(id) {
    try {
      const closedTask = await todoAPI.closeTask(id)
      return closedTask
    } catch (err) {
      console.log(err)
    }
  },
}
