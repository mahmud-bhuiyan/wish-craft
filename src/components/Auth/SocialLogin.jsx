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
    <div className="flex flex-col items-center">
      <button
        onClick={handleGoogleSignIn}
        className="w-full max-w-xs font-semibold shadow-sm rounded-lg py-2 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
        type="button"
      >
        <div className="bg-white p-1 rounded-full">
          <FcGoogle className="text-xl" />
        </div>
        <span className="ml-2">Sign In with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
