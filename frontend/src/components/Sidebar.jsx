import { Layers, UserCircle, CirclePlus, BriefcaseBusiness,
    Bookmark, Notebook, Building2, Settings, Briefcase, LogOut
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function NavItem({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 cursor-pointer rounded-lg transition-colors ${
                active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
            }`}
        >
            {icon}
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}

export default function Sidebar({ activeItem, onItemClick }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Top Section */}
            <div className="p-6 flex-1">
                {/* Logo */}
                <div className="flex items-center space-x-2 mb-8">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-gray-800">
                        Jobpilot
                    </span>
                </div>

                {/* Menu */}
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        EMPLOYER DASHBOARD
                    </p>

                    <NavItem
                        icon={<Layers size={18} />}
                        label="Overview"
                        active={activeItem === 'overview'}
                        onClick={() => onItemClick('overview')}
                    />

                    <NavItem
                        icon={<UserCircle size={18} />}
                        label="Employer Profile"
                        active={activeItem === 'employer-profile'}
                        onClick={() => onItemClick('employer-profile')}
                    />

                    <NavItem
                        icon={<CirclePlus size={18} />}
                        label="Post a Job"
                        active={activeItem === 'post-job'}
                        onClick={() => onItemClick('post-job')}
                    />

                    <NavItem
                        icon={<BriefcaseBusiness size={18} />}
                        label="My Jobs"
                        active={activeItem === 'my-jobs'}
                        onClick={() => onItemClick('my-jobs')}
                    />

                    <NavItem
                        icon={<Bookmark size={18} />}
                        label="Saved Candidate"
                        active={activeItem === 'saved-candidate'}
                        onClick={() => onItemClick('saved-candidate')}
                    />

                    <NavItem
                        icon={<Notebook size={18} />}
                        label="Plans & Billing"
                        active={activeItem === 'plans'}
                        onClick={() => onItemClick('plans')}
                    />

                    <NavItem
                        icon={<Building2 size={18} />}
                        label="All Companies"
                        active={activeItem === 'companies'}
                        onClick={() => onItemClick('companies')}
                    />

                    <NavItem
                        icon={<Settings size={18} />}
                        label="Settings"
                        active={activeItem === 'settings'}
                        onClick={() => onItemClick('settings')}
                    />
                </div>
            </div>

            {/* Bottom Logout */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-600 bg-red-50 transition-colors cursor-pointer hover:bg-red-100 delay-100"
                >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
