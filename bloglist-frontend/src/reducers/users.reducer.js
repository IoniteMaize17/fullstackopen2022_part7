import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      state.push(action.payload)
    }
  },
})

const { setUsers, appendUser } = usersSlice.actions
export const setListUsers = (listUsers) => {
  return (dispatch) => {
    dispatch(setUsers(listUsers))
  }
}
export const appendInfoUser = (user) => {
  return (dispatch) => {
    dispatch(appendUser(user))
  }
}
export const usersReducer = usersSlice.reducer
