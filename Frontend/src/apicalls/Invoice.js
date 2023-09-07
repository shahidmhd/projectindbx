import instance from "./axiosinstance";

export const AddINVOICEdata = async (payload) => {
    try {
        const response = await instance.post('/api/users/invoice', payload);
        return response.data
    } catch (err) {
        return err.message;
    }
}


export const getallinvoices = async () => {
    try {
        const response = await instance.get('/api/users/invoice');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getnotdeletedinvoices = async () => {
    try {
        const response = await instance.get('/api/users/currentinvoice');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getselectedinvioce = async (invoiceid) => {
    try {
        const response = await instance.get(`/api/users/invoice/${invoiceid}`);;
        return response.data
    } catch (err) {
        return err.message;
    }
}



export const deleteInvoice = async (invoiceid) => {
    try {
        const response = await instance.delete(`/api/users/invoice/${invoiceid}`);;
        return response.data
    } catch (err) {
        return err.message;
    }
}


export const EditINVOICEdata = async (payload) => {
    try {
        const Invoiceid = payload._id
        const payloadWithoutId = { ...payload };
        delete payloadWithoutId._id;
        const response = await instance.patch(`/api/users/invoice/${Invoiceid}`, payloadWithoutId);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const searchdatas = async (startdate,enddate) => {
    try {
        const data={startdate:startdate,enddate:enddate}
        const response = await instance.post("/api/users/searchinvoice",data);
        return response.data
    } catch (err) {
        return err.message;
    }
}
export const fetchcompanyinvoices = async (companyId) => {
    try {
        const data={companyId:companyId}
      
        const response = await instance.post("/api/users/searchcompanyinvoice",data);
        return response.data
    } catch (err) {
        return err.message;
    }
}
export const fetchserviceinvoices = async (servicename) => {
    try {
        const data={servicename:servicename}
        const response = await instance.post("/api/users/searchserviceinvoice",data);
        return response.data
    } catch (err) {
        return err.message;
    }
}
