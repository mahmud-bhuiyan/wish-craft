import { axiosNonSecureInstance } from "../../utils/axios";

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

    // console.log(response.data);
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
    localStorage.setItem("userToken", token);

    // console.log(response.data);
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
    localStorage.setItem("userToken", token);

    // console.log(response.data);
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
