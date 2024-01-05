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

// =============================================
//                  get all Request
// =============================================
export const getAllRequest = async () => {
  try {
    const response = await axiosSecureInstance.get("/features/");
    return response.data;
  } catch (error) {
    throw error.response?.data?.msg;
  }
};
