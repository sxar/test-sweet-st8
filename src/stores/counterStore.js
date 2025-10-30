import { createStore, createHook } from 'react-sweet-state'

const CounterStore = createStore({
  initialState: {
    count: 0
  },
  actions: {
    increment: () => ({ setState, getState }) => {
      const currentCount = getState().count
      setState({ count: currentCount + 1 })
    },
    decrement: () => ({ setState, getState }) => {
      setState({ count: getState().count - 1 })
    },
    reset: () => ({ setState }) => {
      setState({ count: 0 })
    }
  },
  name: 'CounterStore'
})

export const useCounter = createHook(CounterStore)
