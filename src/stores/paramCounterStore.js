import { createStore, createHook } from 'react-sweet-state'

const ParamCounterStore = createStore({
  initialState: {
    count: 0
  },
  actions: {
    addAmount: (amount) => ({ setState, getState }) => {
      const currentCount = getState().count
      setState({ count: currentCount + amount })
    }
  },
  name: 'ParamCounterStore'
})

export const useParamCounter = createHook(ParamCounterStore)
