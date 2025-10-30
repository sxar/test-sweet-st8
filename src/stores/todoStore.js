import { createStore, createContainer, createHook } from 'react-sweet-state'

const TodoStore = createStore({
  initialState: {
    tasks: [],
    nextId: 1
  },
  actions: {
    addTask: (text) => ({ setState, getState }) => {
      const state = getState()
      const newTask = {
        id: state.nextId,
        text: text,
        completed: false
      }
      setState({
        tasks: [...state.tasks, newTask],
        nextId: state.nextId + 1
      })
    },
    removeTask: (id) => ({ setState, getState }) => {
      setState({
        tasks: getState().tasks.filter(task => task.id !== id)
      })
    }
  },
  name: 'TodoStore'
})

export const TodoContainer = createContainer(TodoStore, {
  onInit: () => ({ setState }, { scope }) => {
    console.log(`Todo store initialized with scope: ${scope}`)
  }
})

export const useTodo = createHook(TodoStore)
