import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FaQuestion } from "react-icons/fa6";
import { MdDone, MdSearch } from "react-icons/md";
import { FeaturesContext } from "../context/FeaturesContextProvider";
import FeatureRequestItem from "../components/Feature/FeatureRequestItem";
import Loader from "../components/Loader";
import { WebsiteContext } from "../context/WebsiteContextProvider";

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
  } = useContext(FeaturesContext);

  const { websiteInfo } = useContext(WebsiteContext);

  // An array of sorting options
  const sortingOptions = [
    { field: "createdAt", order: "desc", label: "Newest" },
    { field: "createdAt", order: "asc", label: "Oldest" },
    { field: "likes", order: "desc", label: "Likes (Higher to Lower)" },
    { field: "likes", order: "asc", label: "Likes (Lower to Higher)" },
    { field: "comments", order: "desc", label: "Comments (Higher to Lower)" },
    { field: "comments", order: "asc", label: "Comments (Lower to Higher)" },
    { field: "title", order: "asc", label: "A-Z" },
    { field: "title", order: "desc", label: "Z-A" },
  ];

  return (
    <div>
      <Helmet>
        <title>{websiteInfo?.name || ""}</title>
      </Helmet>

      <div className="max-w-screen-xl mx-auto">
        <div className="mx-2 my-4">
          <div className="lg:flex bg-white rounded-lg p-1">
            {/* Content for the left div */}
            <div className="lg:w-1/3 lg:order-first p-4 border-2 m-3 rounded-lg">
              <h3 className="uppercase font-bold lg:text-xl">Sort By</h3>
              {/* Sorting buttons with dynamic options */}
              {sortingOptions.map((option) => (
                <button
                  key={option.label}
                  className={`flex justify-center gap-2 align-middle p-2 bg-slate-100 rounded mr-2 mt-2 lg:w-full hover:bg-slate-200 text-gray-600 font-semibold ${
                    sortBy === option.field && sortOrder === option.order
                      ? "bg-green-200/50 hover:bg-green-200"
                      : ""
                  }`}
                  onClick={() => handleSort(option.field, option.order)}
                >
                  {option.label}{" "}
                  {sortBy === option.field && sortOrder === option.order ? (
                    <MdDone className="text-xl mt-1 bg-green-300 rounded text-[#332532]" />
                  ) : (
                    <FaQuestion className="text-xl p-1 mt-1 bg-green-300 rounded text-[#332532]" />
                  )}
                </button>
              ))}
            </div>

            {/* Content for the right div */}
            <div className="flex-1">
              {/* Search bar with icon */}
              <div className="relative m-3">
                <MdSearch className="absolute left-3 top-2.5 text-gray-500 text-2xl" />
                <input
                  type="text"
                  placeholder="Search by keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 pl-10 border rounded w-full"
                />
              </div>
              <div className="p-4 border-2 m-3 rounded-lg">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
