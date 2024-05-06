/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL, JWT_KEY } from '../../constants/constants';

export const tokenVerify = createAsyncThunk('auth/tokenVerify', async (_, { rejectWithValue }) => {
  try {
    const token = await SecureStore.getItemAsync(JWT_KEY);
    return token !== null ? token : null;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const onLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${API_URL}auth/login`, { username: email, password });
      await SecureStore.setItemAsync(JWT_KEY, result.data.token);
      return result.data.token;
    } catch (error) {
      return rejectWithValue('Invalid credentials');
    }
  },
);

export const onRegister = createAsyncThunk(
  'auth/register',
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${API_URL}users/add`, { fullName, email, password });
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const onLogout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await SecureStore.deleteItemAsync(JWT_KEY);
    return null;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = null;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(onRegister.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(onRegister.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(tokenVerify.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = null;
      })
      .addCase(tokenVerify.rejected, (state, action) => {
        state.token = null;
        state.error = action.payload;
      })
      .addCase(onLogout.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(onLogout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
