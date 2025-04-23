import axiosInstance from "../Axios/axios";

export const getAllPackages = async () => {
  try {
    const response = await axiosInstance.get("/admin/getpackages");
    return response.data.packages;
    console.log("Packages fetched successfully:", response.data);
    
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
}