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

export const editPackage = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/admin/updatepackage/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error editing package:", error);
    throw error;
  }
}

export const deletePackage = async (id: string|undefined|null) => {
  try {
    const response = await axiosInstance.delete(`/admin/deletepackage/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
}

export const addPackage = async (data: any) => {
  try {
    const response = await axiosInstance.post("/admin/addpackage", data);
    return response.data;
  } catch (error) {
    console.error("Error adding package:", error);
    throw error;
  }
}
