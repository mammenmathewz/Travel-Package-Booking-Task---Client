import axiosInstance from "../Axios/axios";

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get("/admin/getallusers");
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getUserBookings = async (userId: string| null | undefined) => {
    try {
        const response = await axiosInstance.get(`/admin/getuserbookings/${userId}`);
        console.log(response.data, "user bookings data from api");
        
        return response.data;
    } catch (error) {
        return error;
    }
};

