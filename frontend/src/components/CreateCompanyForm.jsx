import { useState } from "react";
import { Building2, Globe, MapPin, Calendar, FileText, AlertCircle, Loader2 } from "lucide-react";
import api from "../api/axios";
import { toast } from 'react-toastify';

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

        // Validate required fields
        const requiredFields = ['company_name', 'address', 'city', 'state', 'country', 'industry'];
        const missingFields = requiredFields.filter(field => !form[field].trim());
        
        if (missingFields.length > 0) {
            const errorMsg = `Please fill in all required fields: ${missingFields.join(', ').replace(/_/g, ' ')}`;
            setError(errorMsg);
            toast.error('Please fill in all required fields');
            setLoading(false);
            return;
        }

        try {
            const res = await api.post("/company/register", form);

            if (res.data.success) {
                toast.success('Company created successfully!');
                onSuccess();
            } else {
                const errorMsg = res.data.message || 'Failed to create company';
                setError(errorMsg);
                toast.error(errorMsg);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to create company";
            setError(errorMsg);
            toast.error(errorMsg);
            console.error('Company creation error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto my-8">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    Create Company
                </h2>
                <p className="text-gray-500 mt-1">Fill in the details to register your company</p>
            </div>

            <div className="space-y-6">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                        <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}
                {/* Company Information Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Company Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Company Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="company_name"
                                    value={form.company_name}
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                    required
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Industry */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Industry <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="industry"
                                value={form.industry}
                                onChange={handleChange}
                                placeholder="e.g., Technology, Finance"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Founded Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Founded Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <input
                                    type="date"
                                    name="founded_date"
                                    value={form.founded_date}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Website */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website
                            </label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="url"
                                    name="website"
                                    value={form.website}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Address Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Street address"
                                    required
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="Enter city"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* State */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                State / Province <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                placeholder="Enter state"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                placeholder="Enter country"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Postal Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                name="postal_code"
                                value={form.postal_code}
                                onChange={handleChange}
                                placeholder="Enter postal code"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Additional Details</h3>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Description
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Tell us about your company..."
                                rows="4"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            'Create Company'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCompanyForm;