import { createStore, createHook } from 'react-sweet-state'

const MultiCounterStore = createStore({
  initialState: {
    count: 0
  },
  actions: {
    increment: () => ({ setState, getState }) => {
      setState({ count: getState().count + 1 })
    }
  },
  name: 'MultiCounterStore'
})

export const useMultiCounter = createHook(MultiCounterStore)
