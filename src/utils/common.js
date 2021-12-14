import moment from "moment";

export const format = ["DD/MM/YY  ddd  hh:mm a", "DD-MMM-YY", "ddd  hh:mm a"];

export const dateFormat = (value, format) => {
  return moment(value).format(format);
};
export const timeFormat = (value, format) => {
  return moment(value).CalendarKey(format);
};

// export const Truth = {
//   YES: "Yes",
//   NO: "No",
// };

// export const Status = {
//   ACTIVE: "actiive",
//   BAN: "ban",
//   INACTIVE: "inactive",
// };
