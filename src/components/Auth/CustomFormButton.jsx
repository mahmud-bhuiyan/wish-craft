import { ThreeDots } from "react-loader-spinner";

const CustomFormButton = ({ buttonText, loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
    >
      {loading ? (
        <span className="flex gap-2 justify-center align-middle">
          Submitting
          <ThreeDots
            visible={true}
            height="25"
            width="25"
            color="#fff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </span>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default CustomFormButton;
