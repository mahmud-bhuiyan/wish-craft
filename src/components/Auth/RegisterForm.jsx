import { AiTwotoneLock } from "react-icons/ai";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FiUser } from "react-icons/fi";

const RegisterForm = () => {
  return (
    <form>
      <div className="relative flex items-center mt-8">
        <span className="absolute p-3">
          <FiUser className="text-xl md:text-2xl" />
        </span>

        <input
          type="text"
          className="block w-full py-3 text-gray-700 bg-slate-100 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Your Name"
        />
      </div>

      <div className="relative flex items-center mt-4">
        <span className="absolute p-3">
          <MdOutlineMarkEmailRead className="text-xl md:text-2xl" />
        </span>

        <input
          type="email"
          className="block w-full py-3 text-gray-700 bg-slate-100 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Email address"
        />
      </div>

      <div className="relative flex items-center mt-4">
        <span className="absolute p-3">
          <AiTwotoneLock className="text-xl md:text-2xl " />
        </span>

        <input
          type="password"
          className="block w-full px-10 py-3 text-gray-700 bg-slate-100 border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Password"
        />
      </div>

      <div className="relative flex items-center mt-4">
        <span className="absolute p-3">
          <AiTwotoneLock className="text-xl md:text-2xl " />
        </span>

        <input
          type="password"
          className="block w-full px-10 py-3 text-gray-700 bg-slate-100 border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Confirm Password"
        />
      </div>

      <div className="mt-6">
        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
