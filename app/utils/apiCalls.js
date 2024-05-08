import customAxios from './customAxios';

/**
 * Fetches guest data from the server.
 * @param {number} page - The page number to fetch.
 * @returns {Promise} - A promise that resolves to the response from the server.
 */
export const fetchGuest = async (page) => {
  try {
    const response = await customAxios.get('guest', {
      params: {
        page,
        limit: 10,
      },
    });
    console.log('response :: ', response);
    return response;
  } catch (error) {
    console.error('error :: ', error);
    return error;
  }
};

/**
 * Fetches events from the server.
 * @param {number} page - The page number to fetch events from.
 * @returns {Promise} - A promise that resolves to the response from the server.
 * @throws {Error} - If an error occurs during the fetch.
 */
export const fetchEvents = async (page) => {
  try {
    const response = await customAxios.get('event', {
      params: {
        page,
        limit: 10,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    // You can throw the error again to let the caller handle it
    throw error;
  }
};

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
