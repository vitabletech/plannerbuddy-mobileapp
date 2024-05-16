import customAxios from './customAxios';

/**
 * Updates the user profile with the provided data.
 * @param {Object} userData - The data to update the user profile.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call.
 */
export const updateProfile = async (userData) => {
  try {
    const response = await customAxios.put('api/user', userData);
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Fetches event details from the server.
 * @returns {Object} - The event details.
 */
export const addEvent = async (eventData) => {
  try {
    const response = await customAxios.post('event', eventData);
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Fetches event details from the server.
 * @returns {Object} - The event details.
 */
export const updateEvent = async (eventData) => {
  try {
    const response = await customAxios.put('event', eventData);
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Fetches event details from the server.
 * @returns {Object} - The event details.
 */
export const deleteEvent = async (eventId) => {
  try {
    const response = await customAxios.delete(`event/${eventId}`);
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Adds a guest using the provided guest data.
 * @param {Object} guestData - The data of the guest to be added.
 * @returns {Promise<Object>} - A promise that resolves to the response object if successful, or rejects with an error object if there's an error.
 */
export const addGuest = async (guestData) => {
  try {
    const response = await customAxios.post('guest', guestData);
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Adds a gift to the server.
 * @param {Object} giftData - The data of the gift to be added.
 * @returns {Promise<Object>} - A promise that resolves to the server response or rejects with an error.
 */
export const addGift = async (giftData) => {
  try {
    const response = await customAxios.post('gift', giftData);
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Deletes a gift.
 *
 * @param {Object} giftData - The gift data to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the response object if the gift is deleted successfully,
 * or rejects with an error object if an error occurs.
 */
export const deleteGift = async (giftId) => {
  try {
    const response = await customAxios.delete(`gift/${giftId}`);
    return response;
  } catch (error) {
    return error;
  }
};
