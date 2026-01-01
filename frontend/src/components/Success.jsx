import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Success({ onViewDashboard, onViewProfile }) {
    const navigate = useNavigate();

    const handleViewDashboard = () => {
        if (onViewDashboard) {
            onViewDashboard();
        } else {
            // Fallback: navigate to home which shows overview
            navigate('/');
        }
    };

    const handleViewProfile = () => {
        if (onViewProfile) {
            onViewProfile();
        } else {
            // Fallback: navigate to home
            navigate('/');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                {/* Success Icon */}
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                    <Check className="w-12 h-12 text-blue-600" strokeWidth={3} />
                </div>

                {/* Success Message */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        🎉 Congratulations, Your profile is 100% complete!
                    </h2>
                    <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                        Your company profile is now complete and ready to be viewed by candidates. You can manage job postings, update your information, and explore your dashboard to get started.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        onClick={handleViewDashboard}
                        className="px-6 py-2.5 border border-gray-300 bg-white rounded-md text-blue-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                        View Dashboard
                    </button>
                    <button
                        onClick={handleViewProfile}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
}