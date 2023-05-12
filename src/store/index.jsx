import { configureStore } from '@reduxjs/toolkit'
import auth from '../store/auth'
import modal from '../store/modal'
import todos from '../store/todos'

const store =  configureStore({
  reducer: {
    auth,
    modal,
    todos
  },
})

export default store