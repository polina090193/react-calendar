import { TodoistApi } from '@doist/todoist-api-typescript'

const todoAPI = new TodoistApi('7716d8a22975bcfb4e28ffb524e54fef937b616d')

export const tasksAPI = {
  async getTasks(dayDate) {
    try {
      const tasks = await todoAPI.getTasks({ filter: dayDate })
      return tasks
    } catch (err) {
      console.log(err)
    }
  },

  async addTask(dayDate, text) {
    try {
      const newTask = await todoAPI.addTask({
        content: text,
        dueString: dayDate,
      })
      return newTask
    } catch (err) {
      console.log(err)
    }
  },
}
