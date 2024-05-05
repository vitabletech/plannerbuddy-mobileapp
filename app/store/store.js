import { configureStore } from '@reduxjs/toolkit';
import eventSlice from './EventContext';
import guestSlice from './GuestContext';

const store = configureStore({
  reducer: { event: eventSlice.reducer, guest: guestSlice.reducer },
});

export default store;
