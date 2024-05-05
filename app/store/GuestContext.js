// import React, { createContext, useContext, useMemo, useState } from 'react';
// import PropTypes from 'prop-types';

// export const GuestContext = createContext({});

// export function useGuestContext() {
//   return useContext(GuestContext);
// }

// export const GuestProvider = ({ children }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [guest, setGuest] = useState();

//   const handleAddGuest = (guestData) => {
//     setGuest({ ...guestData });
//   };

//   const handleDialogClose = () => {
//     setShowModal((state) => !state);
//   };

//   const handleDialogOpen = () => setShowModal((state) => !state);

//   const value = useMemo(
//     () => ({
//       guest,
//       showModal,
//       openDialog: handleDialogOpen,
//       closeDialog: handleDialogClose,
//       addGuest: (event) => handleAddGuest(event),
//     }),
//     [guest, showModal, handleDialogOpen, handleDialogClose, handleAddGuest],
//   );

//   return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
// };

// GuestProvider.propTypes = {
//   children: PropTypes.node.isRequired, // add PropTypes validation for children
// };

import { createSlice } from '@reduxjs/toolkit';

const guestSlice = createSlice({
  name: 'guest',
  initialState: {
    guests: [],
    showModal: false,
  },
  reducers: {
    openDialog(state) {
      state.showModal = !state.showModal;
    },
    closeDialog(state) {
      state.showModal = !state.showModal;
    },
    addGuest(state, action) {
      state.guests = [...state.guests, { ...action.payload.guest }];
    },
  },
});

export const guestActions = guestSlice.actions;
export default guestSlice;
