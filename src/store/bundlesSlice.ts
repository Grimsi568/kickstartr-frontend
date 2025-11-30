import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Bundle = {
  id?: string
  name?: string
  description?: string | null
  // ...other fields as needed
}

type BundlesState = {
  bundles: Bundle[]
  loading: boolean
  error: string | null
}

const initialState: BundlesState = {
  bundles: [],
  loading: false,
  error: null,
}

const bundlesSlice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {
    setBundles(state, action: PayloadAction<Bundle[]>) {
      state.bundles = action.payload
      state.error = null
    },
    setBundlesLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setBundlesError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    clearBundles(state) {
      state.bundles = []
      state.error = null
    },
  },
})

export const { setBundles, setBundlesLoading, setBundlesError, clearBundles } = bundlesSlice.actions
export default bundlesSlice.reducer
