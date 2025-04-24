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