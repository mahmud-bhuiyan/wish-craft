import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { error } from "../assets/images/images";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>

      <div className="min-h-screen min-w-screen flex justify-center items-center">
        <div className="text-center">
          <img
            className="w-full max-w-lg md:mx-auto"
            src={error}
            alt="error image"
          />
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl capitalize">
            Page not found
          </h1>
          <p className="mt-4 mb-6 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn&lsquo;t exist.
          </p>
          <div className="animate-bounce">
            <svg
              className="mx-auto h-16 w-16 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <p className="mt-4 text-gray-600">
            Let us get you back{" "}
            <Link to="/" className="text-blue-500 font-bold">
              Home
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
