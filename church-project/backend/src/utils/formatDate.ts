import moment from "moment";

export const formatDate = (
  date: Date | string | null | undefined,
  formatStr = "YYYY-MM-DD hh:mm:ss A" 
): string | null => {
  if (!date) return null;

  return moment(date)
    .utcOffset(5 * 60) 
    .format(formatStr);
};
