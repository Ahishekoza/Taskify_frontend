import { format } from "date-fns";

export const stringToBoolean = (str) => {
  return str.toLowerCase() === "true" ? true : false;
};

export const formatDate = (dueDate) => {
  const date = new Date(dueDate);
   const isoDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

  return isoDate;
};
