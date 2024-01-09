import { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/apis/User";

export const UserContext = createContext({ user: {}, setUser: () => {} });

export const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUser = await getUserProfile();
        setUserDetails(currentUser.user);
      } catch (error) {
        console.log("null");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setUserDetails, setLoading]);

  const authInfo = {
    userDetails,
    setUserDetails,
    loading,
    setLoading,
  };

  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};
