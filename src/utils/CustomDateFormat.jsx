export const CustomDateFormat = (dateString) => {
  const dateObject = new Date(dateString);

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = dateObject.toLocaleString("en-US", options);

  return formattedDate;
};
