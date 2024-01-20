import { axiosNonSecureInstance, axiosSecureInstance } from "../../utils/axios";
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
export const getAllRequest = async (sortBy, sortOrder, page, limit, status) => {
  try {
    const response = await axiosNonSecureInstance.get("/features/", {
      params: { sortBy, sortOrder, page, limit, status },
    });
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
    const response = await axiosNonSecureInstance.get(`/features/${featureId}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//      (soft) delete Feature Request By Id
// =============================================
export const deleteFeatureRequest = async (featureId) => {
  try {
    const response = await axiosSecureInstance.patch(`/features/${featureId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//         delete Feature Request By Id
// =============================================
export const deleteFeatureRequestById = async (featureId) => {
  try {
    const response = await axiosSecureInstance.delete(`/features/${featureId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//            update Feature Status
// =============================================
export const updateFeatureStatus = async (featureId, status) => {
  try {
    const response = await axiosSecureInstance.patch(
      `/features/${featureId}/status`,
      {
        status,
      }
    );

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//          like Feature Request By Id
// =============================================
export const likeFeatureRequestById = async (featureId) => {
  try {
    const response = await axiosSecureInstance.patch(
      `/features/${featureId}/like`
    );

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//          unlike Feature Request By Id
// =============================================
export const unlikeFeatureRequestById = async (featureId) => {
  try {
    const response = await axiosSecureInstance.patch(
      `/features/${featureId}/unlike`
    );

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

// =============================================
//            search Feature Requests
// =============================================
export const searchRequest = async (searchTerm, page, limit) => {
  try {
    const response = await axiosNonSecureInstance.get(
      `/features/search/${searchTerm}`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
