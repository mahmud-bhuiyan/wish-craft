import { createContext, useContext, useEffect, useState } from "react";
import { getAllRequest } from "../services/apis/Feature";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContextProvider";

export const FeaturesContext = createContext(null);

const FeaturesContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

    if (user) {
      const intervalId = setInterval(() => {
        fetchData();
      }, 1 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [user]);

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
