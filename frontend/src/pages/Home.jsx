import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import UserDetails from '../components/UserDetails';
import Overview from '../components/Overview';
import NotImplemented from '../components/NotImplemented';
import { Bell, Search, User } from 'lucide-react';

export default function Home() {
    const [activeSidebarItem, setActiveSidebarItem] = useState('overview');

    const getComponentName = (item) => {
        const nameMap = {
            'post-job': 'Post a Job',
            'my-jobs': 'My Jobs',
            'saved-candidate': 'Saved Candidate',
            'plans': 'Plans & Billing',
            'companies': 'All Companies',
            'settings': 'Settings'
        };
        return nameMap[item] || 'This ';
    };

    const getPageTitle = (item) => {
        const titles = {
            'overview': 'Company Profile',
            'employer-profile': 'Employer Profile',
            'post-job': 'Post a Job',
            'my-jobs': 'My Jobs',
            'saved-candidate': 'Saved Candidates',
            'plans': 'Plans & Billing',
            'companies': 'All Companies',
            'settings': 'Settings'
        };
        return titles[item] || 'Dashboard';
    };

    return (
        <div className="flex h-screen bg-slate-950">
            <Sidebar
                activeItem={activeSidebarItem}
                onItemClick={setActiveSidebarItem}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation Bar */}
                <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/60 px-8 py-3 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-tight">
                            {getPageTitle(activeSidebarItem)}
                        </h1>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Manage your organization settings and profile
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Search */}
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 text-sm bg-slate-800/60 border border-slate-700/50 rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all placeholder:text-slate-600 text-slate-300"
                            />
                        </div>

                        {/* Notification Bell */}
                        <button className="relative p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/60 transition-colors">
                            <Bell size={18} className="text-slate-400" />
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-slate-900"></span>
                        </button>

                        {/* User Avatar */}
                        <div className="flex items-center space-x-2.5 pl-3 border-l border-slate-800">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center ring-2 ring-blue-500/20">
                                <User size={16} className="text-white" />
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-xs font-semibold text-slate-300">Admin</p>
                                <p className="text-[10px] text-slate-600">Employer</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    {activeSidebarItem === 'employer-profile' && (
                        <main className="p-8">
                            <UserDetails />
                        </main>
                    )}

                    {activeSidebarItem === 'overview' && (
                        <main>
                            <Overview 
                                onNavigateToProfile={() => setActiveSidebarItem('employer-profile')}
                            />
                        </main>
                    )}

                    {activeSidebarItem !== 'overview' && activeSidebarItem !== 'employer-profile' && (
                        <main className="p-8">
                            <NotImplemented 
                                componentName={getComponentName(activeSidebarItem)}
                                onGoBack={() => setActiveSidebarItem('overview')}
                            />
                        </main>
                    )}
                </div>
            </div>
        </div>
    );
}