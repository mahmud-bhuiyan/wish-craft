import { axiosSecureInstance } from "../../utils/axios";
import handleApiError from "../../utils/handleApiError";

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
//                 get all Request
// =============================================
export const getAllRequest = async () => {
  try {
    const response = await axiosSecureInstance.get("/features/");
    return response.data;
  } catch (error) {
    throw error.response?.data?.msg;
  }
};

// =============================================
//               get single Request
// =============================================
export const getSingleFeatureRequest = async (featureId) => {
  try {
    const response = await axiosSecureInstance.get(`/features/${featureId}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//       Update single Request Likes by ID
// =============================================
export const updateFeatureRequestLikesById = async (featureId) => {
  try {
    const response = await axiosSecureInstance.patch(`/features/${featureId}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
