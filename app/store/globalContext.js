import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext({});

export function useGlobal() {
  return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {
  const [initial, setInitial] = useState('login');

  function handleChange(value) {
    setInitial(value);
  }

  const value = useMemo(
    () => ({
      initial,
      onChange: (value) => handleChange(value),
    }),

    [initial, handleChange],
  );
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
