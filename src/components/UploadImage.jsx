import { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { updateWebsiteImage } from "../services/apis/Website";
import { toast } from "react-toastify";
import { WebsiteContext } from "../context/WebsiteContextProvider";

const UploadImage = () => {
  const { setRefetch } = useContext(WebsiteContext);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: import.meta.env.VITE_IMAGE_UPLOAD_TOKEN,
          },
        }
      );

      const imageData = {
        logoUrl: response.data.data.url,
      };

      const result = await updateWebsiteImage(imageData);

      if (result.success) {
        setRefetch((prevRefetch) => !prevRefetch);
        toast.success(result.message);
        reset();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="file-input file-input-bordered w-full"
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-slate-300 hover:bg-slate-400 mt-2 rounded"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UploadImage;
