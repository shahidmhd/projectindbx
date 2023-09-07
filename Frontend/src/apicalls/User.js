
import instance from "./axiosinstance";


export const LoginUser = async (payload) => {
    try {
        const response = await instance.post('/api/users/login', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const changepassword = async (payload) => {
    try {
        const response = await instance.post('/api/users/changepassword', payload);
        return response.data
    } catch (err) {
        return err.message;
    }
}
