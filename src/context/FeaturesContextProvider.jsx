import { createContext, useContext, useEffect, useState } from "react";
import { getAllRequest, searchRequest } from "../services/apis/Feature";
import { AuthContext } from "./AuthContextProvider";
import { WebsiteContext } from "./WebsiteContextProvider";

export const FeaturesContext = createContext(null);

const FeaturesContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { websiteInfo } = useContext(WebsiteContext);

  // State variables for managing features data and loading status
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [statuses, setStatuses] = useState([]);

  // State variables for handling search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // State variables for sorting
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [hasMoreNext, setHasMoreNext] = useState(false);
  const [hasMorePrev, setHasMorePrev] = useState(false);

  // State variable for handling status filtering
  const [selectedStatus, setSelectedStatus] = useState("");

  // Get the activeSorting value from websiteInfo
  const activeSorting = websiteInfo?.sortingOrder;

  // Set sortBy and sortOrder based on activeSorting
  useEffect(() => {
    if (activeSorting === "MostVoted") {
      setSortBy("likes");
      setSortOrder("desc");
    } else if (activeSorting === "NewestFirst") {
      setSortBy("createdAt");
      setSortOrder("desc");
    } else if (activeSorting === "OldestFirst") {
      setSortBy("createdAt");
      setSortOrder("asc");
    }
  }, [activeSorting]);

  // Effect hook to fetch data based on user, refetch, search, sortBy, sortOrder, and selectedStatus
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        // Checking if there is a search term to determine which API call to make
        if (searchTerm) {
          // If there is a search term, call the search API
          response = await searchRequest(
            searchTerm,
            currentPage,
            itemsPerPage,
            selectedStatus
          );
        } else if (sortBy) {
          // If there is sortBy, call the API with sorted data
          response = await getAllRequest(
            sortBy,
            sortOrder,
            currentPage,
            itemsPerPage,
            selectedStatus
          );
        } else if (selectedStatus) {
          // If there is a selected status, call the API with status filtering
          response = await getAllRequest(
            null,
            null,
            currentPage,
            itemsPerPage,
            selectedStatus
          );
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
          // Set pagination information
          setTotalItems(response.pageInfo.totalItems);
          setTotalPages(response.pageInfo.totalPages);
          setHasMoreNext(response.pageInfo.hasMoreNext);
          setHasMorePrev(response.pageInfo.hasMorePrev);
          setStatuses(response.allItemsStatuses);
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
  }, [
    user,
    refetch,
    searchTerm,
    sortBy,
    sortOrder,
    selectedStatus,
    currentPage,
    itemsPerPage,
  ]);

  const handlePageChange = async (newPage) => {
    try {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        setRefetch((prevRefetch) => !prevRefetch);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemsPerPageChange = async (newItemsPerPage) => {
    try {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
      setRefetch((prevRefetch) => !prevRefetch);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = async (field, order) => {
    try {
      setSortBy(field);
      setSortOrder(order);
      setCurrentPage(1);
      setRefetch((prevRefetch) => !prevRefetch);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = async (status) => {
    try {
      setSelectedStatus(status);
      setCurrentPage(1);
      setRefetch((prevRefetch) => !prevRefetch);
    } catch (error) {
      console.error(error);
    }
  };

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
    handleSort,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    hasMoreNext,
    hasMorePrev,
    handlePageChange,
    handleItemsPerPageChange,
    statuses,
    handleFilter,
    selectedStatus,
  };

  return (
    <FeaturesContext.Provider value={featuresData}>
      {children}
    </FeaturesContext.Provider>
  );
};

export default FeaturesContextProvider;
