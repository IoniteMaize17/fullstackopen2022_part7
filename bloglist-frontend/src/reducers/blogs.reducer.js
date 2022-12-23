import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const newObj = action.payload
      return state.map(blog =>
        blog.id !== newObj.id ? blog : newObj
      )
    },
    removeBlog(state, action) {
      state.splice(state.findIndex(f => f.id === action.payload), 1)
    }
  },
})

const { setBlogs, appendBlog, updateBlog, removeBlog } = blogsSlice.actions
export const setListBlog = (listBlogs) => {
  return (dispatch) => {
    dispatch(setBlogs(listBlogs))
  }
}
export const appendInfoBlog = (blog) => {
  return (dispatch) => {
    dispatch(appendBlog(blog))
  }
}
export const updateInfoBlog = (blog) => {
  return (dispatch) => {
    dispatch(updateBlog(blog))
  }
}
export const removeOneBlog = (id) => {
  return (dispatch) => {
    dispatch(removeBlog(id))
  }
}
export const blogsReducer = blogsSlice.reducer
