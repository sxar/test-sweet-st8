import { createStore, createHook } from 'react-sweet-state'

const ThemeStore = createStore({
  initialState: {
    theme: 'light'
  },
  actions: {
    setTheme: (theme) => ({ setState }) => {
      setState({ theme })
    }
  },
  name: 'ThemeStore'
})

export const useTheme = createHook(ThemeStore)
