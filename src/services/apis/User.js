import { axiosNonSecureInstance, axiosSecureInstance } from "../../utils/axios";
import handleApiError from "../../utils/handleApiError";

// =============================================
//                    register
// =============================================
export const registerUser = async (userData) => {
  try {
    const response = await axiosNonSecureInstance.post(
      "/users/register",
      userData
    );

    // Store the token in localStorage
    const { token } = response.data;

    localStorage.setItem("userToken", token);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//                  google sign-in
// =============================================
export const signInWithGoogle = async (userData) => {
  try {
    const response = await axiosNonSecureInstance.post(
      "/users/google-signin",
      userData
    );

    // Store the token in localStorage
    const { token } = response.data;

    localStorage.setItem("userToken", token);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//                      login
// =============================================
export const userLogin = async (credentials) => {
  try {
    const response = await axiosNonSecureInstance.post(
      "/users/login",
      credentials
    );

    // Store the token in localStorage
    const { token } = response.data;

    localStorage.setItem("userToken", token);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// =============================================
//                     logout
// =============================================
export const userLogout = async () => {
  try {
    // Simulate an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Clear the token from localStorage
    localStorage.removeItem("userToken");

    // Return a success status
    return { success: true };
  } catch (error) {
    throw error.response?.data?.msg || "Logout failed";
  }
};

// =============================================
//                  user details
// =============================================
export const getUserProfile = async () => {
  try {
    const response = await axiosSecureInstance.get("/users/me");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
