import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#B4E4FF]">
      <div className="flex justify-center items-center bg-base-200 rounded p-4">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
};

export default Loader;
