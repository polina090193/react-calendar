import { TodoistApi } from '@doist/todoist-api-typescript'

const todoAPI = new TodoistApi('7716d8a22975bcfb4e28ffb524e54fef937b616d')

export const tasksAPI = {
  async getTasks(dayDate) {
    console.log('getTasks', dayDate)
    try {
      const tasks = await todoAPI.getTasks({ filter: dayDate })
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
