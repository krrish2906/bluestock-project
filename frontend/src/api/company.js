import api from "./axios";

export const fetchCompanyProfile = async () => {
    const res = await api.get("/company/profile", {
        validateStatus: function (status) {
            return status < 500;
        }
    });
    return res.data;
};

export const uploadCompanyLogo = async (file) => {
    const formData = new FormData();
    formData.append('logo', file);

    const res = await api.post('/company/upload-logo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const uploadCompanyBanner = async (file) => {
    const formData = new FormData();
    formData.append('banner', file);

    const res = await api.post('/company/upload-banner', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const updateCompanyProfile = async (profileData) => {
    const res = await api.put('/company/profile', profileData);
    return res.data;
};