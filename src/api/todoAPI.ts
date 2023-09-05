import { TodoistApi } from '@doist/todoist-api-typescript'
import { Task } from '@doist/todoist-api-typescript/dist/types/entities'

const todoAPI = new TodoistApi('7ad18f9fb8f4bfc89b333b417520354e1071fdab')

export const tasksAPI: TasksAPI = {
  async getTasks(filter: string = null): Promise<Task[]> {
    try {
      const tasks: Task[] = await todoAPI.getTasks(filter ? { filter } : null)
      return tasks
    } catch (err) {
      console.log(err)
    }
  },

  async addTask(dayDate: string, taskTitle: string): Promise<Task> {
    try {
      const newTask: Task = await todoAPI.addTask({
        content: taskTitle,
        dueString: dayDate,
      })
      return newTask
    } catch (err) {
      console.log(err)
    }
  },

  async closeTask(id: string): Promise<boolean> {
    try {
      const closedTask: boolean = await todoAPI.closeTask(id)
      return closedTask
    } catch (err) {
      console.log(err)
    }
  },

  async updateTask(id, args) {
    try {
      const updatedTask = todoAPI.updateTask(id, args)
      return updatedTask
    } catch (err) {
      console.log(err)
    }
  },
}
