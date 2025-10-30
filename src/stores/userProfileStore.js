import { createStore, createHook } from 'react-sweet-state'

const UserProfileStore = createStore({
  initialState: {
    name: 'John',
    age: 30,
    email: 'john@example.com'
  },
  actions: {
    updateName: (name) => ({ setState }) => {
      setState({ name })
    },
    updateAge: (age) => ({ setState }) => {
      setState({ age: parseInt(age, 10) })
    },
    updateEmail: (email) => ({ setState }) => {
      setState({ email })
    }
  },
  name: 'UserProfileStore'
})

export const useUserName = createHook(UserProfileStore, {
  selector: state => state.name
})

export const useUserAge = createHook(UserProfileStore, {
  selector: state => state.age
})

export const useUserEmail = createHook(UserProfileStore, {
  selector: state => state.email
})

export const useUserActions = createHook(UserProfileStore, {
  selector: null
})
