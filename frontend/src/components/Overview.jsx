import { useState, useEffect } from 'react';
import { User, Globe, Mail, Building2, Check, Sparkles } from 'lucide-react';
import { fetchCompanyProfile } from '../api/company';
import CompanyInfo from './CompanyInfo';
import FoundingInfo from './FoundingInfo';
import Social from './Social';
import Contact from './Contact';
import Success from './Success';
import CreateCompanyForm from './CreateCompanyForm';

const steps = [
    { key: 'company', label: 'Company Info', icon: Building2, number: 1 },
    { key: 'founding', label: 'Founding Info', icon: User, number: 2 },
    { key: 'social', label: 'Social Media', icon: Globe, number: 3 },
    { key: 'contact', label: 'Contact', icon: Mail, number: 4 },
];

export default function CompanySetup({ onNavigateToProfile }) {
    const [activeStep, setActiveStep] = useState('company');
    const [noCompany, setNoCompany] = useState(false);
    
    const [companyName, setCompanyName] = useState('');
    const [aboutUs, setAboutUs] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    
    const [organizationType, setOrganizationType] = useState('');
    const [industryTypes, setIndustryTypes] = useState([]);
    const [teamSize, setTeamSize] = useState('');
    const [yearOfEstablishment, setYearOfEstablishment] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [companyVision, setCompanyVision] = useState('');
    
    const [socialLinks, setSocialLinks] = useState([]);
    
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const loadCompanyProfile = async () => {
            try {
                const response = await fetchCompanyProfile();
                if (response.message === "Company profile not found") {
                    setNoCompany(true);
                    return;
                }
                if (response.success && response.data) {
                    const data = response.data;
                    setCompanyName(data.company_name || '');
                    setAboutUs(data.description || '');
                    setLogoFile(data.logo_url || null);
                    setBannerFile(data.banner_url || null);
                    setOrganizationType(data.organization_type || '');
                    setIndustryTypes(data.industry ? [data.industry] : []);
                    setTeamSize(data.team_size || '');
                    setYearOfEstablishment(data.founded_date ? data.founded_date.split('T')[0] : '');
                    setCompanyWebsite(data.website || '');
                    setCompanyVision(data.vision || '');
                    if (data.social_links && typeof data.social_links === 'object') {
                        const linksArray = Object.entries(data.social_links).map(([platform, url], index) => ({
                            id: index + 1, platform, url: url || ''
                        }));
                        setSocialLinks(linksArray);
                    }
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
    
    const handleNext = () => {
        if (activeStep === 'company') setActiveStep('founding');
        else if (activeStep === 'founding') setActiveStep('social');
        else if (activeStep === 'social') setActiveStep('contact');
    };
    
    const handlePrevious = () => {
        if (activeStep === 'founding') setActiveStep('company');
        else if (activeStep === 'social') setActiveStep('founding');
        else if (activeStep === 'contact') setActiveStep('social');
    };

    const getProgressPercentage = () => {
        const p = { 'company': 25, 'founding': 50, 'social': 75, 'contact': 100 };
        return p[activeStep] || 0;
    };

    const getStepIndex = () => steps.findIndex(s => s.key === activeStep);

    if (noCompany) return <CreateCompanyForm onSuccess={() => setNoCompany(false)} />;

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Hero Banner */}
            <div className="relative overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-violet-600/20"></div>
                {/* Mesh pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
                }}></div>
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}></div>

                <div className="max-w-7xl mx-auto px-8 py-10 relative">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
                                    <Sparkles size={12} className="text-blue-400" />
                                    <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">Company Profile</span>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                                {companyName ? `Welcome back, ${companyName}` : 'Setup Your Company'}
                            </h1>
                            <p className="text-slate-400 text-sm max-w-md">
                                {isEditing ? 'Complete each step to build your professional company profile' : 'View and manage your organization\'s profile and settings'}
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            {isEditing && (
                                <div className="flex items-center space-x-3 bg-slate-800/60 backdrop-blur-sm rounded-xl px-5 py-3 border border-slate-700/50">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Progress</span>
                                        <span className="text-lg font-bold text-white">{getProgressPercentage()}%</span>
                                    </div>
                                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${getProgressPercentage()}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-6">
                {/* Step Navigation */}
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-slate-800/60 shadow-xl shadow-black/20">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const isCurrent = step.key === activeStep;
                            const isPast = index < getStepIndex();
                            const StepIcon = step.icon;
                            
                            return (
                                <div key={step.key} className="flex items-center flex-1">
                                    <button
                                        onClick={() => setActiveStep(step.key)}
                                        className="flex items-center space-x-3 cursor-pointer group"
                                    >
                                        {/* Step circle */}
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                            isCurrent
                                                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/20'
                                                : isPast
                                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                                    : 'bg-slate-800/80 text-slate-500 border border-slate-700/50 group-hover:border-slate-600 group-hover:text-slate-400'
                                        }`}>
                                            {isPast ? <Check size={18} /> : step.number}
                                        </div>
                                        
                                        <div className="hidden md:block">
                                            <p className={`text-[10px] font-semibold uppercase tracking-wider ${
                                                isCurrent ? 'text-blue-400' : isPast ? 'text-emerald-400' : 'text-slate-600'
                                            }`}>
                                                Step {step.number}
                                            </p>
                                            <p className={`text-sm font-semibold ${
                                                isCurrent ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'
                                            }`}>
                                                {step.label}
                                            </p>
                                        </div>
                                    </button>

                                    {/* Connector line */}
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 mx-4">
                                            <div className={`h-[2px] rounded-full transition-all duration-500 ${
                                                isPast
                                                    ? 'bg-gradient-to-r from-emerald-500/50 to-emerald-500/20'
                                                    : 'bg-slate-800'
                                            }`}></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="bg-slate-900/80 rounded-2xl border border-slate-800/60 p-16">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="w-10 h-10 border-3 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                            <p className="text-sm text-slate-500 font-medium">Loading company profile...</p>
                        </div>
                    </div>
                ) : showSuccess ? (
                    <Success 
                        onViewDashboard={() => { setShowSuccess(false); setActiveStep('company'); setIsEditing(false); }}
                        onViewProfile={() => { if (onNavigateToProfile) onNavigateToProfile(); }}
                    />
                ) : error ? (
                    <div className="bg-slate-900/80 rounded-2xl border border-red-500/20 p-10 text-center">
                        <p className="text-red-400 font-medium">{error}</p>
                    </div>
                ) : activeStep === 'company' ? (
                    <CompanyInfo 
                        logoFile={logoFile} bannerFile={bannerFile}
                        companyName={companyName} aboutUs={aboutUs} isEditing={isEditing}
                        onLogoChange={setLogoFile} onBannerChange={setBannerFile}
                        onCompanyNameChange={setCompanyName} onAboutUsChange={setAboutUs}
                        onNext={handleNext}
                    />
                ) : activeStep === 'founding' ? (
                    <FoundingInfo
                        organizationType={organizationType} industryTypes={industryTypes}
                        teamSize={teamSize} yearOfEstablishment={yearOfEstablishment}
                        companyWebsite={companyWebsite} companyVision={companyVision}
                        isEditing={isEditing}
                        onOrganizationTypeChange={setOrganizationType}
                        onIndustryTypesChange={setIndustryTypes}
                        onTeamSizeChange={setTeamSize}
                        onYearOfEstablishmentChange={setYearOfEstablishment}
                        onCompanyWebsiteChange={setCompanyWebsite}
                        onCompanyVisionChange={setCompanyVision}
                        onPrevious={handlePrevious} onNext={handleNext}
                    />
                ) : activeStep === 'social' ? (
                    <Social 
                        socialLinks={socialLinks} isEditing={isEditing}
                        onSocialLinksChange={setSocialLinks}
                        onPrevious={handlePrevious} onNext={handleNext}
                    />
                ) : activeStep === 'contact' ? (
                    <Contact 
                        address={address} city={city} state={state} country={country}
                        postalCode={postalCode} phone={phone} email={email}
                        isEditing={isEditing}
                        onAddressChange={setAddress} onCityChange={setCity}
                        onStateChange={setState} onCountryChange={setCountry}
                        onPostalCodeChange={setPostalCode} onPhoneChange={setPhone}
                        onEmailChange={setEmail}
                        onPrevious={handlePrevious} onNext={handleNext}
                        companyName={companyName} aboutUs={aboutUs}
                        logoFile={logoFile} bannerFile={bannerFile}
                        organizationType={organizationType} industryTypes={industryTypes}
                        teamSize={teamSize} yearOfEstablishment={yearOfEstablishment}
                        companyWebsite={companyWebsite} companyVision={companyVision}
                        socialLinks={socialLinks}
                        onUpdateSuccess={() => setShowSuccess(true)}
                    />
                ) : null}
            </div>

            {/* Footer */}
            <div className="text-center py-6 text-xs text-slate-600 font-medium border-t border-slate-800/50 mx-8 mt-4">
                © 2025 BlueStocks — Company Management Platform. All rights reserved.
            </div>
        </div>
    );
}
