import { createContext, useEffect, useState } from "react";
import { getAllRequest } from "../services/apis/Feature";
import { toast } from "react-toastify";

export const FeaturesContext = createContext(null);

const FeaturesContextProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllRequest();
        setLoading(false);

        if (response && response.features) {
          setFeatures(response.features);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);

  const featuresData = {
    features,
    setFeatures,
    loading,
    setLoading,
  };
  return (
    <FeaturesContext.Provider value={featuresData}>
      {children}
    </FeaturesContext.Provider>
  );
};

export default FeaturesContextProvider;
