import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const EventContext = createContext({});

export function useEventContext() {
  return useContext(EventContext);
}

export const EventProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState('add');
  const [editIndex, setEditIndex] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 0,
      name: 'Birthday',
      address: 'Apt. 295, 1 Clos Du Midi, 45982 Villefranche-sur-Saône',
      date: 'Tue Apr 02 2024',
      guests: [],
    },
    {
      id: 1,
      name: 'Marriage',
      address: '8 Rond-point Paul Eluard, 42752 Grasse',
      date: 'Mon Apr 08 2024',
      guests: [],
    },
    {
      id: 2,
      name: 'House Party',
      address: '9393 Anse De Colombes, 85240 Châlons-en-Champagne',
      date: 'Tue Apr 02 2024',
      guests: [],
    },
  ]);

  const handleAddEvent = (event) => {
    setEvents((state) => [...state, { ...event, id: state.length }]);
  };

  const handleDeleteEvent = (id) => {
    const remainingEvent = events.filter((e) => e.id !== id);
    setEvents(remainingEvent);
  };

  const handleUpdateEvent = (id, event) => {
    const updatedEvent = [...events];
    updatedEvent.splice(id, 1);
    updatedEvent.splice(id, 0, event);
    setEvents(updatedEvent);
  };

  const handleDialogClose = () => setShowModal((state) => !state);
  const handleDialogOpen = () => setShowModal((state) => !state);
  const handleSetMode = (m) => setMode(m);
  const handleSetEditIndex = (index) => setEditIndex(index);

  const addGuestsToEvent = (guests) => {
    const updatedEvent = [...events];
    const event = updatedEvent.find((e) => e.id === editIndex);
    event.guests = [...guests];
    updatedEvent[editIndex] = { ...event };
    setMode('add');
    setEvents(updatedEvent);
  };
  const value = useMemo(
    () => ({
      events,
      editIndex,
      showModal,
      mode,
      addGuestsToEvent: (guests) => addGuestsToEvent(guests),
      setMode,
      setEditIndex: (idx) => handleSetEditIndex(idx),
      openDialog: handleDialogOpen,
      closeDialog: handleDialogClose,
      addEvent: (event) => handleAddEvent(event),
      updateEvent: (id, event) => handleUpdateEvent(id, event),
      deleteEvent: (id) => handleDeleteEvent(id),
    }),
    [
      events,
      editIndex,
      showModal,
      mode,
      addGuestsToEvent,
      handleSetMode,
      handleSetEditIndex,
      handleDialogOpen,
      handleDialogClose,
      handleAddEvent,
      handleUpdateEvent,
      handleDeleteEvent,
    ],
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired, // add PropTypes validation for children
};
