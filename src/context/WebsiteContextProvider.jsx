import { createContext, useEffect, useState } from "react";
import { getWebsiteInfo } from "../services/apis/Website";

export const WebsiteContext = createContext(null);

const WebsiteContextProvider = ({ children }) => {
  const [websiteInfo, setWebsiteInfo] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getWebsiteInfo();
        setWebsiteInfo(data.websiteInfo);
      } catch (error) {
        console.error("Error fetching feature:", error);
      }
    };

    fetchUsers();
  }, [setWebsiteInfo, refetch]);

  const siteInfo = {
    websiteInfo,
    setRefetch,
  };

  return (
    <WebsiteContext.Provider value={siteInfo}>
      {children}
    </WebsiteContext.Provider>
  );
};

export default WebsiteContextProvider;
