import { ChevronDown, X, Plus, Facebook, Twitter, Instagram, Youtube, Linkedin, Music, ArrowRight } from 'lucide-react';

export default function Social({ 
    socialLinks, 
    isEditing, 
    onSocialLinksChange, 
    onPrevious, 
    onNext 
}) {
    // Initialize with default links if empty
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

    const handlePlatformChange = (id, newPlatform) => {
        if (!isEditing) return;
        const updated = displayLinks.map(link => 
            link.id === id ? { ...link, platform: newPlatform } : link
        );
        onSocialLinksChange(updated);
    };

    const handleUrlChange = (id, newUrl) => {
        if (!isEditing) return;
        const updated = displayLinks.map(link => 
            link.id === id ? { ...link, url: newUrl } : link
        );
        onSocialLinksChange(updated);
    };

    const handleRemoveLink = (id) => {
        if (!isEditing) return;
        const updated = displayLinks.filter(link => link.id !== id);
        onSocialLinksChange(updated);
    };

    const handleAddNewLink = () => {
        if (!isEditing) return;
        const newId = Math.max(...displayLinks.map(l => l.id), 0) + 1;
        const updated = [...displayLinks, {
            id: newId,
            platform: 'facebook',
            url: ''
        }];
        onSocialLinksChange(updated);
    };

    const getPlatformIcon = (platform) => {
        const option = platformOptions.find(p => p.value === platform);
        return option ? option.Icon : Facebook;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
            <div className="space-y-4">
                {displayLinks.length === 0 && !isEditing ? (
                    <div className="text-center text-gray-500 py-8">
                        No social links added yet.
                    </div>
                ) : (
                    displayLinks.map((link, index) => (
                    <div key={link.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Social Link {index + 1}
                        </label>
                        <div className="flex gap-3 items-center">
                            {/* Platform Selector */}
                            <div className="relative w-48">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    {(() => {
                                        const Icon = getPlatformIcon(link.platform);
                                        return <Icon className="w-4 h-4 text-blue-600" />;
                                    })()}
                                </div>
                                <select
                                    disabled={!isEditing}
                                    value={link.platform}
                                    onChange={(e) => handlePlatformChange(link.id, e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md appearance-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                >
                                    {platformOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            {/* URL Input */}
                            <div className="flex-1 relative">
                                <input
                                    type="url"
                                    disabled={!isEditing}
                                    value={link.url}
                                    onChange={(e) => handleUrlChange(link.id, e.target.value)}
                                    placeholder="Profile link/url..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                />
                            </div>

                            {/* Remove Button */}
                            {isEditing && (
                                <button
                                    onClick={() => handleRemoveLink(link.id)}
                                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Remove social link"
                                >
                                    <X className="w-4 h-4 text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>
                    ))
                )}

                {/* Add New Social Link Button */}
                {isEditing && (
                    <button
                        onClick={handleAddNewLink}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center gap-2 font-medium transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Social Link
                    </button>
                )}

                {/* Action Buttons */}
                {isEditing && (
                    <div className="flex gap-4 pt-6">
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