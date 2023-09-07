import instance from "./axiosinstance";

export const Addservicedata = async (payload) => {
    try {
        const response = await instance.post('/api/users/service', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallServices = async () => {
    try {
        const response = await instance.get('/api/users/service');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const deleteservice = async (id) => {
    try {
        const response = await instance.delete(`/api/users/service/${id}`);
        return response.data
    } catch (err) {
        return err.message;
    }
}
export const editservice = async (payload) => {
    try {
        console.log(payload._id);
        const response = await instance.post(`/api/users/service/${payload._id}`, payload);
        return response.data
    } catch (err) {
        return err.message;
    }
}