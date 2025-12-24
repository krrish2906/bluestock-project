import { useState } from "react";
import api from "../api/axios";

const CreateCompanyForm = ({ onSuccess }) => {
    const [form, setForm] = useState({
        company_name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        website: "",
        industry: "",
        founded_date: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("/company/register", form);

            if (res.data.success) {
                onSuccess(); // refresh dashboard
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create company");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Company</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input name="company_name" placeholder="Company Name" onChange={handleChange} required />
                <input name="industry" placeholder="Industry" onChange={handleChange} />
                <input name="website" placeholder="Website" onChange={handleChange} />
                <input name="address" placeholder="Address" onChange={handleChange} />
                <input name="city" placeholder="City" onChange={handleChange} />
                <input name="state" placeholder="State" onChange={handleChange} />
                <input name="country" placeholder="Country" onChange={handleChange} />
                <input name="postal_code" placeholder="Postal Code" onChange={handleChange} />
                <input type="date" name="founded_date" onChange={handleChange} />
                <textarea name="description" placeholder="Description" onChange={handleChange} />

                <br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Company"}
                </button>
            </form>
        </div>
    );
};

export default CreateCompanyForm;
