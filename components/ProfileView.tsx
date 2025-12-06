import React from 'react';
import { Crown, Bookmark, Clock, Settings, LogOut, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
    profile: UserProfile;
    points: number;
    onViewClick: (view: 'saved' | 'history' | 'settings') => void;
    onUpgradeClick: () => void;
    onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, points, onViewClick, onUpgradeClick, onLogout }) => {
    return (
         <div className="pb-24 pt-20 px-4">
            <div className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700 relative overflow-hidden mb-6">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-indigo-900/50 to-transparent"></div>
                <img src="https://picsum.photos/150/150?random=99" alt="Profile" className="w-20 h-20 rounded-full border-4 border-slate-800 mx-auto relative z-10 mb-3" />
                <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                <p className="text-sm text-slate-400">{profile.bio}</p>
                <div className="flex justify-center gap-6 mt-4">
                    <div className="text-center">
                        <div className="text-lg font-bold text-indigo-400">{points}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">KP Points</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-white">12</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">Contribs</div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-1 mb-6">
                <div className="bg-slate-900 rounded-lg p-4 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Crown size={16} className="text-yellow-500" /> Nexus Pro
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">Akses AI Summarizer & Vault Premium</p>
                    </div>
                    <button onClick={onUpgradeClick} className="bg-yellow-500 text-black font-bold text-xs px-4 py-2 rounded-lg hover:bg-yellow-400">
                        Upgrade
                    </button>
                </div>
            </div>

            <div className="space-y-1">
                <button onClick={() => onViewClick('saved')} className="w-full text-left p-4 hover:bg-slate-800 rounded-lg text-sm text-slate-300 flex justify-between items-center group">
                    <span className="flex items-center gap-3"><Bookmark size={18} className="text-indigo-400"/> Disimpan</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform"/>
                </button>
                <button onClick={() => onViewClick('history')} className="w-full text-left p-4 hover:bg-slate-800 rounded-lg text-sm text-slate-300 flex justify-between items-center group">
                    <span className="flex items-center gap-3"><Clock size={18} className="text-green-400"/> Riwayat Baca</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform"/>
                </button>
                <button onClick={() => onViewClick('settings')} className="w-full text-left p-4 hover:bg-slate-800 rounded-lg text-sm text-slate-300 flex justify-between items-center group">
                    <span className="flex items-center gap-3"><Settings size={18} className="text-slate-400"/> Pengaturan</span>
                    <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform"/>
                </button>
                <button onClick={onLogout} className="w-full text-left p-4 hover:bg-red-900/20 rounded-lg text-sm text-red-400 flex justify-between items-center group mt-4 border border-red-900/30">
                    <span className="flex items-center gap-3"><LogOut size={18} /> Keluar</span>
                    <ChevronRight size={16} className="text-red-800 group-hover:translate-x-1 transition-transform"/>
                </button>
            </div>
         </div>
    );
};