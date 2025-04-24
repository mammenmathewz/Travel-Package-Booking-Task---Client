import axiosInstance from "../Axios/axios";

export const getAllPackages = async () => {
  try {
    const response = await axiosInstance.get("/admin/getpackages");
    return response.data.packages;
    
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
}

