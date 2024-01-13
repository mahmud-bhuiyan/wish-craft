import { createContext, useContext, useEffect, useState } from "react";
import { getAllRequest, searchRequest } from "../services/apis/Feature";
import { AuthContext } from "./AuthContextProvider";

export const FeaturesContext = createContext(null);

const FeaturesContextProvider = ({ children }) => {
  // Accessing user information from the authentication context
  const { user } = useContext(AuthContext);

  // State variables for managing features data and loading status
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  // State variables for handling search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Effect hook to fetch data based on user, refetch and search
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        // Checking if there is a search term to determine which API call to make
        if (searchTerm) {
          // If there is a search term, call the search API
          response = await searchRequest(searchTerm);
        } else {
          // Otherwise, get all features
          response = await getAllRequest();
        }

        // Update loading status
        setLoading(false);

        // Update features data based on the API response
        if (response && response.features) {
          setFeatures(response.features);

          // If there are search results, set them in the context
          if (response.searchResults) {
            setSearchResults(response.searchResults);
          }
        }
      } catch (error) {
        // Log any errors that occur during the API calls
        console.log(error);
      }
    };

    // Initial data fetch
    fetchData();

    // Set up interval for periodic data fetching
    const intervalId = setInterval(() => {
      fetchData();
    }, 2 * 60 * 1000);

    // Clean up interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [user, refetch, searchTerm]);

  const featuresData = {
    features,
    setFeatures,
    loading,
    setLoading,
    setRefetch,
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
  };

  return (
    <FeaturesContext.Provider value={featuresData}>
      {children}
    </FeaturesContext.Provider>
  );
};

export default FeaturesContextProvider;
