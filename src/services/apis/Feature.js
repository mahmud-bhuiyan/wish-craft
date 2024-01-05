import { axiosSecureInstance } from "../../utils/axios";

// =============================================
//                  Create Request
// =============================================
export const createRequest = async (data) => {
  try {
    const response = await axiosSecureInstance.post("/features/", data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.msg;
  }
};
