import { useState } from 'react';
import { Upload, ArrowRight, Loader2, Pencil } from 'lucide-react';
import { uploadCompanyLogo, uploadCompanyBanner } from '../api/company';

export default function CompanyInfo({ 
    logoFile, 
    bannerFile, 
    companyName, 
    aboutUs, 
    isEditing, 
    onLogoChange, 
    onBannerChange, 
    onCompanyNameChange, 
    onAboutUsChange,
    onNext 
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

            const response =
                type === 'logo'
                    ? await uploadCompanyLogo(file)
                    : await uploadCompanyBanner(file);

            if (!response.success) {
                throw new Error(response.error || 'Upload failed');
            }

            const imageUrl = response.data[`${type}_url`];
            type === 'logo'
                ? onLogoChange(imageUrl)
                : onBannerChange(imageUrl);
        } catch (err) {
            setUploadError(prev => ({
                ...prev,
                [type]: err.message || 'Upload failed'
            }));
        } finally {
            setUploading(prev => ({ ...prev, [type]: false }));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
            {/* Logo & Banner */}
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Logo & Banner Image
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo */}
                    <div
                        className="relative border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:border-blue-500 transition-all delay-150"
                        style={{ minHeight: '240px' }}
                    >
                        {uploading.logo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                            </div>
                        )}

                        {logoFile ? (
                            <img
                                src={logoFile}
                                alt="Logo"
                                className="max-h-40 mx-auto"
                            />
                        ) : isEditing ? (
                            <label className="h-full flex flex-col items-center justify-center cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e, 'logo')}
                                />
                                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                                <p className="text-sm text-gray-700">
                                    Click to upload logo
                                </p>
                                {uploadError.logo && (
                                    <p className="text-xs text-red-500 mt-2">
                                        {uploadError.logo}
                                    </p>
                                )}
                            </label>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                No logo uploaded
                            </div>
                        )}

                        {/* ✅ Pencil anchored to dashed box */}
                        {logoFile && isEditing && (
                            <label className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 cursor-pointer">
                                <Pencil className="w-4 h-4 text-gray-600" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e, 'logo')}
                                />
                            </label>
                        )}
                    </div>

                    {/* Banner */}
                    <div
                        className="relative border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:border-blue-500 transition-all delay-150"
                        style={{ minHeight: '240px' }}
                    >
                        {uploading.banner && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                            </div>
                        )}

                        {bannerFile ? (
                            <img
                                src={bannerFile}
                                alt="Banner"
                                className="max-h-40 mx-auto"
                            />
                        ) : isEditing ? (
                            <label className="h-full flex flex-col items-center justify-center cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e, 'banner')}
                                />
                                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                                <p className="text-sm text-gray-700">
                                    Click to upload banner
                                </p>
                                {uploadError.banner && (
                                    <p className="text-xs text-red-500 mt-2">
                                        {uploadError.banner}
                                    </p>
                                )}
                            </label>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                No banner uploaded
                            </div>
                        )}

                        {/* ✅ Pencil anchored to dashed box */}
                        {bannerFile && isEditing && (
                            <label className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 cursor-pointer">
                                <Pencil className="w-4 h-4 text-gray-600" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileSelect(e, 'banner')}
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>

            {/* Company Name */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Company name
                </label>
                <input
                    disabled={!isEditing}
                    type="text"
                    value={companyName}
                    onChange={(e) => onCompanyNameChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
                />
            </div>

            {/* About Us */}
            <div className="mb-10">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    About Us
                </label>
                <textarea
                    disabled={!isEditing}
                    value={aboutUs}
                    onChange={(e) => onAboutUsChange(e.target.value)}
                    rows={7}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none disabled:bg-gray-100"
                />
            </div>

            {/* Save & Next */}
            {isEditing && (
                <button
                    onClick={onNext}
                    className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
                >
                    <span>Save & Next</span>
                    <ArrowRight size={20} />
                </button>
            )}
        </div>
    );
}