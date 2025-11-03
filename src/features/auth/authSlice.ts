// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API headers with x-api-key
const apiHeaders = {
  headers: {
    'x-api-key': 'reqres-free-v1',
  },
};

// Async thunk for login
export const loginUser = createAsyncThunk('auth/loginUser', async (data, thunkAPI) => {
  try {
    const res = await axios.post(
      'https://reqres.in/api/login',
      {
        email: data.email,
        password: data.password,
      },
      apiHeaders
    );

    const userData = {
      email: data.email,
      accessToken: res.data.token,
    };

    localStorage.setItem('token', userData.accessToken);
    localStorage.setItem('user', JSON.stringify(userData));

    return userData;
  } catch (err) {
    console.error('Login Error:', err);
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Login failed');
  }
});

// Async thunk for register
export const registerUser = createAsyncThunk('auth/registerUser', async (data, thunkAPI) => {
  try {
    const res = await axios.post(
      'https://reqres.in/api/register',
      {
        email: data.email,
        password: data.password,
      },
      apiHeaders
    );

    const newUser = {
      email: data.email,
      accessToken: res.data.token,
    };

    localStorage.setItem('token', newUser.accessToken);
    localStorage.setItem('user', JSON.stringify(newUser));

    return newUser;
  } catch (err) {
    console.error('Registration Error:', err);
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Registration failed');
  }
});

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const {  logout } = authSlice.actions;
export default authSlice.reducer;
