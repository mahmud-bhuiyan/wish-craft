const handleError = (error) => {
  // Add more detailed error handling if needed
  if (error.response) {
    // The request was made and the server responded with a status code
    return `${error.response.status}`;
  } else {
    // Something happened in setting up the request that triggered an Error
    return `${error}`;
  }
};

export default handleError;
