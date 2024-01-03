import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { logo } from "../assets/images/images";
import CustomAuthForm from "../components/Auth/CustomAuthForm";
import SocialLogin from "../components/Auth/SocialLogin";
import { AuthContext } from "../context/AuthContextProvider";
import { userLogin } from "../services/apis/User";
import handleError from "../utils/handleError";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formSubmit, setFormSubmit] = useState(false);
  const [formReset, setFormReset] = useState(false);

  const handleLogin = async (data) => {
    // Extract user data from the input
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      // Set form submission in progress flag to true
      setFormSubmit(true);

      // Step 1: Login user to MongoDB
      const response = await loginUserUsingMongoDB(userData);

      // Check if MongoDB login was successful
      if (response.user.email) {
        // Step 2: login user to Firebase authentication
        await loginUserUsingFirebase(userData.email, userData.password);
      }
      // Step 3: Redirect to the home page and show success message
      navigate(from, { replace: true });
      toast.success(response.message);
      setFormReset(true);
    } catch (error) {
      // console.log(error.code, error.message);
      toast.error(error.message);
    } finally {
      setFormSubmit(false);
    }
  };

  // Function to login user to MongoDB
  const loginUserUsingMongoDB = async (userData) => {
    try {
      // Perform MongoDB login User here
      const response = await userLogin(userData);
      return response;
    } catch (error) {
      throw new Error(`${handleError(error)}`);
    }
  };

  // Function to login user to Firebase authentication
  const loginUserUsingFirebase = async (email, password) => {
    try {
      // Perform Firebase login here
      const result = await loginUser(email, password);
      return result;
    } catch (error) {
      console.log(`Firebase login error: ${handleError(error)}`);
      throw new Error(`${handleError(error)}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | WishCraft</title>
      </Helmet>

      <div
        className="bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("https://picsum.photos/1920/1080")' }}
      >
        <div className="h-screen flex justify-center items-center">
          <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <Link to="/">
                  <img className="w-auto h-9" src={logo} alt="logo" />
                </Link>
              </div>

              <p className="mt-3 text-gray-500 dark:text-gray-300 capitalize">
                Welcome back to WishCraft
              </p>
            </div>
            <div className="mt-6 mb-8 flex flex-col items-center">
              <div className="w-full flex-1">
                {/* Social Login */}
                <SocialLogin />

                <div className="mt-4 mb-8 border-b text-center max-w-sm mx-auto">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign In with
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  {/* custom login form */}
                  <CustomAuthForm
                    buttonText="Login"
                    onSubmit={handleLogin}
                    formSubmit={formSubmit}
                    formReset={formReset}
                  />

                  <p className="mt-6 text-sm text-center text-gray-400">
                    Don&lsquo;t have an account yet?{" "}
                    <Link
                      to="/auth/register"
                      className="text-blue-500 focus:outline-none focus:underline hover:underline"
                    >
                      Register
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
