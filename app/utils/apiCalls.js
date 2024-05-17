import customAxios from './customAxios';

/**
 * Handles API requests and returns the response or error.
 * @param {Function} request - The axios request function to be called.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call or rejects with an error.
 */
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * Updates the user profile with the provided data.
 * @param {Object} userData - The data to update the user profile.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call.
 */
export const updateProfile = (userData) => {
  return handleRequest(() => customAxios.put('api/user', userData));
};

/**
 * Adds an event using the provided event data.
 * @param {Object} eventData - The data of the event to be added.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call.
 */
export const addEvent = (eventData) => {
  return handleRequest(() => customAxios.post('event', eventData));
};

/**
 * Updates an event with the provided event data.
 * @param {Object} eventData - The data of the event to be updated.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call.
 */
export const updateEvent = (eventData) => {
  return handleRequest(() => customAxios.put('event', eventData));
};

/**
 * Deletes an event by ID.
 * @param {string} eventId - The ID of the event to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call.
 */
export const deleteEvent = (eventId) => {
  return handleRequest(() => customAxios.delete(`event/${eventId}`));
};

/**
 * Adds a guest using the provided guest data.
 * @param {Object} guestData - The data of the guest to be added.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call.
 */
export const addGuest = (guestData) => {
  return handleRequest(() => customAxios.post('guest', guestData));
};

/**
 * Adds a gift using the provided gift data.
 * @param {Object} giftData - The data of the gift to be added.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call.
 */
export const addGift = (giftData) => {
  return handleRequest(() => customAxios.post('gift', giftData));
};

/**
 * Deletes a gift by ID.
 * @param {string} giftId - The ID of the gift to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call.
 */
export const deleteGift = (giftId) => {
  return handleRequest(() => customAxios.delete(`gift/${giftId}`));
};
