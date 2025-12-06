import React from 'react';
import { Box, Lock, Bookmark, Book, Database, Layout } from 'lucide-react';
import { VaultItem } from '../types';

interface VaultViewProps {
    items: VaultItem[];
    onItemClick: (item: VaultItem) => void;
    onBookmark: (id: number) => void;
}

export const VaultView: React.FC<VaultViewProps> = ({ items, onItemClick, onBookmark }) => {
    
    const getItemConfig = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes('e-book')) {
            return {
                icon: <Book size={32} className="text-blue-400" />,
                badgeClass: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
                bgClass: "bg-blue-900/20"
            };
        } else if (t.includes('dataset')) {
            return {
                icon: <Database size={32} className="text-emerald-400" />,
                badgeClass: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
                bgClass: "bg-emerald-900/20"
            };
        } else if (t.includes('template')) {
            return {
                icon: <Layout size={32} className="text-purple-400" />,
                badgeClass: "bg-purple-500/10 text-purple-300 border border-purple-500/20",
                bgClass: "bg-purple-900/20"
            };
        }
        return {
            icon: <Box size={32} className="text-slate-400" />,
            badgeClass: "bg-slate-700/50 text-slate-300 border border-slate-600",
            bgClass: "bg-slate-800"
        };
    };

    return (
        <div className="pb-24 pt-20 px-4">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">The Vault</h2>
                <div className="flex gap-2 text-xs">
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-slate-300">Books</span>
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-slate-300">Datasets</span>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                {items.map(item => {
                    const config = getItemConfig(item.type);
                    return (
                        <div key={item.id} className="relative group">
                             {/* Bookmark Button - Absolute to avoid clicking item */}
                             <button 
                                onClick={(e) => { e.stopPropagation(); onBookmark(item.id); }}
                                className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-slate-900/50 text-slate-400 hover:text-indigo-400 hover:bg-slate-900 transition-colors backdrop-blur-sm"
                            >
                                <Bookmark size={14} fill={item.bookmarked ? "currentColor" : "none"} className={item.bookmarked ? "text-indigo-400" : ""} />
                            </button>

                            <div onClick={() => onItemClick(item)} className="bg-slate-800 border border-slate-700 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:border-indigo-500 transition-colors h-full shadow-sm">
                                {item.locked && (
                                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 pointer-events-none">
                                        <div className="bg-slate-900 p-3 rounded-full mb-2 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                                            <Lock size={20} className="text-yellow-500" />
                                        </div>
                                        <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">Pro Only</span>
                                    </div>
                                )}
                                <div className={`h-28 rounded-lg mb-3 flex items-center justify-center ${config.bgClass}`}>
                                    {config.icon}
                                </div>
                                <div>
                                    <span className={`text-[10px] font-bold mb-2 inline-block px-2 py-0.5 rounded ${config.badgeClass}`}>
                                        {item.type}
                                    </span>
                                    <h3 className="text-sm font-bold text-white leading-tight mb-1 line-clamp-2">{item.title}</h3>
                                    <p className="text-[10px] text-slate-500 line-clamp-1">{item.author}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
             </div>
        </div>
    );
};