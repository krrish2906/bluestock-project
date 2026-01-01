import { useState, useEffect } from 'react';
import { User, Globe, Mail, Building2 } from 'lucide-react';
import { fetchCompanyProfile } from '../api/company';
import CompanyInfo from './CompanyInfo';
import FoundingInfo from './FoundingInfo';
import Social from './Social';
import Contact from './Contact';
import Success from './Success';

export default function CompanySetup({ onNavigateToProfile }) {
    const [activeStep, setActiveStep] = useState('company');
    // Company Info State
    const [companyName, setCompanyName] = useState('');
    const [aboutUs, setAboutUs] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    
    // Founding Info State
    const [organizationType, setOrganizationType] = useState('');
    const [industryTypes, setIndustryTypes] = useState([]);
    const [teamSize, setTeamSize] = useState('');
    const [yearOfEstablishment, setYearOfEstablishment] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [companyVision, setCompanyVision] = useState('');
    
    // Social Links State
    const [socialLinks, setSocialLinks] = useState([]);
    
    // Contact Info State
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    
    // UI State
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const loadCompanyProfile = async () => {
            try {
                const response = await fetchCompanyProfile();
                if (response.success && response.data) {
                    const data = response.data;
                    // Company Info
                    setCompanyName(data.company_name || '');
                    setAboutUs(data.description || '');
                    setLogoFile(data.logo_url || null);
                    setBannerFile(data.banner_url || null);
                    
                    // Founding Info
                    setOrganizationType(data.organization_type || '');
                    setIndustryTypes(data.industry ? [data.industry] : []);
                    setTeamSize(data.team_size || '');
                    setYearOfEstablishment(data.founded_date ? data.founded_date.split('T')[0] : '');
                    setCompanyWebsite(data.website || '');
                    setCompanyVision(data.vision || '');
                    
                    // Social Links
                    if (data.social_links && typeof data.social_links === 'object') {
                        const linksArray = Object.entries(data.social_links).map(([platform, url], index) => ({
                            id: index + 1,
                            platform: platform,
                            url: url || ''
                        }));
                        setSocialLinks(linksArray);
                    }
                    
                    // Contact Info
                    setAddress(data.address || '');
                    setCity(data.city || '');
                    setState(data.state || '');
                    setCountry(data.country || '');
                    setPostalCode(data.postal_code || '');
                    setPhone(data.phone || '');
                    setEmail(data.email || '');
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

    // const handleLogoChange = (file) => setLogoFile(file);
    // const handleBannerChange = (file) => setBannerFile(file);
    // const handleCompanyNameChange = (name) => setCompanyName(name);
    // const handleAboutUsChange = (about) => setAboutUs(about);
    
    const handleNext = () => {
        if (activeStep === 'company') {
            setActiveStep('founding');
        } else if (activeStep === 'founding') {
            setActiveStep('social');
        } else if (activeStep === 'social') {
            setActiveStep('contact');
        }
        // Here you would typically save the data to your backend
        console.log('Saving data and moving to next step', {
            companyName,
            aboutUs,
            logoFile,
            bannerFile,
            organizationType,
            industryTypes,
            teamSize,
            yearOfEstablishment,
            companyWebsite,
            companyVision
        });
    };
    
    const handlePrevious = () => {
        if (activeStep === 'founding') {
            setActiveStep('company');
        } else if (activeStep === 'social') {
            setActiveStep('founding');
        } else if (activeStep === 'contact') {
            setActiveStep('social');
        }
    };

    // Calculate progress based on active step (25% per tab)
    const getProgressPercentage = () => {
        const stepProgress = {
            'company': 25,
            'founding': 50,
            'social': 75,
            'contact': 100
        };
        return stepProgress[activeStep] || 0;
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
                                            className="h-full bg-blue-600 rounded-full transition-all duration-300"
                                            style={{ width: `${getProgressPercentage()}%` }}
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
                <div className="flex items-center justify-center space-x-4 md:space-x-8 lg:space-x-12 xl:space-x-20 mb-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100 overflow-x-auto">
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
                        label="Social Media"
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
                ) : showSuccess ? (
                    <Success 
                        onViewDashboard={() => {
                            setShowSuccess(false);
                            setActiveStep('company');
                            setIsEditing(false);
                        }}
                        onViewProfile={() => {
                            if (onNavigateToProfile) {
                                onNavigateToProfile();
                            }
                        }}
                    />
                ) : error ? (
                    <div className="bg-white rounded-lg shadow-sm border border-red-200 p-10 text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                ) : activeStep === 'company' ? (
                    <CompanyInfo 
                        logoFile={logoFile}
                        bannerFile={bannerFile}
                        companyName={companyName}
                        aboutUs={aboutUs}
                        isEditing={isEditing}
                        onLogoChange={setLogoFile}
                        onBannerChange={setBannerFile}
                        onCompanyNameChange={setCompanyName}
                        onAboutUsChange={setAboutUs}
                        onNext={handleNext}
                    />
                ) : activeStep === 'founding' ? (
                    <FoundingInfo
                        organizationType={organizationType}
                        industryTypes={industryTypes}
                        teamSize={teamSize}
                        yearOfEstablishment={yearOfEstablishment}
                        companyWebsite={companyWebsite}
                        companyVision={companyVision}
                        isEditing={isEditing}
                        onOrganizationTypeChange={setOrganizationType}
                        onIndustryTypesChange={setIndustryTypes}
                        onTeamSizeChange={setTeamSize}
                        onYearOfEstablishmentChange={setYearOfEstablishment}
                        onCompanyWebsiteChange={setCompanyWebsite}
                        onCompanyVisionChange={setCompanyVision}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />
                ) : activeStep === 'social' ? (
                    <Social 
                        socialLinks={socialLinks}
                        isEditing={isEditing}
                        onSocialLinksChange={setSocialLinks}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />
                ) : activeStep === 'contact' ? (
                    <Contact 
                        address={address}
                        city={city}
                        state={state}
                        country={country}
                        postalCode={postalCode}
                        phone={phone}
                        email={email}
                        isEditing={isEditing}
                        onAddressChange={setAddress}
                        onCityChange={setCity}
                        onStateChange={setState}
                        onCountryChange={setCountry}
                        onPostalCodeChange={setPostalCode}
                        onPhoneChange={setPhone}
                        onEmailChange={setEmail}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        companyName={companyName}
                        aboutUs={aboutUs}
                        logoFile={logoFile}
                        bannerFile={bannerFile}
                        organizationType={organizationType}
                        industryTypes={industryTypes}
                        teamSize={teamSize}
                        yearOfEstablishment={yearOfEstablishment}
                        companyWebsite={companyWebsite}
                        companyVision={companyVision}
                        socialLinks={socialLinks}
                        onUpdateSuccess={() => setShowSuccess(true)}
                    />
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {activeStep === 'social' ? 'Social Media Profile' : 'Contact Information'}
                        </h2>
                        <p className="text-gray-600">
                            {activeStep === 'social' 
                                ? 'Social media profile section will be implemented here.' 
                                : 'Contact information section will be implemented here.'}
                        </p>
                    </div>
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
            className={`flex items-center space-x-2 p-2 px-4 border-b-2 transition-colors cursor-pointer ${
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
