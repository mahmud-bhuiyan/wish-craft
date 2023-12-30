import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { logo } from "../assets/images/images";
import CustomAuthForm from "../components/Auth/CustomAuthForm";
import SocialLogin from "../components/Auth/SocialLogin";
import { AuthContext } from "../context/AuthContextProvider";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const [formSubmit, setFormSubmit] = useState(false);

  const handleLogin = async (data) => {
    try {
      setFormSubmit(true);

      // extracting data from Login form
      const { email, password } = data;

      // login with firebase using async/await
      const result = await loginUser(email, password);

      if (result.user.email) {
        navigate(from, { replace: true });
        toast.success("User login successful.");
      }
    } catch (error) {
      console.log(error.code, error.message);
      toast.error("Something went wrong!");
    } finally {
      setFormSubmit(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          {/* Background Image Section (Hidden on md screens) */}
          <div
            className="hidden bg-cover md:block md:w-3/5"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center justify-center text-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  MRB LOGIN
                </h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="flex items-center w-full max-w-md px-6 mx-auto md:w-2/5">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <Link to="/">
                    <img className="w-auto h-9" src={logo} alt="logo" />
                  </Link>
                </div>

                <p className="mt-3 text-gray-500 dark:text-gray-300 capitalize">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                {/* custom login form */}
                <CustomAuthForm
                  buttonText="Login"
                  onSubmit={handleLogin}
                  formSubmit={formSubmit}
                />

                {/* Social Login */}
                <SocialLogin />

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
    </>
  );
};

export default Login;
