import { createStore, createHook } from 'react-sweet-state'

const PostsStore = createStore({
  initialState: {
    requestId: 'none',
    loading: false,
    posts: null
  },
  actions: {
    fetchPosts: (speed, delay) => async ({ setState, getState }) => {
      const requestId = `${speed}-${Date.now()}`
      setState({
        requestId,
        loading: true
      })

      await new Promise(resolve => setTimeout(resolve, delay))

      const currentRequestId = getState().requestId
      if (currentRequestId === requestId) {
        setState({
          loading: false,
          posts: `${speed.charAt(0).toUpperCase() + speed.slice(1)} response data`
        })
      }
    }
  },
  name: 'PostsStore'
})

export const usePosts = createHook(PostsStore)
