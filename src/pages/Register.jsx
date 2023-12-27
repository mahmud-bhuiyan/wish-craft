import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { logo } from "../assets/images/images";
import CustomAuthForm from "../components/Auth/CustomAuthForm";
import SocialLogin from "../components/Auth/SocialLogin";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (data) => {
    // extracting data from Register form
    const { name, email, password, confirmPassword } = data;
    console.log(name, email, password, confirmPassword);

    // register with firebase
    createUser(email, password)
      .then((result) => {
        if (result.user.email) {
          updateUserProfile(name, data?.photo)
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
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
                  MRB Register
                </h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          {/* Register Form Section */}
          <div className="flex items-center w-full max-w-md px-6 mx-auto md:w-2/5">
            <div className="flex-1">
              <div className="text-center">
                <Link to="/" className="flex justify-center mx-auto">
                  <img className="w-auto h-9" src={logo} alt="logo" />
                </Link>
                <p className="mt-3 text-gray-500 dark:text-gray-300 capitalize">
                  Create a new account
                </p>
              </div>

              <div className="mt-8">
                {/* custom Register form */}
                <CustomAuthForm
                  buttonText="Register"
                  onSubmit={handleRegister}
                />

                {/* Social Login */}
                <SocialLogin />

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
