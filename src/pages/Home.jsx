import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { MdSearch } from "react-icons/md";
import { FeaturesContext } from "../context/FeaturesContextProvider";
import FeatureRequestItem from "../components/Feature/FeatureRequestItem";
import Loader from "../components/Loader";
import { WebsiteContext } from "../context/WebsiteContextProvider";
import SortingButtons from "../components/SortingButtons";
import Pagination from "../components/Pagination";
import FilterButton from "../components/FilterButton";

const Home = () => {
  const {
    features,
    loading,
    searchTerm,
    searchResults,
    setSearchTerm,
    handleSort,
    sortBy,
    sortOrder,
    currentPage,
    itemsPerPage,
    totalPages,
    hasMoreNext,
    hasMorePrev,
    handlePageChange,
    handleItemsPerPageChange,
    handleFilter,
    selectedStatus,
  } = useContext(FeaturesContext);

  const { websiteInfo } = useContext(WebsiteContext);

  return (
    <div>
      <Helmet>
        <title>{websiteInfo?.name || ""}</title>
      </Helmet>

      <div className="max-w-screen-xl mx-auto">
        <div className="mx-1 sm:mx-2 my-4">
          <div className="lg:flex bg-white rounded-lg p-1">
            {/* Content for the left div */}
            <div className="lg:w-1/3 lg:order-first">
              <div className="p-2 sm:p-4 border-2 m-2 sm:m-3 rounded-lg">
                <h3 className="uppercase font-bold lg:text-xl">
                  FILTER BY STATUS
                </h3>
                <FilterButton
                  handleFilter={handleFilter}
                  selectedStatus={selectedStatus}
                />
              </div>
              <div className="p-2 sm:p-4 border-2 m-2 sm:m-3 rounded-lg">
                <h3 className="uppercase font-bold lg:text-xl">Sort By</h3>
                {/* Sorting buttons with dynamic options */}
                <SortingButtons
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />
              </div>
            </div>

            {/* Content for the right div */}
            <div className="flex-1">
              {/* Search bar with icon and items per page dropdown */}
              <div className="sm:flex justify-between items-center m-2 sm:m-3">
                <div className="relative sm:w-3/5">
                  <MdSearch className="absolute left-3 top-2.5 text-gray-500 text-2xl" />
                  <input
                    type="text"
                    placeholder="Search by keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 pl-10 border rounded w-full"
                  />
                </div>
                <div className="flex items-center w-auto mt-3 sm:mt-0 justify-end">
                  <label className="mr-2">Show requests:</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) =>
                      handleItemsPerPageChange(parseInt(e.target.value))
                    }
                    className="border rounded p-1 sm:p-2"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>

              {/* Feature items */}
              <div className="p-2 sm:p-4 border-2 m-2 sm:m-3 rounded-lg">
                {loading ? (
                  <Loader />
                ) : searchTerm && searchResults.length > 0 ? (
                  // Display search results if there are any
                  searchResults.map((result) => (
                    <FeatureRequestItem key={result._id} feature={result} />
                  ))
                ) : (
                  // Display features if no search or no search results
                  features.map((feature) => (
                    <FeatureRequestItem key={feature._id} feature={feature} />
                  ))
                )}

                {/* Pagination controls */}
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasMorePrev={hasMorePrev}
                    hasMoreNext={hasMoreNext}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
