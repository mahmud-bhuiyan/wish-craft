import { axiosNonSecureInstance, axiosSecureInstance } from "../../utils/axios";

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
    // console.log(response.data);

    localStorage.setItem("userToken", token);
    return response.data;
  } catch (error) {
    // console.error("MongoDB registration error:", error.response?.data?.msg);
    throw error.response?.data?.msg;
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
    // console.log(response.data);

    localStorage.setItem("userToken", token);
    return response.data;
  } catch (error) {
    // console.error("Google Sign-In error:", error.response?.data?.msg);
    throw error.response?.data?.msg;
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
    // console.log(response.data);

    localStorage.setItem("userToken", token);
    return response.data;
  } catch (error) {
    // console.error("Error:", error.response?.data?.msg);
    throw error.response?.data?.msg;
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
    // console.error("Error:", error.response?.data?.msg || "Logout failed");
    throw error.response?.data?.msg || "Logout failed";
  }
};

// =============================================
//                   update user
// =============================================
export const updateUser = async (updatedUserData) => {
  try {
    const response = await axiosSecureInstance.patch(
      "/users/update",
      updatedUserData
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data?.msg);
    throw error.response?.data?.msg;
  }
};

// =============================================
//                 update password
// =============================================
export const passwordUpdate = async (passwordData) => {
  try {
    const response = await axiosSecureInstance.patch(
      "/users/updatePassword",
      passwordData
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data?.msg);
    throw error.response?.data?.msg;
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
    console.error("Error:", error.response?.data?.msg);
    throw error.response?.data?.msg;
  }
};
