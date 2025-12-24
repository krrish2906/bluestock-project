import { useState } from "react";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("company");
    const [companyName, setCompanyName] = useState("");
    const [aboutUs, setAboutUs] = useState("");
    const [logoImage, setLogoImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setLogoImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleBannerUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setBannerImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = () => {
        console.log("Saving changes:", { companyName, aboutUs, logoImage, bannerImage });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-lg">📋</span>
                        </div>
                        <span className="font-bold text-xl">Jobpilot</span>
                    </div>
                </div>

                <nav className="flex-1 p-4">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-3 px-3">
                        Employers Dashboard
                    </div>
                    <ul className="space-y-1">
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                                <span>📊</span>
                                <span className="text-sm">Overview</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                                <span>👤</span>
                                <span className="text-sm">Employers Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                                <span>➕</span>
                                <span className="text-sm">Post a Job</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                                <span>💼</span>
                                <span className="text-sm">My Jobs</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                                <span>📑</span>
                                <span className="text-sm">Saved Candidate</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                                <span>💳</span>
                                <span className="text-sm">Plans & Billing</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                                <span>🏢</span>
                                <span className="text-sm">All Companies</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg">
                                <span>⚙️</span>
                                <span className="text-sm font-medium">Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 w-full">
                        <span>🚪</span>
                        <span className="text-sm">Log-out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                            <span>📢</span>
                            <span className="text-sm font-medium">Post A Jobs</span>
                        </button>
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full"></div>
                    </div>
                </header>

                {/* Settings Content */}
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-6">Settings</h1>

                    {/* Tabs */}
                    <div className="flex gap-8 border-b border-gray-200 mb-8">
                        <button
                            onClick={() => setActiveTab("company")}
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === "company"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            👤 Company Info
                        </button>
                        <button
                            onClick={() => setActiveTab("founding")}
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === "founding"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            ⚙️ Founding Info
                        </button>
                        <button
                            onClick={() => setActiveTab("social")}
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === "social"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            🌐 Social Media Profile
                        </button>
                        <button
                            onClick={() => setActiveTab("account")}
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === "account"
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            👤 Account Setting
                        </button>
                    </div>

                    {/* Logo & Banner Image Section */}
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-6">Logo & Banner Image</h2>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Upload Logo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Logo
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                        id="logo-upload"
                                    />
                                    <label
                                        htmlFor="logo-upload"
                                        className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 overflow-hidden"
                                    >
                                        {logoImage ? (
                                            <img src={logoImage} alt="Logo" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-gray-900">
                                                <div className="grid grid-cols-3 gap-2 p-4">
                                                    <div className="w-12 h-12 bg-blue-400 rounded-lg"></div>
                                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-xl">📷</div>
                                                    <div className="w-12 h-12 bg-blue-500 rounded-lg"></div>
                                                    <div className="w-12 h-12 bg-orange-500 rounded-lg"></div>
                                                    <div className="w-12 h-12 bg-blue-400 rounded-lg"></div>
                                                    <div className="w-12 h-12 bg-red-500 rounded-lg"></div>
                                                    <div className="w-12 h-12 bg-green-500 rounded-lg"></div>
                                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg"></div>
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                    <span className="text-gray-500">3.5 MB</span>
                                    <button className="text-red-600 hover:underline">Remove</button>
                                    <button className="text-blue-600 hover:underline">Replace</button>
                                </div>
                            </div>

                            {/* Banner Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Banner Image
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBannerUpload}
                                        className="hidden"
                                        id="banner-upload"
                                    />
                                    <label
                                        htmlFor="banner-upload"
                                        className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 overflow-hidden"
                                    >
                                        {bannerImage ? (
                                            <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full bg-gray-100">
                                                <span className="text-gray-400">Click to upload banner</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                    <span className="text-gray-500">4.3 MB</span>
                                    <button className="text-red-600 hover:underline">Remove</button>
                                    <button className="text-blue-600 hover:underline">Replace</button>
                                </div>
                            </div>
                        </div>

                        {/* Company Name */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company name
                            </label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* About Us */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                About us
                            </label>
                            <textarea
                                value={aboutUs}
                                onChange={(e) => setAboutUs(e.target.value)}
                                placeholder="Write down about your company here. Let the candidate know who we are..."
                                rows="6"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            ></textarea>
                            
                            {/* Text Editor Toolbar */}
                            <div className="flex items-center gap-2 mt-2 text-gray-500">
                                <button className="p-1.5 hover:bg-gray-100 rounded">
                                    <strong>B</strong>
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded italic">
                                    I
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded underline">
                                    U
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded line-through">
                                    S
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded">
                                    🔗
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded">
                                    ≡
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded">
                                    ≣
                                </button>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSaveChanges}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Save Change
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center py-6 text-sm text-gray-500">
                    © 2021 Jobpilot - Job Board. All Rights Reserved
                </footer>
            </main>
        </div>
    );
};

export default SettingsPage;