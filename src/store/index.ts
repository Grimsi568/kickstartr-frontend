import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import templatesReducer from './templatesSlice'
import bundlesReducer from './bundlesSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    templates: templatesReducer,
    bundles: bundlesReducer,
    // add other reducers here
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
