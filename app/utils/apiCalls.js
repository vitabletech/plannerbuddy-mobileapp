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
 * Adds an event using the provided event data.
 * @param {Object} addEventGuests - The data of the event to be added.
 * @returns {Promise<Object>} - A promise that resolves to the response from the API call.
 */
export const addEventGuests = (eventGuestData) => {
  return handleRequest(() => customAxios.post('event/guests', eventGuestData));
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
 * Updates a guest with the given data.
 *
 * @param {Object} guestData - The data to update the guest with.
 * @param {string} guestId - The ID of the guest to update.
 * @returns {Promise} A promise that resolves to the updated guest data.
 */
export const updateGuest = (guestData, guestId) => {
  return handleRequest(() => customAxios.put(`guest/${guestId}`, guestData));
};

/**
 * Deletes a guest with the specified ID.
 *
 * @param {string} guestId - The ID of the guest to delete.
 * @returns {Promise} A promise that resolves when the guest is deleted.
 */
export const deleteGuest = (guestId) => {
  return handleRequest(() => customAxios.delete(`guest/${guestId}`));
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
