import { useEffect, useState } from "react";
import { fetchCompanyProfile } from "../api/company";
import CreateCompanyForm from "../components/CreateCompanyForm";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCompany = async () => {
            try {
                const res = await fetchCompanyProfile();

                if (res.success) {
                    setCompany(res.data);
                } else {
                    setCompany(null);
                }
            } catch (err) {
                if (err.response?.status === 404) {
                    setCompany(null);
                } else {
                    setError("Failed to load company profile");
                }
            } finally {
                setLoading(false);
            }
        };

        loadCompany();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    if (!company) {
        return (
            <CreateCompanyForm onSuccess={() => window.location.reload()} />
        );
    }


    return (
        <div>
            <h2>Company Dashboard</h2>
            <p><strong>Name:</strong> {company.company_name}</p>
            <p><strong>Industry:</strong> {company.industry}</p>
            <p><strong>City:</strong> {company.city}</p>
        </div>
    );
};

export default Dashboard;
