import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import UserDetails from '../components/UserDetails';
import Overview from '../components/Overview';

export default function Home() {
    const [activeSidebarItem, setActiveSidebarItem] =
        useState('overview');

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar
                activeItem={activeSidebarItem}
                onItemClick={setActiveSidebarItem}
            />

            <div className="flex-1 overflow-auto">
                {activeSidebarItem === 'employer-profile' && (<header className="bg-white border-b border-gray-200 px-8 py-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Employer Profile
                    </h1>
                </header>)}

                {activeSidebarItem === 'employer-profile' && (
                    <main className="p-8">
                        <UserDetails />
                    </main>
                )}

                {activeSidebarItem === 'overview' && (
                    <main>
                        <Overview />
                    </main>
                )}
            </div>
        </div>
    );
}