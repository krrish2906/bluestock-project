import { useState, useEffect } from 'react';
import { User, Globe, Mail, Building2 } from 'lucide-react';
import CompanyInfo from './CompanyInfo';
import { fetchCompanyProfile } from '../api/company';

export default function CompanySetup() {
    const [activeStep, setActiveStep] = useState('company');
    const [companyName, setCompanyName] = useState('');
    const [aboutUs, setAboutUs] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCompanyProfile = async () => {
            try {
                const response = await fetchCompanyProfile();
                if (response.success && response.data) {
                    const { company_name, description, logo_url, banner_url } = response.data;
                    setCompanyName(company_name || '');
                    setAboutUs(description || '');
                    setLogoFile(logo_url || null);
                    setBannerFile(banner_url || null);
                }
            } catch (err) {
                console.error('Failed to fetch company profile:', err);
                setError('Failed to load company profile');
            } finally {
                setLoading(false);
            }
        };

        loadCompanyProfile();
    }, []);

    const handleLogoChange = (file) => setLogoFile(file);
    const handleBannerChange = (file) => setBannerFile(file);
    const handleCompanyNameChange = (name) => setCompanyName(name);
    const handleAboutUsChange = (about) => setAboutUs(about);
    
    const handleNext = () => {
        console.log('Saving company info and moving to next step');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Building2 className="text-blue-600" size={28} />
                            <span className="text-xl font-semibold text-gray-800">
                                Company Profile
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            {/* Setup Progress ONLY in edit mode */}
                            {isEditing && (
                                <>
                                    <span className="text-sm text-gray-600">
                                        Setup Progress
                                    </span>
                                    <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full"
                                            style={{ width: '25%' }}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Edit button ONLY in view mode */}
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="max-w-7xl mx-auto px-8 py-6">
                <div className="flex items-center justify-center space-x-20 mb-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <StepButton
                        icon={<User size={20} />}
                        label="Company Info"
                        active={activeStep === 'company'}
                        onClick={() => setActiveStep('company')}
                    />
                    <StepButton
                        icon={<User size={20} />}
                        label="Founding Info"
                        active={activeStep === 'founding'}
                        onClick={() => setActiveStep('founding')}
                    />
                    <StepButton
                        icon={<Globe size={20} />}
                        label="Social Media Profile"
                        active={activeStep === 'social'}
                        onClick={() => setActiveStep('social')}
                    />
                    <StepButton
                        icon={<Mail size={20} />}
                        label="Contact"
                        active={activeStep === 'contact'}
                        onClick={() => setActiveStep('contact')}
                    />
                </div>

                {/* Loading and Error States */}
                {loading ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center">
                        <div className="animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-lg shadow-sm border border-red-200 p-10 text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                ) : (
                    <CompanyInfo 
                        logoFile={logoFile}
                        bannerFile={bannerFile}
                        companyName={companyName}
                        aboutUs={aboutUs}
                        isEditing={isEditing}
                        onLogoChange={handleLogoChange}
                        onBannerChange={handleBannerChange}
                        onCompanyNameChange={handleCompanyNameChange}
                        onAboutUsChange={handleAboutUsChange}
                        onNext={handleNext}
                    />
                )}
            </div>

            {/* Footer */}
            <div className="text-center py-8 text-sm text-gray-500">
                © 2025 Jobpilot - Job Board. All rights Reserved
            </div>
        </div>
    );
}

function StepButton({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-2 p-2 px-3 border-b-2 transition-colors cursor-pointer ${
                active
                    ? 'border-blue-600 text-blue-600 bg-blue-50 rounded-t-lg'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
        >
            {icon}
            <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        </button>
    );
}
