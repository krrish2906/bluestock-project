import { ChevronDown, Link, ArrowRight } from 'lucide-react';

export default function FoundingInfo({
    organizationType,
    industryTypes,
    teamSize,
    yearOfEstablishment,
    companyWebsite,
    companyVision,
    isEditing,
    onOrganizationTypeChange,
    onIndustryTypesChange,
    onTeamSizeChange,
    onYearOfEstablishmentChange,
    onCompanyWebsiteChange,
    onCompanyVisionChange,
    onPrevious,
    onNext
}) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'organizationType') {
            onOrganizationTypeChange(value);
        } else if (name === 'industryType') {
            onIndustryTypesChange([value]);
        } else if (name === 'teamSize') {
            onTeamSizeChange(value);
        } else if (name === 'yearOfEstablishment') {
            onYearOfEstablishmentChange(value);
        } else if (name === 'companyWebsite') {
            onCompanyWebsiteChange(value);
        } else if (name === 'companyVision') {
            onCompanyVisionChange(value);
        }
    };


    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
            {/* Form Content */}
            <div className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Organization Type
                        </label>
                        <div className="relative">
                            <select
                                name="organizationType"
                                disabled={!isEditing}
                                value={organizationType}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            >
                                <option value="" disabled>Select</option>
                                <option value="corporation">Corporation</option>
                                <option value="llc">LLC</option>
                                <option value="partnership">Partnership</option>
                                <option value="nonprofit">Nonprofit</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Industry Types
                        </label>
                        <div className="relative">
                            <select
                                name="industryType"
                                disabled={!isEditing}
                                value={industryTypes[0] || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            >
                                <option value="" disabled>Select</option>
                                <option value="Technology">Technology</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Finance">Finance</option>
                                <option value="Education">Education</option>
                                <option value="Fintech">Fintech</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Team Size
                        </label>
                        <div className="relative">
                            <select
                                name="teamSize"
                                disabled={!isEditing}
                                value={teamSize}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            >
                                <option value="" disabled>Select</option>
                                <option value="1-10">1-10</option>
                                <option value="11-50">11-50</option>
                                <option value="51-200">51-200</option>
                                <option value="201-500">201-500</option>
                                <option value="501+">501+</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Year of Establishment
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                name="yearOfEstablishment"
                                disabled={!isEditing}
                                value={yearOfEstablishment}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Website
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                name="companyWebsite"
                                disabled={!isEditing}
                                value={companyWebsite}
                                onChange={handleInputChange}
                                placeholder="Website url..."
                                className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
                        </div>
                    </div>
                </div>

                {/* Company Vision */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Vision
                    </label>
                    <div className="border border-gray-300 rounded-md">
                        <textarea
                            name="companyVision"
                            disabled={!isEditing}
                            value={companyVision}
                            onChange={handleInputChange}
                            placeholder="Tell us about your company vision..."
                            rows="6"
                            className="w-full px-3 py-2 rounded-t-md focus:outline-none resize-none disabled:bg-gray-100"
                        />
                    </div>
                </div>

                {/* Buttons */}
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
                            Save & Next
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}