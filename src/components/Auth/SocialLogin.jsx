import { google } from "../../assets/images/images";

const SocialLogin = () => {
  return (
    <div>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
        or Sign in with
      </p>

      <a
        href="#"
        className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <img src={google} alt="google icon" className="w-auto h-5" />
        <span className="mx-2">Sign in with Google</span>
      </a>
    </div>
  );
};

export default SocialLogin;
