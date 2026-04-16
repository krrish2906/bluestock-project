import { useEffect, useState } from 'react';
import api from "../api/axios"
import { format } from 'date-fns';
import { User, Mail, Phone, Calendar, Shield } from 'lucide-react';

export default function UserDetails() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/profile');
                setProfile(res.data.data);
            } catch (err) { setError('Failed to load profile'); }
            finally { setLoading(false); }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800/60">
                <div className="flex items-center space-x-5">
                    <div className="w-20 h-20 bg-slate-800 rounded-2xl animate-pulse"></div>
                    <div className="space-y-3 flex-1">
                        <div className="h-5 bg-slate-800 rounded-lg w-1/3 animate-pulse"></div>
                        <div className="h-4 bg-slate-800 rounded-lg w-1/4 animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="bg-slate-900/80 p-6 rounded-2xl border border-red-500/20 text-red-400 font-medium">{error}</div>;
    }

    return (
        <div className="max-w-3xl">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800/60 shadow-xl shadow-black/20 overflow-hidden">
                {/* Banner */}
                <div className="h-28 bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-violet-600/30 relative">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/4"></div>
                        <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-white rounded-full translate-y-1/2"></div>
                    </div>
                </div>

                {/* Avatar */}
                <div className="px-8 -mt-12 mb-4 relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 border-4 border-slate-900">
                        <User className="w-12 h-12 text-white" />
                    </div>
                </div>

                {/* Name & Role */}
                <div className="px-8 pb-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">{profile.full_name}</h3>
                    <div className="flex items-center space-x-2 mt-1.5">
                        <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">Employer</span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1"><Shield size={10} />Verified</span>
                    </div>
                </div>

                <div className="mx-8 mt-4 border-t border-slate-800"></div>

                {/* Details */}
                <div className="px-8 py-6 space-y-0">
                    <DetailRow icon={<Mail size={16} />} label="Email Address" value={profile.email} />
                    <DetailRow icon={<Phone size={16} />} label="Phone Number" value={profile.mobile_no} />
                    <DetailRow icon={<User size={16} />} label="Gender" value={profile.gender === 'M' ? 'Male' : 'Female'} />
                    <DetailRow icon={<Calendar size={16} />} label="Account Created" value={format(new Date(profile.created_at), 'dd MMM yyyy')} />
                </div>
            </div>
        </div>
    );
}

function DetailRow({ icon, label, value }) {
    return (
        <div className="flex items-center justify-between py-3.5 px-1 border-b border-slate-800/60 last:border-b-0">
            <div className="flex items-center space-x-3">
                <div className="text-slate-500">{icon}</div>
                <span className="text-sm text-slate-400">{label}</span>
            </div>
            <span className="text-sm font-semibold text-slate-200">{value || '—'}</span>
        </div>
    );
}
