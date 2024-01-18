import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/apis/User";
import { AuthContext } from "./AuthContextProvider";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // admin user data
  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        // Used setTimeout to fetch data
        const timeoutId = setTimeout(async () => {
          try {
            setIsLoading(true);
            const currentUser = await getUserProfile();
            setUserDetails(currentUser.user);
          } catch (error) {
            console.log("null");
          } finally {
            setIsLoading(false);
          }
        }, 1000);

        return () => clearTimeout(timeoutId);
      } else {
        return;
      }
    };

    fetchData();
  }, [user?.email, setUserDetails, setIsLoading]);

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
