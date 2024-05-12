import { configureStore } from '@reduxjs/toolkit';
import eventSlice from './EventContext';
import guestSlice from './GuestContext';
import authReducer from './reducers/authSlice';
import giftSlice from './reducers/giftSlice';

const store = configureStore({
  reducer: {
    event: eventSlice.reducer,
    guest: guestSlice.reducer,
    auth: authReducer,
    gift: giftSlice.reducer,
  },
});

export default store;
