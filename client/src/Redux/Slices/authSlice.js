import { createSlice, createAsyncThunk,createAction } from '@reduxjs/toolkit'
import authService from '../Features/authService'
import { useRef } from 'react'


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isLoggedIn: !!user

}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async ({ userData, role }, thunkAPI) => {
  try {
    return await authService.login(userData, role)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const logout = createAsyncThunk('auth/logout', async () => {
  return authService.logout()
})
export const setLoggedIn = createAction('auth/setLoggedIn');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(setLoggedIn, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.isLoggedIn = true

      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        state.isLoggedIn = false

      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.isLoggedIn = true

      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        state.isLoggedIn = false

      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isLoggedIn = false
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer