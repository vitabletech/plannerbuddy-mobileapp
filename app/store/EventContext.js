/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    mode: null,
    editIndex: null,
    showModal: false,
  },
  reducers: {
    addEvent(state, action) {
      state.events = [...new Set([...state.events, action.payload.event])];
    },
    addEvents(state, action) {
      state.events = [...new Set([...state.events, ...action.payload])];
    },
    addGuestsToEvent(state, action) {
      const updatedEvent = [...state.events];
      console.log('edit index :: ', state.editIndex);
      const event = updatedEvent.find((e) => e.id === state.editIndex);
      event.guests = [...action.payload.guests];
      updatedEvent.filter((e) => e.id !== state.editIndex);
      updatedEvent.push(event);
      state.mode = null;
      state.events = updatedEvent;
    },
    setMode(state, action) {
      state.mode = action.payload.mode;
    },
    setEditIndex(state, action) {
      state.editIndex = action.payload.idx;
    },
    openDialog(state) {
      state.showModal = !state.showModal;
    },
    closeDialog(state) {
      state.editIndex = null;
      state.mode = null;
      state.showModal = !state.showModal;
    },
    updateEvent(state, action) {
      const updatedEvent = { ...action.payload.event };
      let allEvents = [...state.events];
      allEvents = allEvents.map((event) => {
        if (event.id === action.payload.id) return updatedEvent;
        return event;
      });
      state.events = allEvents;
      state.mode = null;
    },
    deleteEvent(state, action) {
      const remainingEvent = state.events.filter((e) => e.id !== action.payload.id);
      state.events = remainingEvent;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice;
