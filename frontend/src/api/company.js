import api from "./axios";

export const fetchCompanyProfile = async () => {
    const res = await api.get("/company/profile");
    return res.data;
};
