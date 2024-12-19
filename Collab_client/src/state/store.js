import { configureStore } from '@reduxjs/toolkit'
import docReducer from './docSlice';

export default configureStore({
  reducer: {
    doc: docReducer,
  },
})