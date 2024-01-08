const CustomDateFormat = (dateString, options = {}) => {
  const dateObject = new Date(dateString);
  const currentDate = new Date();

  const { showTimeOff = false, timeInWords = false } = options;

  if (timeInWords) {
    const timeDifference = currentDate - dateObject;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);

    if (secondsDifference < 60) {
      return "a few seconds ago";
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minute${
        minutesDifference > 1 ? "s" : ""
      } ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
    }
  }

  const defaultOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  if (showTimeOff) {
    mergedOptions.hour = undefined;
    mergedOptions.minute = undefined;
  }

  const formattedDate = dateObject.toLocaleString("en-US", mergedOptions);

  return formattedDate;
};

export default CustomDateFormat;
