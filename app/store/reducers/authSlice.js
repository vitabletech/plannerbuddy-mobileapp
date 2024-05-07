/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/constants';

export const tokenVerify = createAsyncThunk('auth/tokenVerify', async (_, { rejectWithValue }) => {
  try {
    const userProfile = await AsyncStorage.getItem('userProfile');
    if (userProfile === null) return null;
    const data = JSON.parse(userProfile);
    const token = data.accessToken;
    return token !== null ? data : null;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const onLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${API_URL}api/auth/signin`, { email, password });
      await AsyncStorage.setItem('userProfile', JSON.stringify({ ...result.data }));
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const onRegister = createAsyncThunk(
  'auth/register',
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${API_URL}api/auth/signup`, { fullName, email, password });
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const onLogout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await AsyncStorage.removeItem('userProfile');
    return null;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, error: null, userProfile: null },
  reducers: {
    updateUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.fulfilled, (state, action) => {
        const { accessToken, ...userData } = action.payload;
        state.token = accessToken;
        state.userProfile = userData;
        state.error = null;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(onRegister.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(onRegister.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(tokenVerify.fulfilled, (state, action) => {
        if (action.payload) {
          const { accessToken, ...userData } = action.payload;
          state.token = accessToken;
          state.userProfile = userData;
          state.error = null;
        }
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

export const authActions = authSlice.actions;
export default authSlice.reducer;
