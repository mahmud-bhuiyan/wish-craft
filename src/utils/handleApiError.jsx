const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error("Request failed with status code:", error.response.status);
    console.error("Error response data:", error.response.data);
    throw error.response.data?.msg || "Request failed";
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response received from the server");
    throw "No response from the server";
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error setting up the request:", error.message);
    throw "Error setting up the request";
  }
};

export default handleApiError;
