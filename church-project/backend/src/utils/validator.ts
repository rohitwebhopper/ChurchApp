export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const regex = /^\+?[0-9]{10,15}$/;
  return regex.test(phone);
};

export const isValidName = (name: string): boolean => {
  return typeof name === "string" && name.trim().length >= 2;
};
