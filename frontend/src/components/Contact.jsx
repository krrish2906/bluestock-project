import { useState, useEffect } from 'react';
import { ChevronDown, Mail, MapPin, ArrowRight } from 'lucide-react';
import { updateCompanyProfile } from '../api/company';

export default function Contact({
    address,
    city,
    state,
    country,
    postalCode,
    phone,
    email,
    isEditing,
    onAddressChange,
    onCityChange,
    onStateChange,
    onCountryChange,
    onPostalCodeChange,
    onPhoneChange,
    onEmailChange,
    onPrevious,
    companyName,
    aboutUs,
    logoFile,
    bannerFile,
    organizationType,
    industryTypes,
    teamSize,
    yearOfEstablishment,
    companyWebsite,
    companyVision,
    socialLinks,
    onUpdateSuccess
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
                    .map((c) => ({
                        name: c.name.common,
                        code: `${c.idd.root}${c.idd.suffixes[0]}`,
                        flag: c.flags.png,
                    })).sort((a, b) => a.name.localeCompare(b.name));

                setCountries(formatted);
            } catch (err) {
                console.error("Failed to load countries", err);
            }
        };
        fetchCountries();
    }, []);

    // Extract country code from phone when countries are loaded
    useEffect(() => {
        if (countries.length > 0 && phone && phone.startsWith('+') && countryCode === '+91') {
            const matchedCountry = countries.find(c => phone.startsWith(c.code));
            if (matchedCountry) {
                setCountryCode(matchedCountry.code);
            }
        }
    }, [countries, phone, countryCode]);


    const handleInputChange = (e) => {
        if (!isEditing) return;
        const { name, value } = e.target;
        if (name === 'mapLocation' || name === 'address') {
            onAddressChange(value);
        } else if (name === 'city') {
            onCityChange(value);
        } else if (name === 'state') {
            onStateChange(value);
        } else if (name === 'country') {
            onCountryChange(value);
        } else if (name === 'postalCode') {
            onPostalCodeChange(value);
        } else if (name === 'phone') {
            onPhoneChange(value);
        } else if (name === 'email') {
            onEmailChange(value);
        } else if (name === 'countryCode') {
            setCountryCode(value);
        }
    };

    const handleFinishEditing = async () => {
        setUpdating(true);
        setError('');

        try {
            // Convert social links array back to object format
            const socialLinksObj = {};
            if (socialLinks && socialLinks.length > 0) {
                socialLinks.forEach(link => {
                    if (link.platform && link.url) {
                        socialLinksObj[link.platform] = link.url;
                    }
                });
            }

            // Prepare the profile data
            const profileData = {
                company_name: companyName,
                description: aboutUs,
                logo_url: logoFile,
                banner_url: bannerFile,
                organization_type: organizationType,
                industry: industryTypes && industryTypes.length > 0 ? industryTypes[0] : '',
                team_size: teamSize,
                founded_date: yearOfEstablishment ? new Date(yearOfEstablishment).toISOString() : null,
                website: companyWebsite,
                vision: companyVision,
                social_links: socialLinksObj,
                address: address,
                city: city,
                state: state,
                country: country,
                postal_code: postalCode,
                phone: phone ? `${countryCode}${phone}` : '',
                email: email
            };

            const response = await updateCompanyProfile(profileData);
            
            if (response.success) {
                if (onUpdateSuccess) {
                    onUpdateSuccess();
                }
            } else {
                setError(response.error || 'Failed to update company profile');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to update company profile');
            console.error('Failed to update company profile:', err);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}
            <div className="space-y-6">
                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="address"
                            disabled={!isEditing}
                            value={address}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                    </div>
                </div>

                {/* City, State, Country, Postal Code */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            disabled={!isEditing}
                            value={city}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                        </label>
                        <input
                            type="text"
                            name="state"
                            disabled={!isEditing}
                            value={state}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            disabled={!isEditing}
                            value={country}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            name="postalCode"
                            disabled={!isEditing}
                            value={postalCode}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                    </label>
                    <div className="flex gap-3">
                        {/* Country Code Selector */}
                        <div className="relative w-32">
                            <select
                                name="countryCode"
                                disabled={!isEditing}
                                value={countryCode}
                                onChange={handleInputChange}
                                className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            >
                                {countries.map(country => (
                                    <option key={`${country.name}-${country.code}`} value={country.code}>
                                        {country.code}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Phone Number Input */}
                        <div className="flex-1">
                            <input
                                type="tel"
                                name="phone"
                                disabled={!isEditing}
                                value={phone}
                                onChange={handleInputChange}
                                placeholder="Phone number.."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                        <input
                            type="email"
                            name="email"
                            disabled={!isEditing}
                            value={email}
                            onChange={handleInputChange}
                            placeholder="Email address"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                    <div className="flex gap-4 pt-4">
                        <button 
                            onClick={onPrevious}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleFinishEditing}
                            disabled={updating}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {updating ? 'Updating...' : 'Finish Editing'}
                            {!updating && <ArrowRight size={20} />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}