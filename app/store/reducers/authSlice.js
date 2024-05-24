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
      if (error?.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Something went wrong! Please try again.' });
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

export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (userData) => {
  const userProfile = JSON.stringify(userData);
  await AsyncStorage.setItem('userProfile', userProfile);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { error: null, userProfile: null },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(tokenVerify.fulfilled, (state, action) => {
        if (action.payload) {
          state.userProfile = action.payload;
          state.error = null;
        }
      })
      .addCase(tokenVerify.rejected, (state, action) => {
        state.token = null;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        // eslint-disable-next-line no-console
        console.log('updateUserProfile', action.payload);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        // eslint-disable-next-line no-console
        console.log('updateUserProfile', action.payload);
      })
      .addCase(onLogout.fulfilled, (state) => {
        state.userProfile = null;
      })
      .addCase(onLogout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
