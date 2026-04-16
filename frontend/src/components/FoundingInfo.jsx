import { ChevronDown, Link, ArrowRight } from 'lucide-react';

export default function FoundingInfo({
    organizationType, industryTypes, teamSize, yearOfEstablishment,
    companyWebsite, companyVision, isEditing,
    onOrganizationTypeChange, onIndustryTypesChange, onTeamSizeChange,
    onYearOfEstablishmentChange, onCompanyWebsiteChange, onCompanyVisionChange,
    onPrevious, onNext
}) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'organizationType') onOrganizationTypeChange(value);
        else if (name === 'industryType') onIndustryTypesChange([value]);
        else if (name === 'teamSize') onTeamSizeChange(value);
        else if (name === 'yearOfEstablishment') onYearOfEstablishmentChange(value);
        else if (name === 'companyWebsite') onCompanyWebsiteChange(value);
        else if (name === 'companyVision') onCompanyVisionChange(value);
    };

    const inputClass = "w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 disabled:text-slate-500 disabled:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200";
    const selectClass = "w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl appearance-none text-slate-300 disabled:text-slate-500 disabled:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200 hover:border-slate-600";

    return (
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800/60 p-10 shadow-xl shadow-black/20">
            <div className="space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-3 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Organization Type</label>
                        <div className="relative">
                            <select name="organizationType" disabled={!isEditing} value={organizationType} onChange={handleInputChange} className={selectClass}>
                                <option value="" disabled>Select</option>
                                <option value="corporation">Corporation</option>
                                <option value="llc">LLC</option>
                                <option value="partnership">Partnership</option>
                                <option value="nonprofit">Nonprofit</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Industry Types</label>
                        <div className="relative">
                            <select name="industryType" disabled={!isEditing} value={industryTypes[0] || ''} onChange={handleInputChange} className={selectClass}>
                                <option value="" disabled>Select</option>
                                <option value="Technology">Technology</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Finance">Finance</option>
                                <option value="Education">Education</option>
                                <option value="Fintech">Fintech</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Team Size</label>
                        <div className="relative">
                            <select name="teamSize" disabled={!isEditing} value={teamSize} onChange={handleInputChange} className={selectClass}>
                                <option value="" disabled>Select</option>
                                <option value="1-10">1-10</option>
                                <option value="11-50">11-50</option>
                                <option value="51-200">51-200</option>
                                <option value="201-500">201-500</option>
                                <option value="501+">501+</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Year of Establishment</label>
                        <input type="date" name="yearOfEstablishment" disabled={!isEditing} value={yearOfEstablishment} onChange={handleInputChange} className={inputClass} />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Company Website</label>
                        <div className="relative">
                            <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input type="url" name="companyWebsite" disabled={!isEditing} value={companyWebsite} onChange={handleInputChange} placeholder="Website url..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 disabled:text-slate-500 disabled:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>

                {/* Vision */}
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Company Vision</label>
                    <textarea
                        name="companyVision" disabled={!isEditing} value={companyVision} onChange={handleInputChange}
                        placeholder="Tell us about your company vision..."
                        rows="5"
                        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 disabled:text-slate-500 disabled:bg-slate-800/30 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200"
                    />
                </div>

                {/* Buttons */}
                {isEditing && (
                    <div className="flex gap-3 pt-3">
                        <button onClick={onPrevious} className="px-6 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all duration-200">
                            Previous
                        </button>
                        <button onClick={onNext} className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2 group transition-all duration-200">
                            Save & Next
                            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}