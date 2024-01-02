import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authPageBG, logo } from "../assets/images/images";
import CustomAuthForm from "../components/Auth/CustomAuthForm";
import SocialLogin from "../components/Auth/SocialLogin";
import { AuthContext } from "../context/AuthContextProvider";
import { toast } from "react-toastify";
import { registerUser } from "../services/apis/User";
import handleError from "../utils/handleError";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formSubmit, setFormSubmit] = useState(false);
  const [formReset, setFormReset] = useState(false);

  // Function to handle user registration
  const handleRegister = async (data) => {
    // Extract user data from the input
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      // Set form submission in progress flag to true
      setFormSubmit(true);

      // Step 1: Register user data to MongoDB
      const response = await registerUserToMongoDB(userData);

      // Check if MongoDB registration was successful
      if (response.user.email) {
        // Step 2: Register user to Firebase authentication
        const result = await registerUserToFirebase(
          userData.email,
          userData.password
        );

        // Check if Firebase registration was successful
        if (result.user.email) {
          // Step 3: Update user profile
          await updateUserProfileInFirebase(userData.name, data?.photo);
        }
      }

      // Step 4: Redirect to the home page and show success message
      navigate("/");
      toast.success(response.message);
      setFormReset(true);
    } catch (error) {
      // If any error occurs during registration, show an error message
      toast.error(handleError(error));
    } finally {
      // Set form submission in progress flag to false regardless of success or failure
      setFormSubmit(false);
    }
  };

  // Function to register user data to MongoDB
  const registerUserToMongoDB = async (userData) => {
    try {
      // Perform MongoDB registration here
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      throw new Error(`${handleError(error)}`);
    }
  };

  // Function to register user to Firebase authentication
  const registerUserToFirebase = async (email, password) => {
    try {
      // Perform Firebase registration here
      const result = await createUser(email, password);
      return result;
    } catch (error) {
      console.log(`Firebase registration error: ${handleError(error)}`);
      throw new Error(`${handleError(error)}`);
    }
  };

  // Function to update user profile in Firebase
  const updateUserProfileInFirebase = async (name, photo) => {
    try {
      // Perform user profile update in Firebase here
      await updateUserProfile(name, photo);
    } catch (error) {
      // Log or handle the error based on your application needs
      console.error(
        `Firebase user profile update error: ${handleError(error)}`
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | WishCraft</title>
      </Helmet>

      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          {/* Background Image Section (Hidden on md screens) */}
          <div
            className="hidden bg-cover md:block md:w-3/5"
            style={{ backgroundImage: `url(${authPageBG})` }}
          >
            {/* Content inside the background image section */}
            <div className="flex items-center justify-center text-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl mb-6">
                  WishCraft
                </h2>
                <p className="max-w-xl my-3 text-gray-300">
                  Discover the story behind WishCraft and our mission to empower
                  users to shape the future of our app.
                </p>
                <p className="max-w-xl text-gray-300">
                  Submit Your Wishes: Share your ideas and let the community
                  weigh in.
                </p>
              </div>
            </div>
          </div>

          {/* Register Form Section */}
          <div className="flex items-center w-full max-w-md px-6 mx-auto md:w-2/5">
            <div className="flex-1">
              {/* Logo and registration heading */}
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <Link to="/">
                    <img className="w-auto h-9" src={logo} alt="logo" />
                  </Link>
                </div>
                <p className="mt-3 text-gray-500 dark:text-gray-300 capitalize">
                  Create a new account
                </p>
              </div>

              <div className="mt-8">
                {/* custom Register form */}
                <CustomAuthForm
                  buttonText="Register"
                  onSubmit={handleRegister}
                  formSubmit={formSubmit}
                  formReset={formReset}
                />

                {/* Social Login Section */}
                <SocialLogin />

                {/* Login link */}
                <p className="mt-6 text-sm text-center text-gray-400">
                  Do you have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Login
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
