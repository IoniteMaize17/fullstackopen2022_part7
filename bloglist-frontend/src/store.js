import { configureStore } from '@reduxjs/toolkit'

import { notificationReducer } from './reducers/notification.reducer'
import { blogsReducer } from './reducers/blogs.reducer'
import { userReducer } from './reducers/user.reducer'
import { usersReducer } from './reducers/users.reducer'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer
  },
})
