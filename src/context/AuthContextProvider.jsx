import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import app from "../services/firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create/register user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update users name and photo
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // update users email
  const updateUserEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  };

  // update users password
  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };

  // login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout user
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current User: ", currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    loading,
    loginUser,
    logoutUser,
    updateUserEmail,
    updateUserPassword,
    updateUserProfile,
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
