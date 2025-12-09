import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type License = {
  id?: string
  key?: string
  issuedUtc?: string
  revokedUtc?: string | null
  template?: {
    id?: string
    name?: string
    description?: string | null
    slug?: string
  }
}

type UserProfile = {
  id?: string
  displayName?: string
  email?: string
  createdAt?: string
  licenses?: License[]
}

type UserState = {
  profile: UserProfile | null
  loading: boolean
}

const initialState: UserState = {
  profile: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<UserProfile | null>) {
      state.profile = action.payload
    },
    setUserLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    clearUserProfile(state) {
      state.profile = null
    },
  },
})

export const { setUserProfile, setUserLoading, clearUserProfile } = userSlice.actions
export default userSlice.reducer
