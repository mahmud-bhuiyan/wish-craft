import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { MdSearch } from "react-icons/md";
import { FeaturesContext } from "../context/FeaturesContextProvider";
import FeatureRequestItem from "../components/Feature/FeatureRequestItem";
import Loader from "../components/Loader";

const Home = () => {
  const { features, loading, searchTerm, searchResults, setSearchTerm } =
    useContext(FeaturesContext);

  return (
    <div>
      <Helmet>
        <title>WishCraft</title>
      </Helmet>

      <div className="max-w-screen-xl mx-auto">
        <div className="mx-2 my-4">
          <div className="lg:flex bg-white rounded-lg p-1">
            {/* Content for the left div */}
            <div className="lg:w-1/3 lg:order-first p-4 border-2 m-3 rounded-lg">
              <p>Left Column</p>
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
