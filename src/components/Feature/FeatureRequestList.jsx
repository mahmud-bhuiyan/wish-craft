import { useContext } from "react";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import FeatureRequestItem from "./FeatureRequestItem";
import Loader from "../Loader";

const FeatureRequestList = () => {
  const { features, loading } = useContext(FeaturesContext);

  return (
    <div className="mx-2 my-4">
      <div className="lg:flex bg-white rounded-lg p-1">
        {/* Content for the left div */}
        <div className="lg:w-1/3 lg:order-first p-4 border-2 m-3 rounded-lg">
          <p>Left Column</p>
        </div>

        {/* Content for the right div */}
        <div className="flex-1 p-4 border-2 m-3 rounded-lg">
          {loading ? (
            <Loader />
          ) : (
            features.map((feature) => (
              <FeatureRequestItem key={feature._id} feature={feature} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureRequestList;
