/** @format */

import moment from "moment";

export const formatDate = (value, format = "L") => {
  if (!value) return "";
  // Accept Date, string, or number (timestamp)
  const m =
    typeof value === "string" && value.match(/^\d{1,2}:\d{2}/)
      ? moment(value, ["H:mm", "HH:mm"]) // time-only strings shouldn't be here for date
      : moment(value);
  return m.isValid() ? m.format(format) : "";
};

export const formatTime = (value, format = "hh:mm A") => {
  if (!value) return "";
  // Handle time-only strings like "14:30"
  const m =
    typeof value === "string" && value.match(/^\d{1,2}:\d{2}/)
      ? moment(value, ["H:mm", "HH:mm"])
      : moment(value);
  return m.isValid() ? m.format(format) : "";
};

export const formatDateTime = (value, format = "L LT") => {
  if (!value) return "";
  const m = moment(value);
  return m.isValid() ? m.format(format) : "";
};
