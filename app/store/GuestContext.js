/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../utils/customAxios';

// Define the async thunk
export const fetchGuest = createAsyncThunk(
  'guest/fetchGuest',
  async (queryData, { rejectWithValue }) => {
    const { page, searchGuest } = queryData;
    const params = {
      page,
      limit: 50,
    };
    if (searchGuest) {
      params.filter = JSON.stringify({ name: searchGuest });
    }
    try {
      const response = await customAxios.get('guest', { params });
      return response;
    } catch (error) {
      const Error = error?.response?.data ? rejectWithValue(error.response.data) : error;
      return rejectWithValue(Error);
    }
  },
);

const guestSlice = createSlice({
  name: 'guest',
  initialState: {
    guests: [],
    status: 'idle',
    showModal: false,
    page: 1,
    totalPages: 0,
    totalData: 0,
    error: null,
    searchGuests: false,
    editIndex: null,
  },
  reducers: {
    openDialog(state) {
      state.showModal = !state.showModal;
    },
    closeDialog(state) {
      state.editIndex = null;
      state.showModal = !state.showModal;
    },
    addGuest(state, action) {
      state.guests = [{ ...action.payload.guest }, ...state.guests];
      state.totalData += 1;
    },
    updateGuest(state, action) {
      state.guests = state.guests.map((guest) =>
        guest.id === action.payload.guest.id ? action.payload.guest : guest,
      );
    },
    resetSearch(state) {
      state.guests = [];
    },
    setSearchGuest(state, action) {
      state.searchGuests = action.payload.searchGuests;
    },
    removeGuest(state, action) {
      state.guests = state.guests.filter((guest) => guest.id !== action.payload.guestId);
      state.totalData -= 1;
    },
    setEditIndex(state, action) {
      state.editIndex = action.payload.editIndex;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGuest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (!action?.payload?.guests) return;
        // Add any fetched guests to the array without duplicates
        const existingGuestIds = new Set(state.guests.map((guest) => guest.id));
        const usersData = action.payload.guests
          .filter((guest) => !existingGuestIds.has(guest.guestId))
          .map((guest) => ({
            id: guest.guestId,
            name: guest.name,
            email: guest.email,
            phone: guest.phoneNumber,
            address: guest.address,
          }));
        state.error = null;
        state.guests = state.searchGuests ? usersData : state.guests.concat(usersData);
        state.totalPages = action.payload.totalPages;
        state.totalData = action.payload.totalData;
        state.page = action.payload.currentPage;
      })
      .addCase(fetchGuest.rejected, (state, action) => {
        state.status = 'failed';
        if (state.searchGuests) state.guests = [];
        if (action?.payload?.message) {
          state.error = action?.payload?.message;
        } else if (action?.error?.message) {
          state.error = action.error.message;
        } else {
          state.error = 'Something Went Wrong! Please try again later.';
        }
      });
  },
});

export const guestActions = guestSlice.actions;
export default guestSlice;
