import { Construction, ArrowLeft } from 'lucide-react';

export default function NotImplemented({ componentName = "This page", onGoBack }) {
    return (
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800/60 p-10 shadow-xl shadow-black/20">
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
                    <Construction className="w-10 h-10 text-amber-400" strokeWidth={2} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-white tracking-tight">{componentName} page is not implemented yet</h2>
                    <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">This feature is currently under development. Please check back later.</p>
                </div>
                {onGoBack && (
                    <button onClick={onGoBack} className="px-5 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl font-semibold hover:bg-slate-700 hover:border-slate-600 transition-all duration-200 flex items-center gap-2 group">
                        <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                        Go Back
                    </button>
                )}
            </div>
        </div>
    );
}