import { createStore, createHook } from 'react-sweet-state'

const SharedCounterStore = createStore({
  initialState: {
    count: 0
  },
  actions: {
    increment: () => ({ setState, getState }) => {
      setState({ count: getState().count + 1 })
    }
  },
  name: 'SharedCounterStore'
})

export const useSharedCounter = createHook(SharedCounterStore)
