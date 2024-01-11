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
    handleApiError(error);
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
    handleApiError(error);
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

// =============================================
//            add comments to Requests
// =============================================
export const addFeatureComment = async (featureId, data) => {
  try {
    const response = await axiosSecureInstance.patch(
      `/features/${featureId}/comments`,
      data
    );

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//        delete feature requests comments
// =============================================
export const deleteFeatureComment = async (featureId, commentId) => {
  try {
    const response = await axiosSecureInstance.delete(
      `/features/${featureId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
