import { createStore, createHook } from 'react-sweet-state'

const NotificationStore = createStore({
  initialState: {
    email: false,
    push: false
  },
  actions: {
    toggleEmail: () => ({ setState, getState }) => {
      setState({ email: !getState().email })
    },
    togglePush: () => ({ setState, getState }) => {
      setState({ push: !getState().push })
    }
  },
  name: 'NotificationStore'
})

export const useNotification = createHook(NotificationStore)
