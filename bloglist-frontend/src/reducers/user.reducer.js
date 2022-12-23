import { createSlice } from '@reduxjs/toolkit'

export const KEY_LOCAL_SAVE_USER = 'loggedBlogListAppUser'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    pushUser(state, action) {
      return action.payload
    }
  },
})

const { pushUser } = userSlice.actions
export const pushInfoUser = (user) => {
  return (dispatch) => {
    dispatch(pushUser(user))
    window.localStorage.setItem(
      KEY_LOCAL_SAVE_USER,
      JSON.stringify(user)
    )
  }
}
export const removeUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem(KEY_LOCAL_SAVE_USER)
    dispatch(pushUser(null))
  }
}
export const userReducer = userSlice.reducer
