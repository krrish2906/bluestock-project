import { useState } from 'react';
import { ChevronDown, Mail, MapPin, ArrowRight } from 'lucide-react';

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
    onNext
}) {
    const [countryCode, setCountryCode] = useState('+880');

    const countryCodes = [
        { code: '+880', country: 'BD', flag: '🇧🇩' },
        { code: '+1', country: 'US', flag: '🇺🇸' },
        { code: '+44', country: 'UK', flag: '🇬🇧' },
        { code: '+91', country: 'IN', flag: '🇮🇳' },
        { code: '+86', country: 'CN', flag: '🇨🇳' },
        { code: '+81', country: 'JP', flag: '🇯🇵' }
    ];

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

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
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
                                {countryCodes.map(country => (
                                    <option key={country.code} value={country.code}>
                                        {country.flag} {country.code}
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
                            onClick={onNext}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 flex items-center gap-2"
                        >
                            Finish Editing
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}