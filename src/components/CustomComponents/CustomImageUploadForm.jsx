import axios from "axios";
import { useForm } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";

const CustomImageUploadForm = ({ onUploadSuccess, loading, setLoading }) => {
  const { register, handleSubmit, reset } = useForm();

  // Function to handle image upload to ImgBB
  const handleImgBBUpload = async (data) => {
    try {
      setLoading(true);

      // Create FormData and append the selected image to it
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // Make a POST request to ImgBB API for image upload
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: import.meta.env.VITE_IMAGE_UPLOAD_TOKEN,
          },
        }
      );

      const imageURL = response.data.data.url;
      onUploadSuccess(imageURL);
      reset();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleImgBBUpload)}>
      <div
        id="FileUpload"
        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
      >
        <input
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
          type="file"
          accept=".jpg, .jpeg, .png"
          {...register("image", {
            required: "Image is required",
            validate: (file) =>
              // Validate the file format
              /\.(jpg|jpeg|png)$/i.test(file[0]?.name) ||
              "Supported formats: jpg, jpeg, png",
          })}
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-stroke bg-white dark:border-stroke-dark dark:bg-box-dark">
            <MdOutlineFileUpload className="text-xl" />
          </span>
          <p className="font-medium text-sm">
            <span className="text-primary">Click to upload</span>
          </p>
          <p className="mt-1.5 font-medium text-sm">JPG, JPEG or PNG</p>
          <p className="font-medium text-sm">(max, 300 X 300px)</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 text-white mt-3"
      >
        {loading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default CustomImageUploadForm;
