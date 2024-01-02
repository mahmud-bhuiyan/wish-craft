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
