import { useState, useEffect } from 'react';
import { ChevronDown, Mail, MapPin, ArrowRight } from 'lucide-react';
import { updateCompanyProfile } from '../api/company';

export default function Contact({
    address, city, state, country, postalCode, phone, email, isEditing,
    onAddressChange, onCityChange, onStateChange, onCountryChange,
    onPostalCodeChange, onPhoneChange, onEmailChange, onPrevious,
    companyName, aboutUs, logoFile, bannerFile, organizationType,
    industryTypes, teamSize, yearOfEstablishment, companyWebsite,
    companyVision, socialLinks, onUpdateSuccess
}) {
    const [countryCode, setCountryCode] = useState('+91');
    const [countries, setCountries] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags");
                const data = await res.json();
                const formatted = data.filter((c) => c.idd?.root && c.idd?.suffixes && c.idd.suffixes.length > 0)
                    .map((c) => ({ name: c.name.common, code: `${c.idd.root}${c.idd.suffixes[0]}`, flag: c.flags.png }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCountries(formatted);
            } catch (err) { console.error("Failed to load countries", err); }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        if (countries.length > 0 && phone && phone.startsWith('+') && countryCode === '+91') {
            const matched = countries.find(c => phone.startsWith(c.code));
            if (matched) setCountryCode(matched.code);
        }
    }, [countries, phone, countryCode]);

    const handleInputChange = (e) => {
        if (!isEditing) return;
        const { name, value } = e.target;
        if (name === 'address') onAddressChange(value);
        else if (name === 'city') onCityChange(value);
        else if (name === 'state') onStateChange(value);
        else if (name === 'country') onCountryChange(value);
        else if (name === 'postalCode') onPostalCodeChange(value);
        else if (name === 'phone') onPhoneChange(value);
        else if (name === 'email') onEmailChange(value);
        else if (name === 'countryCode') setCountryCode(value);
    };

    const handleFinishEditing = async () => {
        setUpdating(true); setError('');
        try {
            const socialLinksObj = {};
            if (socialLinks?.length > 0) socialLinks.forEach(l => { if (l.platform && l.url) socialLinksObj[l.platform] = l.url; });
            const profileData = {
                company_name: companyName, description: aboutUs, logo_url: logoFile, banner_url: bannerFile,
                organization_type: organizationType, industry: industryTypes?.[0] || '', team_size: teamSize,
                founded_date: yearOfEstablishment ? new Date(yearOfEstablishment).toISOString() : null,
                website: companyWebsite, vision: companyVision, social_links: socialLinksObj,
                address, city, state, country, postal_code: postalCode,
                phone: phone ? `${countryCode}${phone}` : '', email
            };
            const response = await updateCompanyProfile(profileData);
            if (response.success) { if (onUpdateSuccess) onUpdateSuccess(); }
            else setError(response.error || 'Failed to update company profile');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to update company profile');
        } finally { setUpdating(false); }
    };

    const inputClass = "w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 disabled:text-slate-500 disabled:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200";

    return (
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800/60 p-10 shadow-xl shadow-black/20">
            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}
            <div className="space-y-6">
                {/* Address */}
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Address</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                        <input type="text" name="address" disabled={!isEditing} value={address} onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 disabled:text-slate-500 disabled:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div><label className="block text-sm font-semibold text-slate-300 mb-2">City</label>
                        <input type="text" name="city" disabled={!isEditing} value={city} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className="block text-sm font-semibold text-slate-300 mb-2">State</label>
                        <input type="text" name="state" disabled={!isEditing} value={state} onChange={handleInputChange} className={inputClass} /></div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div><label className="block text-sm font-semibold text-slate-300 mb-2">Country</label>
                        <input type="text" name="country" disabled={!isEditing} value={country} onChange={handleInputChange} className={inputClass} /></div>
                    <div><label className="block text-sm font-semibold text-slate-300 mb-2">Postal Code</label>
                        <input type="text" name="postalCode" disabled={!isEditing} value={postalCode} onChange={handleInputChange} className={inputClass} /></div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                    <div className="flex gap-3">
                        <div className="relative w-32">
                            <select name="countryCode" disabled={!isEditing} value={countryCode} onChange={handleInputChange}
                                className="w-full pl-3 pr-8 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl appearance-none text-slate-300 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200">
                                {countries.map(c => <option key={`${c.name}-${c.code}`} value={c.code}>{c.code}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                        <input type="tel" name="phone" disabled={!isEditing} value={phone} onChange={handleInputChange} placeholder="Phone number.." className={"flex-1 " + inputClass} />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                        <input type="email" name="email" disabled={!isEditing} value={email} onChange={handleInputChange} placeholder="Email address"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 disabled:text-slate-500 disabled:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200" />
                    </div>
                </div>

                {/* Buttons */}
                {isEditing && (
                    <div className="flex gap-3 pt-3">
                        <button onClick={onPrevious} className="px-6 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all duration-200">
                            Previous
                        </button>
                        <button onClick={handleFinishEditing} disabled={updating}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group transition-all duration-200">
                            {updating ? 'Updating...' : 'Finish Editing'}
                            {!updating && <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}