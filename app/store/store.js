import { configureStore } from '@reduxjs/toolkit';
import eventSlice from './EventContext';
import guestSlice from './GuestContext';
import authReducer from './reducers/authSlice';

const store = configureStore({
  reducer: { event: eventSlice.reducer, guest: guestSlice.reducer, auth: authReducer },
});

export default store;
