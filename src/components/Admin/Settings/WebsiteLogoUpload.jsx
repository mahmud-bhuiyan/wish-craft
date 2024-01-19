import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { updateWebsiteImage } from "../../../services/apis/Website";
import { WebsiteContext } from "../../../context/WebsiteContextProvider";
import CustomImageUploadForm from "../../CustomComponents/CustomImageUploadForm";

const WebsiteLogoUpload = () => {
  const { setRefetch } = useContext(WebsiteContext);

  // State to manage loading state during form submission
  const [loading, setLoading] = useState(false);

  // handle image upload
  const handleUploadSuccess = async (imageURL) => {
    const imageData = {
      logoUrl: imageURL,
    };

    try {
      // Perform the updateWebsiteImage part
      const result = await updateWebsiteImage(imageData);
      if (result.success) {
        setRefetch((prevRefetch) => !prevRefetch);
        toast.success(result.message);
      }
    } catch (error) {
      console.error("Error updating website image:", error);
      toast.error("Error updating website image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 rounded-md w-full">
      <h3 className="font-bold text-xl font-mono underline text-center my-4">
        Upload Website Logo
      </h3>
      <CustomImageUploadForm
        onUploadSuccess={handleUploadSuccess}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default WebsiteLogoUpload;
