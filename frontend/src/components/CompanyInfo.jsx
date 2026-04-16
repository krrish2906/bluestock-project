import { useState } from 'react';
import { Upload, ArrowRight, Loader2, Pencil } from 'lucide-react';
import { uploadCompanyLogo, uploadCompanyBanner } from '../api/company';

export default function CompanyInfo({ 
    logoFile, bannerFile, companyName, aboutUs, isEditing, 
    onLogoChange, onBannerChange, onCompanyNameChange, onAboutUsChange, onNext 
}) {
    const [uploading, setUploading] = useState({ logo: false, banner: false });
    const [uploadError, setUploadError] = useState({ logo: null, banner: null });

    const handleFileSelect = async (e, type) => {
        if (!isEditing) return;
        const file = e.target.files[0];
        if (!file) return;
        try {
            setUploading(prev => ({ ...prev, [type]: true }));
            setUploadError(prev => ({ ...prev, [type]: null }));
            const response = type === 'logo'
                ? await uploadCompanyLogo(file) : await uploadCompanyBanner(file);
            if (!response.success) throw new Error(response.error || 'Upload failed');
            const imageUrl = response.data[`${type}_url`];
            type === 'logo' ? onLogoChange(imageUrl) : onBannerChange(imageUrl);
        } catch (err) {
            setUploadError(prev => ({ ...prev, [type]: err.message || 'Upload failed' }));
        } finally {
            setUploading(prev => ({ ...prev, [type]: false }));
        }
    };

    return (
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800/60 p-10 shadow-xl shadow-black/20">
            {/* Logo & Banner */}
            <div className="mb-10">
                <h2 className="text-lg font-bold text-white mb-1 tracking-tight">Logo & Banner Image</h2>
                <p className="text-xs text-slate-500 mb-6">Upload your company's brand assets</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Logo */}
                    <div className="relative border border-dashed border-slate-700 rounded-xl p-10 text-center bg-slate-800/40 hover:border-blue-500/40 hover:bg-slate-800/60 transition-all duration-300 group" style={{ minHeight: '220px' }}>
                        {uploading.logo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10 rounded-xl">
                                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                            </div>
                        )}
                        {logoFile ? (
                            <img src={logoFile} alt="Logo" className="max-h-36 mx-auto rounded-lg" />
                        ) : isEditing ? (
                            <label className="h-full flex flex-col items-center justify-center cursor-pointer">
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'logo')} />
                                <div className="w-14 h-14 bg-slate-700/60 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors duration-300">
                                    <Upload className="w-7 h-7 text-slate-500 group-hover:text-blue-400 transition-colors duration-300" />
                                </div>
                                <p className="text-sm font-medium text-slate-400">Upload Logo</p>
                                <p className="text-xs text-slate-600 mt-1">PNG, JPG up to 5MB</p>
                                {uploadError.logo && <p className="text-xs text-red-400 mt-2">{uploadError.logo}</p>}
                            </label>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-600 font-medium">No logo uploaded</div>
                        )}
                        {logoFile && isEditing && (
                            <label className="absolute bottom-3 right-3 bg-slate-700 p-2 rounded-lg hover:bg-slate-600 cursor-pointer transition-all duration-200 border border-slate-600">
                                <Pencil className="w-3.5 h-3.5 text-slate-300" />
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'logo')} />
                            </label>
                        )}
                    </div>

                    {/* Banner */}
                    <div className="relative border border-dashed border-slate-700 rounded-xl p-10 text-center bg-slate-800/40 hover:border-blue-500/40 hover:bg-slate-800/60 transition-all duration-300 group" style={{ minHeight: '220px' }}>
                        {uploading.banner && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10 rounded-xl">
                                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                            </div>
                        )}
                        {bannerFile ? (
                            <img src={bannerFile} alt="Banner" className="max-h-36 mx-auto rounded-lg" />
                        ) : isEditing ? (
                            <label className="h-full flex flex-col items-center justify-center cursor-pointer">
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'banner')} />
                                <div className="w-14 h-14 bg-slate-700/60 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors duration-300">
                                    <Upload className="w-7 h-7 text-slate-500 group-hover:text-blue-400 transition-colors duration-300" />
                                </div>
                                <p className="text-sm font-medium text-slate-400">Upload Banner</p>
                                <p className="text-xs text-slate-600 mt-1">PNG, JPG up to 5MB</p>
                                {uploadError.banner && <p className="text-xs text-red-400 mt-2">{uploadError.banner}</p>}
                            </label>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-600 font-medium">No banner uploaded</div>
                        )}
                        {bannerFile && isEditing && (
                            <label className="absolute bottom-3 right-3 bg-slate-700 p-2 rounded-lg hover:bg-slate-600 cursor-pointer transition-all duration-200 border border-slate-600">
                                <Pencil className="w-3.5 h-3.5 text-slate-300" />
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'banner')} />
                            </label>
                        )}
                    </div>
                </div>
            </div>

            {/* Company Name */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Company name</label>
                <input
                    disabled={!isEditing}
                    type="text" value={companyName}
                    onChange={(e) => onCompanyNameChange(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 disabled:text-slate-500 disabled:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200"
                />
            </div>

            {/* About Us */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-300 mb-2">About Us</label>
                <textarea
                    disabled={!isEditing} value={aboutUs}
                    onChange={(e) => onAboutUsChange(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 disabled:text-slate-500 disabled:bg-slate-800/30 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200"
                />
            </div>

            {/* Save & Next */}
            {isEditing && (
                <button
                    onClick={onNext}
                    className="flex items-center space-x-2 px-7 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 group"
                >
                    <span>Save & Next</span>
                    <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
            )}
        </div>
    );
}