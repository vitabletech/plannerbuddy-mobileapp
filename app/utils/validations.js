export const emailRegex = /^[\w-.]+@gmail\.com$/;
export const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

export const validateEmail = (value) => {
  if (!value.trim()) return 'Email is required';
  if (!emailRegex.test(value)) return 'Please enter a valid Gmail';
  return null;
};

export const validateName = (value) => {
  if (!value.trim()) return 'Name is required';
  if (!nameRegex.test(value)) return 'Please enter a valid name';
  return null;
};

export const validatePhone = (value) => {
  if (!value.trim()) return 'Phone is required';
  if (value.length !== 10) return 'Please enter a valid phone number';
  return null;
};

export const validateAddress = (value) => {
  if (!value.trim()) return 'Address is required';
  return null;
};

export const validatePassword = (value) => {
  if (!value.trim()) return 'Password is required';
  return null;
};
