import { createSlice } from "@reduxjs/toolkit";

const initialState = {                                              //satate with which the application will start
  mode: 'light',
  user: null,
  token: null,
  posts: [],
}

export const authslice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode : (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'             //changes light to dark theme
    },
    setLogin : (state, action) => {
      state.user = action.payload.user                                    //action includes all the arguments
      state.token = action.payload.token
    }, 
    setLogout: (state) => {                                              //for loggin out
      state.user = null
      state.token = null
    },
    setFriends : (state, action) => {
      if(state.user) {
        state.user.friends = action.payload.friends
      } else {
        console.error("user friends non-existant")
      }
    },
    setPosts : (state, action) => {
      state.posts = action.payload.posts
    },
    setPost : (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if(post._id === action.payload.post_id) return action.payload.post                          //returns the updated post that we change which is coming from the backend else we return the current post
        return post
      })
      state.posts=updatedPosts
    }
  }
}) 

export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts } = authslice.actions 
export default authslice.reducer