import { axiosNonSecureInstance } from "../../utils/axios";

// =============================================
//                    register
// =============================================
export const registerUser = async (user) => {
  try {
    const response = await axiosNonSecureInstance.post("/users/register", user);

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
