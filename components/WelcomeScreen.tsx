import React from 'react';

interface WelcomeScreenProps {
    onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin }) => {
    return (
        <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fade-in relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
            
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl z-10">
                 <span className="text-6xl font-bold text-white">N</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 z-10">NEXUS</h1>
            <p className="text-slate-400 mb-10 z-10 max-w-xs">Jembatan antara riset akademis dan inovasi AI dalam satu genggaman.</p>
            
            <button onClick={onLogin} className="w-full max-w-xs bg-white text-slate-900 font-bold py-4 rounded-xl mb-4 hover:bg-slate-200 transition-colors z-10">
                Masuk
            </button>
            <button className="w-full max-w-xs bg-transparent border border-slate-600 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors z-10">
                Buat Akun Baru
            </button>
        </div>
    );
};