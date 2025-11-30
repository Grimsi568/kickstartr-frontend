import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Template = {
  id?: string
  name?: string
  slug?: string
  description?: string | null
  // ...other fields as needed
}

type TemplatesState = {
  templates: Template[]
  loading: boolean
  error: string | null
}

const initialState: TemplatesState = {
  templates: [],
  loading: false,
  error: null,
}

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setTemplates(state, action: PayloadAction<Template[]>) {
      state.templates = action.payload
      state.error = null
    },
    setTemplatesLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setTemplatesError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    clearTemplates(state) {
      state.templates = []
      state.error = null
    },
  },
})

export const { setTemplates, setTemplatesLoading, setTemplatesError, clearTemplates } = templatesSlice.actions
export default templatesSlice.reducer
