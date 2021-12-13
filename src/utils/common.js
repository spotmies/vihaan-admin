import moment from "moment";

export const format = ["ddd  hh:mm:ss ", "DD-MMM-YY"];

export const dateFormat = (value, format) => {
  return moment(value).format(format);
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
