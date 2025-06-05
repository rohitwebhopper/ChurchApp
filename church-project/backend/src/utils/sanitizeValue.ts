export const sanitizeValue = (value: any): any => {
  return value === "" || value === null || value === undefined ? null : value;
};
