import axiosInstance from "../Axios/axios"

export const postLogin = async (email: string, password: string) => {
    try {
        const response  = await axiosInstance.post("/auth/login", {
            email,
            password,
        });
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        return error;
    }
}

export const createUserWithEmailAndPassword = async ( name: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.post("/auth/signup", {
            email,
            password,
            name
        });
        return response.data;
    } catch (error) {
        return error;
    }
}