import { axiosNonSecureInstance, axiosSecureInstance } from "../../utils/axios";
import handleApiError from "../../utils/handleApiError";

// =============================================
//                get Website Info
// =============================================
export const getWebsiteInfo = async () => {
  try {
    const response = await axiosNonSecureInstance.get("/website");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//               update Website Info
// =============================================
export const updateWebsiteInfo = async (updatedInfo) => {
  console.log(updatedInfo);
  try {
    const response = await axiosSecureInstance.patch("/website", updatedInfo);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
