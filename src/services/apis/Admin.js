import { axiosSecureInstance } from "../../utils/axios";
import handleApiError from "../../utils/handleApiError";

// =============================================
//                 get all Request
// =============================================
export const getAllUsers = async () => {
  try {
    const response = await axiosSecureInstance.get("/admins/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
