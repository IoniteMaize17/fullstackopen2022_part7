import { createSlice } from '@reduxjs/toolkit'

const initialState = { messages: null, type: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    pushNotification(state, action) {
      const notification = action.payload
      state.messages = notification.messages
      state.type = notification.type ? notification.type : 'e'
    },
  },
})

let delayHandler = null

const { pushNotification } = notificationSlice.actions
export const setNotification = (messages, type, time) => {
  return (dispatch) => {
    if (delayHandler) clearTimeout(delayHandler)
    dispatch(pushNotification({ messages, type }))
    delayHandler = setTimeout(() => {
      dispatch(pushNotification({ messages: null, type: null }))
    }, time * 1000)
  }
}
export const notificationReducer = notificationSlice.reducer
