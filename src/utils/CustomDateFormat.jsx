export const CustomDateFormat = (dateString, showTime = true) => {
  const dateObject = new Date(dateString);

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (!showTime) {
    options.hour = undefined;
    options.minute = undefined;
  }

  const formattedDate = dateObject.toLocaleString("en-US", options);

  return formattedDate;
};
