import { createStore, createContainer, createHook } from 'react-sweet-state'

const MultiplierStore = createStore({
  initialState: {
    count: 0
  },
  actions: {
    increment: () => (
      { setState, getState },
      { multiplier = 1 }
    ) => {
      const currentCount = getState().count
      setState({ count: currentCount + multiplier })
    }
  },
  name: 'MultiplierStore'
})

export const MultiplierContainer = createContainer(MultiplierStore)
export const useMultiplier = createHook(MultiplierStore)
