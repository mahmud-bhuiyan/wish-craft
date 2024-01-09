import { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/apis/User";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // admin user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const currentUser = await getUserProfile();
        setUserDetails(currentUser.user);
      } catch (error) {
        console.log("null");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setUserDetails, setIsLoading]);

  const authInfo = {
    userDetails,
    setUserDetails,
    isLoading,
    setIsLoading,
    allUsers,
    setAllUsers,
  };

  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};
