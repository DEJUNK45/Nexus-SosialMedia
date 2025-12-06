import React from 'react';
import { Users } from 'lucide-react';
import { Community } from '../types';

interface CommunityViewProps {
    communities: Community[];
}

export const CommunityView: React.FC<CommunityViewProps> = ({ communities }) => {
    return (
        <div className="pb-24 pt-20 px-4 space-y-4">
             <h2 className="text-xl font-bold text-white mb-4">Circles (Komunitas)</h2>
             <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 mb-6">
                <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Study Rooms
                </h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                    <div className="min-w-[140px] bg-slate-700/50 p-3 rounded-lg border border-slate-600/50 text-center">
                        <div className="text-xs text-slate-400 mb-1">Deep Work 🎵</div>
                        <div className="flex justify-center -space-x-2 mb-2">
                            {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-500 border-2 border-slate-700"></div>)}
                        </div>
                        <button className="w-full bg-green-600/20 text-green-400 text-[10px] py-1 rounded">Join Audio</button>
                    </div>
                    <div className="min-w-[140px] bg-slate-700/50 p-3 rounded-lg border border-slate-600/50 text-center">
                        <div className="text-xs text-slate-400 mb-1">Python Help 🐍</div>
                        <div className="flex justify-center -space-x-2 mb-2">
                            {[1,2].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-500 border-2 border-slate-700"></div>)}
                        </div>
                        <button className="w-full bg-indigo-600/20 text-indigo-400 text-[10px] py-1 rounded">Join Audio</button>
                    </div>
                </div>
             </div>
             <div className="space-y-3">
                {communities.map(comm => (
                    <div key={comm.id} className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-lg">#</div>
                            <div>
                                <h4 className="font-medium text-slate-200">{comm.name}</h4>
                                <p className="text-xs text-slate-500">{comm.members} members • {comm.active} online</p>
                            </div>
                        </div>
                        <button className="text-slate-400 hover:text-white">
                            <Users size={18}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};