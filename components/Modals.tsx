import React, { useState } from 'react';
import { X, Play, Share2, Send, Crown, Check, Lock, Download, Box, ChevronRight, Moon, Bell, Bookmark, FileText } from 'lucide-react';
import { Story, Post, VaultItem, UserProfile } from '../types';

// --- Story Overlay ---
export const StoryOverlay: React.FC<{ story: Story; onClose: () => void }> = ({ story, onClose }) => (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col animate-slide-up">
        <div className="h-1 w-full flex gap-1 pt-2 px-2">
            <div className="h-full bg-white flex-1 rounded-full animate-width"></div>
        </div>
        <div className="p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${story.color}`}></div>
                <span className="font-bold">{story.user}</span>
            </div>
            <button onClick={onClose}><X size={24} /></button>
        </div>
        <div className={`flex-1 flex items-center justify-center p-8 bg-gradient-to-br ${story.color}`}>
            <h2 className="text-3xl font-bold text-white text-center leading-relaxed">"{story.content}"</h2>
        </div>
        <div className="p-4 bg-black">
            <input type="text" placeholder="Balas story..." className="w-full bg-slate-800 rounded-full px-4 py-3 text-white focus:outline-none border border-slate-700" />
        </div>
    </div>
);

// --- Full Research Overlay ---
export const FullResearchOverlay: React.FC<{ post: Post; onClose: () => void; onShare: () => void; onBookmark: (id: number) => void }> = ({ post, onClose, onShare, onBookmark }) => (
    <div className="fixed inset-0 z-[60] bg-slate-900 overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-4 flex justify-between items-center z-10">
             <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={24} /></button>
             <div className="flex gap-4">
                <button onClick={() => onBookmark(post.id)} className="text-slate-400 hover:text-indigo-400">
                    <Bookmark size={20} fill={post.bookmarked ? "currentColor" : "none"} className={post.bookmarked ? "text-indigo-400" : ""} />
                </button>
                <button onClick={onShare}><Share2 size={20} className="text-slate-400 hover:text-white" /></button>
             </div>
        </div>
        <div className="p-5 pb-24">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2 block">{post.type}</span>
            <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-3 mb-6">
                <img src={post.avatar} alt="Author" className="w-10 h-10 rounded-full" />
                <div><p className="text-sm font-semibold text-white">{post.user}</p><p className="text-xs text-slate-400">Published 2h ago</p></div>
                <button className="ml-auto bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-full">Follow</button>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 mb-6 flex items-center gap-4 border border-slate-700">
                <button className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white shrink-0"><Play size={16} fill="white" /></button>
                <div className="flex-1">
                    <div className="text-xs text-slate-400 mb-1">Audio Abstract (AI Generated)</div>
                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden"><div className="w-1/3 h-full bg-indigo-500"></div></div>
                </div>
                <span className="text-xs text-slate-400">02:14</span>
            </div>
            <div className="prose prose-invert prose-sm max-w-none">
                <h3 className="text-white font-bold">Abstract</h3><p className="text-slate-300 leading-relaxed mb-4">{post.summary}</p>
                <h3 className="text-white font-bold">Key Findings</h3><p className="text-slate-300 leading-relaxed">{post.fullContent || post.summary}</p>
            </div>
             <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800">
                {post.tags.map(tag => (<span key={tag} className="text-xs px-3 py-1 bg-slate-800 rounded-full text-slate-300">#{tag}</span>))}
            </div>
        </div>
    </div>
);

// --- Comment Modal ---
export const CommentModal: React.FC<{ post: Post; onClose: () => void; onAddComment: (text: string) => void }> = ({ post, onClose, onAddComment }) => {
    const [input, setInput] = useState("");
    const send = () => { if (!input.trim()) return; onAddComment(input); setInput(""); };
    return (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-end justify-center">
            <div className="bg-slate-900 w-full max-w-md rounded-t-2xl h-[60vh] flex flex-col animate-slide-up border-t border-slate-700">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center"><h3 className="font-bold text-white">Komentar ({post.comments.length})</h3><button onClick={onClose}><X size={20} /></button></div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {post.comments.length === 0 && <p className="text-center text-slate-500 text-sm mt-10">Belum ada komentar.</p>}
                    {post.comments.map((c, i) => (<div key={i} className="flex gap-3"><div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">{c.user[0]}</div><div><p className="text-xs font-bold text-slate-300">{c.user}</p><p className="text-sm text-slate-100">{c.text}</p></div></div>))}
                </div>
                <div className="p-3 border-t border-slate-800 flex gap-2">
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tulis komentar..." className="flex-1 bg-slate-800 rounded-full px-4 py-2 text-sm text-white focus:outline-none" onKeyDown={(e) => e.key === 'Enter' && send()} />
                    <button onClick={send} className="p-2 bg-indigo-600 rounded-full text-white"><Send size={16} /></button>
                </div>
            </div>
        </div>
    );
};

// --- Create Post Modal ---
export const CreatePostModal: React.FC<{ onClose: () => void; onSubmit: () => void }> = ({ onClose, onSubmit }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [currTag, setCurrTag] = useState("");
    const handleKeyDown = (e: React.KeyboardEvent) => { if ((e.key === 'Enter' || e.key === ' ') && currTag.trim()) { e.preventDefault(); setTags([...tags, currTag.replace('#', '')]); setCurrTag(""); } };
    const removeTag = (t: string) => { setTags(tags.filter(tag => tag !== t)); };
    return (
        <div className="fixed inset-0 z-[60] bg-slate-900 animate-slide-up flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-slate-800"><button onClick={onClose} className="text-slate-400">Batal</button><h2 className="font-bold text-white">Buat Riset Baru</h2><button onClick={onSubmit} className="text-indigo-400 font-bold">Posting</button></div>
            <div className="p-4 flex-1">
                <input type="text" placeholder="Judul Riset / Temuan..." className="w-full bg-transparent text-xl font-bold text-white placeholder-slate-500 focus:outline-none mb-4" />
                <textarea placeholder="Ceritakan hasil riset atau bagikan link jurnal..." className="w-full bg-transparent text-slate-300 h-40 focus:outline-none resize-none mb-4"></textarea>
                <div className="mb-2">
                    <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Tagging (Ketik lalu Enter/Spasi)</label>
                    <div className="flex flex-wrap gap-2 mb-2">{tags.map(tag => (<span key={tag} className="bg-indigo-900 text-indigo-200 px-2 py-1 rounded text-sm flex items-center gap-1">#{tag}<button onClick={() => removeTag(tag)}><X size={12} /></button></span>))}</div>
                    <input value={currTag} onChange={e => setCurrTag(e.target.value)} onKeyDown={handleKeyDown} placeholder="Contoh: AI, Medical, Data..." className="w-full bg-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                    <p className="text-[10px] text-slate-500 mt-1">Gunakan tag yang relevan agar risetmu mudah ditemukan di Vault.</p>
                </div>
            </div>
        </div>
    );
};

// --- Upgrade Modal ---
export const UpgradeModal: React.FC<{ onClose: () => void; onSubscribe: () => void }> = ({ onClose, onSubscribe }) => (
    <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-slate-900 w-full max-w-sm rounded-2xl border border-yellow-600/30 overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>
            <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-500/20">
                    <Crown size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">Nexus Pro</h2>
                <p className="text-yellow-500 font-medium mb-6">Buka Potensi Penuh Risetmu</p>
                <ul className="text-left space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-green-400" /> Akses Unlimited ke 'The Vault'</li>
                    <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-green-400" /> AI Research Summarizer</li>
                    <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-green-400" /> Unduh PDF & Dataset Tanpa Batas</li>
                    <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-green-400" /> Badge Profil Eksklusif</li>
                </ul>
                <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
                    <div className="flex justify-between items-center mb-2"><span className="text-slate-400 text-sm">Bulanan</span><span className="text-white font-bold text-xl">$9.99<span className="text-xs text-slate-500 font-normal">/bln</span></span></div>
                    <div className="flex justify-between items-center"><span className="text-yellow-500 text-sm font-bold">Tahunan (Hemat 20%)</span><span className="text-white font-bold text-xl">$95.00<span className="text-xs text-slate-500 font-normal">/thn</span></span></div>
                </div>
                <button onClick={onSubscribe} className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">Langganan Sekarang</button>
                <button onClick={onClose} className="mt-4 text-slate-500 text-sm hover:text-white">Nanti Saja</button>
            </div>
        </div>
    </div>
);

// --- Vault Detail ---
export const VaultDetailOverlay: React.FC<{ item: VaultItem; onClose: () => void; onBookmark: (id: number) => void }> = ({ item, onClose, onBookmark }) => (
    <div className="fixed inset-0 z-[60] bg-slate-900 animate-slide-up overflow-y-auto">
        <div className="sticky top-0 p-4 flex justify-between items-center bg-slate-900/95 backdrop-blur z-10">
            <button onClick={onClose} className="text-slate-400"><X size={24} /></button>
            <span className="font-bold text-slate-200">Item Detail</span>
             <div className="flex gap-4">
                <button onClick={() => onBookmark(item.id)} className="text-slate-400 hover:text-indigo-400">
                    <Bookmark size={20} fill={item.bookmarked ? "currentColor" : "none"} className={item.bookmarked ? "text-indigo-400" : ""} />
                </button>
                <button><Share2 size={20} className="text-slate-400" /></button>
            </div>
        </div>
        <div className="p-6 text-center">
            <div className="w-32 h-40 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg shadow-xl mx-auto mb-6 flex items-center justify-center border border-slate-600 relative">
                <Box size={48} className="text-slate-500" />
                <div className="absolute bottom-2 right-2 text-[10px] bg-black/50 px-2 py-1 rounded text-white">{item.type}</div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
            <p className="text-indigo-400 text-sm font-medium mb-6">Oleh {item.author}</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700"><div className="text-xs text-slate-400 mb-1">Ukuran</div><div className="font-bold text-white">{item.size}</div></div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700"><div className="text-xs text-slate-400 mb-1">Lisensi</div><div className="font-bold text-white">{item.license}</div></div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700"><div className="text-xs text-slate-400 mb-1">Akses</div><div className="font-bold text-white">{item.locked ? "Pro" : "Free"}</div></div>
            </div>
            <button className={`w-full py-4 rounded-xl font-bold text-white mb-4 flex items-center justify-center gap-2 ${item.locked ? 'bg-slate-700 cursor-not-allowed opacity-50' : 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/20'}`}>
                {item.locked ? <Lock size={18} /> : <Download size={18} />}
                {item.locked ? "Upgrade to Access" : "Download Now"}
            </button>
        </div>
    </div>
);

// --- Profile Settings Subviews ---
export const ProfileSubView: React.FC<{ 
    view: string; 
    onClose: () => void; 
    profile: UserProfile; 
    setProfile: (p: UserProfile) => void;
    savedPosts: Post[];
    savedVaultItems: VaultItem[];
    onTogglePostBookmark: (id: number) => void;
    onToggleVaultBookmark: (id: number) => void;
}> = ({ view, onClose, profile, setProfile, savedPosts, savedVaultItems, onTogglePostBookmark, onToggleVaultBookmark }) => {
    const [subPage, setSubPage] = useState<string | null>(null);

    // Edit Profile View
    if (subPage === 'edit-profile') {
        return (
            <div className="fixed inset-0 z-[70] bg-slate-900 flex flex-col animate-slide-up">
                <div className="p-4 flex items-center gap-4 border-b border-slate-700">
                    <button onClick={() => setSubPage(null)}><X className="text-slate-400" /></button>
                    <h3 className="font-bold text-white">Edit Profil</h3>
                </div>
                <div className="p-4 space-y-4">
                    <div>
                        <label className="text-xs text-slate-400 block mb-2">Nama Lengkap</label>
                        <input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full bg-slate-800 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 block mb-2">Bio Singkat</label>
                        <textarea value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} className="w-full bg-slate-800 rounded-lg p-3 text-white h-24 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none" />
                    </div>
                    <button onClick={() => setSubPage(null)} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg mt-4">Simpan Perubahan</button>
                </div>
            </div>
        );
    }

    const title = view === 'saved' ? 'Disimpan' : view === 'history' ? 'Riwayat Baca' : 'Pengaturan';
    
    // Saved Items Render Logic
    const renderSavedItems = () => {
        if (savedPosts.length === 0 && savedVaultItems.length === 0) {
            return <div className="text-center text-slate-500 mt-10">Belum ada item yang disimpan.</div>;
        }
        return (
            <div className="space-y-4">
                {savedPosts.map(post => (
                    <div key={`p-${post.id}`} className="bg-slate-800 p-4 rounded-xl flex gap-4 border border-slate-700 relative">
                        <button 
                            onClick={() => onTogglePostBookmark(post.id)}
                            className="absolute top-2 right-2 text-indigo-400 hover:text-slate-400"
                        >
                            <Bookmark size={16} fill="currentColor" />
                        </button>
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                            <FileText size={20} className="text-indigo-400"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm mb-1 line-clamp-1">{post.title}</h4>
                            <p className="text-xs text-slate-400 mb-1 line-clamp-1">{post.summary}</p>
                            <span className="text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-500">Research Paper</span>
                        </div>
                    </div>
                ))}
                {savedVaultItems.map(item => (
                    <div key={`v-${item.id}`} className="bg-slate-800 p-4 rounded-xl flex gap-4 border border-slate-700 relative">
                         <button 
                            onClick={() => onToggleVaultBookmark(item.id)}
                            className="absolute top-2 right-2 text-indigo-400 hover:text-slate-400"
                        >
                            <Bookmark size={16} fill="currentColor" />
                        </button>
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                            <Box size={20} className="text-green-400"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-slate-400 mb-1">{item.type} • {item.size}</p>
                            <span className="text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-500">Vault Item</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900 animate-slide-up flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center gap-4">
                <button onClick={onClose}><X className="text-slate-400" /></button>
                <h2 className="font-bold text-xl text-white">{title}</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
                {view === 'settings' ? (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase">Akun</h3>
                            <div onClick={() => setSubPage('edit-profile')} className="bg-slate-800 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-slate-700 transition-colors">
                                <span className="text-slate-200">Edit Profil</span>
                                <ChevronRight size={18} className="text-slate-500" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase">Aplikasi</h3>
                            <div className="bg-slate-800 rounded-xl p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3"><Bell size={18} className="text-indigo-400" /><span className="text-slate-200">Notifikasi</span></div>
                                <div className="w-10 h-6 bg-indigo-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                            </div>
                            <div className="bg-slate-800 rounded-xl p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3"><Moon size={18} className="text-indigo-400" /><span className="text-slate-200">Dark Mode</span></div>
                                <div className="w-10 h-6 bg-indigo-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                            </div>
                        </div>
                    </div>
                ) : view === 'saved' ? (
                    renderSavedItems()
                ) : (
                    /* History View Placeholder - Reuse similar logic if needed or keep existing placeholder for now */
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-slate-800 p-4 rounded-xl flex gap-4 border border-slate-700">
                                <div className="w-16 h-16 bg-slate-700 rounded-lg flex-shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-white text-sm mb-1">History Item #{i}</h4>
                                    <p className="text-xs text-slate-400 mb-2">Penjelasan singkat tentang item ini...</p>
                                    <span className="text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-500">Dibaca 2 jam lalu</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};