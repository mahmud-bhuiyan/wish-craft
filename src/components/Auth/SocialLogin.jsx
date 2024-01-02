import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContextProvider";
import { signInWithGoogle } from "../../services/apis/User";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Function to handle Google Sign-In and store data in MongoDB
  const handleGoogleSignIn = async () => {
    try {
      // Trigger Google Sign-In
      const result = await googleSignIn();

      // Get the user information from the authentication result
      const loggedInUser = result.user;

      const userData = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        photoURL: loggedInUser.photoURL,
      };

      // Send user data to MongoDB
      await signInWithGoogle(userData);

      // Navigate back to the previous or home page
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
        or Sign in with
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleGoogleSignIn}
          className="flex flex-wrap items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <FcGoogle className="text-2xl" />
          <span className="mx-2">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
