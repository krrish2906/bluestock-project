import { ChevronDown, X, Plus, Facebook, Twitter, Instagram, Youtube, Linkedin, Music, ArrowRight } from 'lucide-react';

export default function Social({ socialLinks, isEditing, onSocialLinksChange, onPrevious, onNext }) {
    const displayLinks = socialLinks && socialLinks.length > 0 
        ? socialLinks 
        : (isEditing ? [
            { id: 1, platform: 'facebook', url: '' },
            { id: 2, platform: 'twitter', url: '' },
            { id: 3, platform: 'instagram', url: '' },
            { id: 4, platform: 'youtube', url: '' }
        ] : []);

    const platformOptions = [
        { value: 'facebook', label: 'Facebook', Icon: Facebook },
        { value: 'twitter', label: 'Twitter', Icon: Twitter },
        { value: 'instagram', label: 'Instagram', Icon: Instagram },
        { value: 'youtube', label: 'Youtube', Icon: Youtube },
        { value: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
        { value: 'tiktok', label: 'TikTok', Icon: Music }
    ];

    const handlePlatformChange = (id, val) => {
        if (!isEditing) return;
        onSocialLinksChange(displayLinks.map(l => l.id === id ? { ...l, platform: val } : l));
    };
    const handleUrlChange = (id, val) => {
        if (!isEditing) return;
        onSocialLinksChange(displayLinks.map(l => l.id === id ? { ...l, url: val } : l));
    };
    const handleRemoveLink = (id) => {
        if (!isEditing) return;
        onSocialLinksChange(displayLinks.filter(l => l.id !== id));
    };
    const handleAddNewLink = () => {
        if (!isEditing) return;
        const newId = Math.max(...displayLinks.map(l => l.id), 0) + 1;
        onSocialLinksChange([...displayLinks, { id: newId, platform: 'facebook', url: '' }]);
    };
    const getPlatformIcon = (platform) => {
        const opt = platformOptions.find(p => p.value === platform);
        return opt ? opt.Icon : Facebook;
    };

    return (
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800/60 p-10 shadow-xl shadow-black/20">
            <div className="space-y-4">
                {displayLinks.length === 0 && !isEditing ? (
                    <div className="text-center text-slate-600 py-8 font-medium">No social links added yet.</div>
                ) : (
                    displayLinks.map((link, index) => (
                    <div key={link.id} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/40 hover:border-slate-600/60 transition-all duration-200">
                        <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Social Link {index + 1}</label>
                        <div className="flex gap-3 items-center">
                            <div className="relative w-48">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    {(() => { const Icon = getPlatformIcon(link.platform); return <Icon className="w-4 h-4 text-blue-400" />; })()}
                                </div>
                                <select disabled={!isEditing} value={link.platform} onChange={(e) => handlePlatformChange(link.id, e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl appearance-none text-slate-300 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200">
                                    {platformOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            </div>
                            <div className="flex-1">
                                <input type="url" disabled={!isEditing} value={link.url} onChange={(e) => handleUrlChange(link.id, e.target.value)}
                                    placeholder="Profile link/url..."
                                    className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200"
                                />
                            </div>
                            {isEditing && (
                                <button onClick={() => handleRemoveLink(link.id)}
                                    className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-slate-500 transition-all duration-200">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                    ))
                )}

                {isEditing && (
                    <button onClick={handleAddNewLink}
                        className="w-full py-3.5 border border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-400 flex items-center justify-center gap-2 font-semibold transition-all duration-200">
                        <Plus className="w-5 h-5" />
                        Add New Social Link
                    </button>
                )}

                {isEditing && (
                    <div className="flex gap-3 pt-4">
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