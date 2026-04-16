import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Success({ onViewDashboard, onViewProfile }) {
    const navigate = useNavigate();
    const handleViewDashboard = () => { if (onViewDashboard) onViewDashboard(); else navigate('/'); };
    const handleViewProfile = () => { if (onViewProfile) onViewProfile(); else navigate('/'); };

    return (
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800/60 p-10 shadow-xl shadow-black/20">
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
                    <Check className="w-10 h-10 text-emerald-400" strokeWidth={3} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-white tracking-tight">🎉 Profile 100% Complete!</h2>
                    <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">Your company profile is ready. Manage job postings, update info, and explore your dashboard.</p>
                </div>
                <div className="flex gap-3 pt-2">
                    <button onClick={handleViewDashboard} className="px-6 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all duration-200">
                        View Dashboard
                    </button>
                    <button onClick={handleViewProfile} className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
}