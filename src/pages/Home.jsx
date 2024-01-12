import { useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FeaturesContext } from "../context/FeaturesContextProvider";
import FeatureRequestItem from "../components/Feature/FeatureRequestItem";
import Loader from "../components/Loader";
import { MdSearch } from "react-icons/md"; // Import the MdSearch icon

const Home = () => {
  const { features, loading } = useContext(FeaturesContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering function
  const filterFeatures = (feature) => {
    const searchRegex = new RegExp(searchTerm, "i");
    return (
      searchRegex.test(feature.title) || searchRegex.test(feature.description)
    );
  };

  // Filtered features based on the search term
  const filteredFeatures = features.filter(filterFeatures);

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
                ) : (
                  filteredFeatures.map((feature) => (
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
