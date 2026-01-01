import { Construction, ArrowLeft } from 'lucide-react';

export default function NotImplemented({ componentName = "This page", onGoBack }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
                {/* Construction Icon */}
                <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center">
                    <Construction className="w-12 h-12 text-yellow-600" strokeWidth={2} />
                </div>

                {/* Message */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {componentName} page is not implemented yet
                    </h2>
                    <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                        This feature is currently under development. Please check back later or contact support for more information.
                    </p>
                </div>

                {/* Action Button */}
                {onGoBack && (
                    <button
                        onClick={onGoBack}
                        className="px-6 py-2.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                )}
            </div>
        </div>
    );
}