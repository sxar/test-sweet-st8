import { createStore, createHook } from 'react-sweet-state'

const PersistCounterStore = createStore({
  initialState: {
    count: 0
  },
  actions: {
    increment: () => ({ setState, getState }) => {
      setState({ count: getState().count + 1 })
    }
  },
  name: 'PersistCounterStore'
})

export const usePersistCounter = createHook(PersistCounterStore)
