import { Layers, UserCircle, CirclePlus, BriefcaseBusiness,
    Bookmark, Notebook, Building2, Settings, Briefcase, LogOut, ChevronRight
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function NavItem({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 cursor-pointer rounded-lg transition-all duration-200 group relative ${
                active
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
        >
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-400 rounded-r-full"></div>
            )}
            <span className={`${active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>
                {icon}
            </span>
            <span className="text-[13px] font-medium flex-1 text-left">{label}</span>
            {active && (
                <ChevronRight size={14} className="text-slate-500" />
            )}
        </button>
    );
}

export default function Sidebar({ activeItem, onItemClick }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <aside className="w-64 bg-slate-900 flex flex-col min-h-screen">
            {/* Logo */}
            <div className="px-6 pt-7 pb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="text-lg font-bold text-white tracking-tight block leading-tight">
                            BlueStocks
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                            Management Suite
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-5 border-t border-slate-800"></div>

            {/* Menu */}
            <div className="flex-1 px-4 pt-5">
                <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3 px-4">
                    Main Menu
                </p>

                <div className="space-y-0.5">
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
                </div>

                <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3 mt-6 px-4">
                    Organization
                </p>

                <div className="space-y-0.5">
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

            {/* Bottom Section */}
            <div className="px-4 pb-5">
                {/* Help card */}
                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold text-blue-300 mb-1">Need Help?</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Contact support for assistance with your account.</p>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer group"
                >
                    <LogOut size={18} className="group-hover:text-red-300 transition-colors" />
                    <span className="text-[13px] font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
