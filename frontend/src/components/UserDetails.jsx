import { useEffect, useState } from 'react';
import api from "../api/axios"
import { format } from 'date-fns';
import { User, Mail, Phone, Edit2, Briefcase, Calendar } from 'lucide-react';

export default function UserDetails() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/profile');
                setProfile(res.data.data);
            } catch (err) {
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">
                    User Profile
                </h2>
                {/* <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg">
                    <Edit2 size={16} />
                    <span>Edit Profile</span>
                </button> */}
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Avatar & Name */}
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            {profile.full_name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Employer
                        </p>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                    <DetailRow
                        icon={<User size={18} />}
                        label="Full Name"
                        value={profile.full_name}
                    />

                    <DetailRow
                        icon={<Mail size={18} />}
                        label="Email Address"
                        value={profile.email}
                    />

                    <DetailRow
                        icon={<Phone size={18} />}
                        label="Phone Number"
                        value={profile.mobile_no}
                    />

                    <DetailRow
                        icon={<Briefcase size={18} />}
                        label="Gender"
                        value={profile.gender === 'M' ? 'Male' : 'Female'}
                    />

                    <DetailRow
                        icon={<Calendar size={18} />}
                        label="Account Created"
                        value={format(new Date(profile.created_at), 'dd/MM/yyyy')}
                    />
                </div>
            </div>
        </div>
    );
}

function DetailRow({ icon, label, value }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-3">
                <div className="text-gray-400">{icon}</div>
                <span className="text-sm font-medium text-gray-600">
                    {label}
                </span>
            </div>
            <span className="text-sm font-semibold text-gray-800">
                {value || '-'}
            </span>
        </div>
    );
}
