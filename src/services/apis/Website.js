import { axiosSecureInstance } from "../../utils/axios";
import handleApiError from "../../utils/handleApiError";

// =============================================
//                get Website Info
// =============================================
export const getWebsiteInfo = async () => {
  try {
    const response = await axiosSecureInstance.get("/website");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
