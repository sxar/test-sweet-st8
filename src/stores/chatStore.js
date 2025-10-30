import { createStore, createContainer, createHook } from 'react-sweet-state'

const ChatStore = createStore({
  initialState: {
    messages: []
  },
  actions: {
    sendMessage: (text) => ({ setState, getState }) => {
      const newMessage = {
        id: Date.now(),
        text: text,
        timestamp: new Date().toLocaleTimeString()
      }
      setState({
        messages: [...getState().messages, newMessage]
      })
    }
  },
  name: 'ChatStore'
})

export const ChatContainer = createContainer(ChatStore, {
  onInit: () => () => {
    console.log('Chat store initialized')
  },
  onDestroy: () => () => {
    console.log('Chat store destroyed')
  }
})

export const useChat = createHook(ChatStore)
