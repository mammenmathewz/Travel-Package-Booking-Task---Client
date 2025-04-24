import axiosInstance from "../Axios/axios";

export const bookPackage = async (data: any) => {
  try {
    const response = await axiosInstance.post("/booking/create", data);
    return response.data;
  } catch (error) {
    console.error("Error booking package:", error);
    throw error;
  }
}

export const getUserData = async (userId: string|null|undefined) => {
  try {
    const response = await axiosInstance.get(`/user/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export const updateUserProfile = async (userId: string|null|undefined, data: any) => {
  try {
    const response = await axiosInstance.put(`/user/update/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}
