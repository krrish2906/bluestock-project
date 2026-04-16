import { useState } from "react";
import { Building2, Globe, MapPin, Calendar, FileText, AlertCircle, Loader2 } from "lucide-react";
import api from "../api/axios";
import { toast } from 'react-toastify';

const CreateCompanyForm = ({ onSuccess }) => {
    const [form, setForm] = useState({
        company_name: "", address: "", city: "", state: "", country: "",
        postal_code: "", website: "", industry: "", founded_date: "", description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError("");
        const required = ['company_name', 'address', 'city', 'state', 'country', 'industry'];
        const missing = required.filter(f => !form[f].trim());
        if (missing.length > 0) {
            setError(`Please fill in all required fields: ${missing.join(', ').replace(/_/g, ' ')}`);
            toast.error('Please fill in all required fields'); setLoading(false); return;
        }
        try {
            const res = await api.post("/company/register", form);
            if (res.data.success) { toast.success('Company created!'); onSuccess(); }
            else { setError(res.data.message || 'Failed'); toast.error(res.data.message || 'Failed'); }
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to create company";
            setError(msg); toast.error(msg);
        } finally { setLoading(false); }
    };

    const inputClass = "w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200";

    return (
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800/60 p-8 max-w-4xl mx-auto my-8 shadow-xl shadow-black/20">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 tracking-tight">
                    <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <Building2 className="w-6 h-6 text-blue-400" />
                    </div>
                    Create Company
                </h2>
                <p className="text-slate-500 mt-2 text-sm">Fill in the details to register your company</p>
            </div>

            <div className="space-y-8">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                        <p className="text-red-400 font-medium text-sm">{error}</p>
                    </div>
                )}

                {/* Company Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 pb-2 border-b border-slate-800 uppercase tracking-wider">Company Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Company Name <span className="text-red-400">*</span></label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                <input type="text" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Enter company name"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Industry <span className="text-red-400">*</span></label>
                            <input type="text" name="industry" value={form.industry} onChange={handleChange} placeholder="e.g., Technology" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Founded Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                <input type="date" name="founded_date" value={form.founded_date} onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Website</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="url" name="website" value={form.website} onChange={handleChange} placeholder="https://example.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 pb-2 border-b border-slate-800 uppercase tracking-wider">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Address <span className="text-red-400">*</span></label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Street address"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all" />
                            </div>
                        </div>
                        <div><label className="block text-sm font-semibold text-slate-300 mb-2">City <span className="text-red-400">*</span></label>
                            <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Enter city" className={inputClass} /></div>
                        <div><label className="block text-sm font-semibold text-slate-300 mb-2">State <span className="text-red-400">*</span></label>
                            <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="Enter state" className={inputClass} /></div>
                        <div><label className="block text-sm font-semibold text-slate-300 mb-2">Country <span className="text-red-400">*</span></label>
                            <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Enter country" className={inputClass} /></div>
                        <div><label className="block text-sm font-semibold text-slate-300 mb-2">Postal Code</label>
                            <input type="text" name="postal_code" value={form.postal_code} onChange={handleChange} placeholder="Enter postal code" className={inputClass} /></div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 pb-2 border-b border-slate-800 uppercase tracking-wider">Additional Details</h3>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Company Description</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Tell us about your company..." rows="4"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all" />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading} onClick={handleSubmit}
                    className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2 transition-all duration-200 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}>
                    {loading ? (<><Loader2 className="h-4 w-4 animate-spin" />Creating...</>) : 'Create Company'}
                </button>
            </div>
        </div>
    );
};

export default CreateCompanyForm;