import React, { useState } from 'react';
import { Home, Zap, Box, User, Plus, Bell, Search, ArrowLeft, X } from 'lucide-react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { FeedView } from './components/FeedView';
import { ToolsView } from './components/ToolsView';
import { VaultView } from './components/VaultView';
import { ProfileView } from './components/ProfileView';
import { CommunityView } from './components/CommunityView';
import { SearchView } from './components/SearchView';
import { ToolInterface } from './components/ToolInterface';
import { 
    StoryOverlay, 
    FullResearchOverlay, 
    CommentModal, 
    CreatePostModal, 
    UpgradeModal, 
    VaultDetailOverlay, 
    ProfileSubView 
} from './components/Modals';

import { INITIAL_POSTS, STORIES, TOOLS, VAULT_ITEMS, COMMUNITIES } from './constants';
import { Post, Story, Tool, VaultItem, UserProfile } from './types';

const App = () => {
    // Auth & User State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userPoints, setUserPoints] = useState(1250);
    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: "Alex Researcher",
        bio: "AI Enthusiast & Student",
        email: "alex@nexus.com"
    });

    // Navigation State
    const [activeTab, setActiveTab] = useState<'home' | 'tools' | 'vault' | 'profile'>('home');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Data State
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
    const [vaultItems, setVaultItems] = useState<VaultItem[]>(VAULT_ITEMS);

    // Overlay/Modal State
    const [activeStory, setActiveStory] = useState<Story | null>(null);
    const [activePost, setActivePost] = useState<Post | null>(null);
    const [activeCommentsPost, setActiveCommentsPost] = useState<Post | null>(null);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [activeTool, setActiveTool] = useState<Tool | null>(null);
    const [activeVaultItem, setActiveVaultItem] = useState<VaultItem | null>(null);
    const [activeProfileView, setActiveProfileView] = useState<string | null>(null);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    
    const [toast, setToast] = useState<string | null>(null);

    // Search Logic
    const filteredPosts = posts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const filteredTools = TOOLS.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredVaultItems = vaultItems.filter(v => 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Helpers
    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        showToast("Selamat datang kembali, Alex!");
    };

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            setIsLoggingOut(false);
            setIsLoggedIn(false);
            setActiveTab('home');
            setActiveProfileView(null);
            setIsSearchActive(false);
            setSearchQuery('');
            showToast("Anda telah keluar.");
        }, 2000);
    };

    const handleLike = (postId: number) => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                return { 
                    ...p, 
                    liked: !p.liked, 
                    likes: p.liked ? p.likes - 1 : p.likes + 1 
                };
            }
            return p;
        }));
    };

    const handleTogglePostBookmark = (id: number) => {
        setPosts(prev => prev.map(p => {
            if (p.id === id) {
                const newState = !p.bookmarked;
                if (newState) showToast("Riset disimpan ke bookmark");
                else showToast("Riset dihapus dari bookmark");
                return { ...p, bookmarked: newState };
            }
            return p;
        }));
        // Update currently active post view if open
        if (activePost && activePost.id === id) {
            setActivePost(prev => prev ? { ...prev, bookmarked: !prev.bookmarked } : null);
        }
    };

    const handleToggleVaultBookmark = (id: number) => {
        setVaultItems(prev => prev.map(v => {
            if (v.id === id) {
                const newState = !v.bookmarked;
                if (newState) showToast("Item Vault disimpan ke bookmark");
                else showToast("Item Vault dihapus dari bookmark");
                return { ...v, bookmarked: newState };
            }
            return v;
        }));
         if (activeVaultItem && activeVaultItem.id === id) {
            setActiveVaultItem(prev => prev ? { ...prev, bookmarked: !prev.bookmarked } : null);
        }
    };

    const handleAddComment = (text: string) => {
        if (!activeCommentsPost) return;
        setPosts(posts.map(p => {
            if (p.id === activeCommentsPost.id) {
                return { ...p, comments: [...p.comments, { user: "Anda", text }] };
            }
            return p;
        }));
        // Update the active post in modal context as well
        setActiveCommentsPost(prev => prev ? { ...prev, comments: [...prev.comments, { user: "Anda", text }] } : null);
    };

    const handleCreatePost = () => {
        showToast("Postingan berhasil dibuat!");
        setShowCreatePost(false);
    };

    const closeSearch = () => {
        setIsSearchActive(false);
        setSearchQuery('');
    };

    if (!isLoggedIn) {
        return <WelcomeScreen onLogin={handleLogin} />;
    }

    return (
        <div className="bg-slate-900 min-h-screen max-w-md mx-auto relative shadow-2xl overflow-hidden text-slate-200">
            
            {/* Top Bar */}
            <div className="fixed top-0 w-full max-w-md z-50 glass-header px-4 py-3 flex justify-between items-center transition-all duration-300">
                {isSearchActive ? (
                    <div className="flex w-full items-center gap-3 animate-fade-in">
                        <button onClick={closeSearch} className="text-slate-400 hover:text-white">
                            <ArrowLeft size={22} />
                        </button>
                        <div className="flex-1 relative">
                            <input 
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search research, tools..." 
                                className="w-full bg-slate-800/80 border border-slate-700 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">N</div>
                            <h1 className="font-bold text-lg tracking-tight">NEXUS</h1>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button 
                                onClick={() => setIsSearchActive(true)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Search size={20} />
                            </button>
                            <div className="bg-slate-800 px-2 py-1 rounded text-[10px] font-mono text-indigo-300 border border-slate-700">
                                {userPoints} KP
                            </div>
                            <Bell size={20} className="text-slate-400" />
                        </div>
                    </>
                )}
            </div>

            {/* Main Content */}
            <main className="min-h-screen pb-20">
                {isSearchActive ? (
                    <SearchView 
                        query={searchQuery}
                        posts={filteredPosts}
                        tools={filteredTools}
                        vaultItems={filteredVaultItems}
                        onPostClick={setActivePost}
                        onToolClick={setActiveTool}
                        onVaultItemClick={setActiveVaultItem}
                    />
                ) : (
                    <>
                        {activeTab === 'home' && (
                            <FeedView 
                                stories={STORIES} 
                                posts={posts} 
                                onStoryClick={setActiveStory}
                                onPostClick={setActivePost}
                                onLike={handleLike}
                                onBookmark={handleTogglePostBookmark}
                                onCommentClick={(id) => setActiveCommentsPost(posts.find(p => p.id === id) || null)}
                                onShare={() => showToast("Link disalin ke clipboard!")}
                            />
                        )}
                        {activeTab === 'tools' && (
                            <ToolsView tools={TOOLS} onToolClick={setActiveTool} />
                        )}
                        {activeTab === 'vault' && (
                            <VaultView 
                                items={vaultItems} 
                                onItemClick={setActiveVaultItem} 
                                onBookmark={handleToggleVaultBookmark}
                            />
                        )}
                        {activeTab === 'profile' && (
                            <ProfileView 
                                profile={userProfile} 
                                points={userPoints} 
                                onViewClick={setActiveProfileView}
                                onUpgradeClick={() => setShowUpgradeModal(true)}
                                onLogout={handleLogout}
                            />
                        )}
                    </>
                )}
            </main>

            {/* Floating Action Button (Create) - Hide when searching */}
            {!isSearchActive && (
                <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40">
                    <button 
                        onClick={() => setShowCreatePost(true)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white w-14 h-14 rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center transition-transform hover:scale-110"
                    >
                        <Plus size={28} />
                    </button>
                </div>
            )}

            {/* Bottom Navigation - Hide when searching */}
            {!isSearchActive && (
                <div className="fixed bottom-0 w-full max-w-md z-50 glass-nav pb-5 pt-3 px-6 flex justify-between items-center">
                    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-indigo-400' : 'text-slate-500'}`}>
                        <Home size={22} />
                        <span className="text-[10px]">Beranda</span>
                    </button>
                    <button onClick={() => setActiveTab('tools')} className={`flex flex-col items-center gap-1 ${activeTab === 'tools' ? 'text-indigo-400' : 'text-slate-500'}`}>
                        <Zap size={22} />
                        <span className="text-[10px]">Tools</span>
                    </button>
                    <div className="w-8"></div> {/* Spacer for FAB */}
                    <button onClick={() => setActiveTab('vault')} className={`flex flex-col items-center gap-1 ${activeTab === 'vault' ? 'text-indigo-400' : 'text-slate-500'}`}>
                        <Box size={22} />
                        <span className="text-[10px]">Vault</span>
                    </button>
                    <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-indigo-400' : 'text-slate-500'}`}>
                        <User size={22} />
                        <span className="text-[10px]">Profil</span>
                    </button>
                </div>
            )}

            {/* Overlays & Modals */}
            {activeStory && <StoryOverlay story={activeStory} onClose={() => setActiveStory(null)} />}
            
            {activePost && (
                <FullResearchOverlay 
                    post={activePost} 
                    onClose={() => setActivePost(null)} 
                    onShare={() => showToast("Shared!")} 
                    onBookmark={handleTogglePostBookmark}
                />
            )}
            
            {activeCommentsPost && <CommentModal post={activeCommentsPost} onClose={() => setActiveCommentsPost(null)} onAddComment={handleAddComment} />}
            {showCreatePost && <CreatePostModal onClose={() => setShowCreatePost(false)} onSubmit={handleCreatePost} />}
            {activeTool && <ToolInterface tool={activeTool} onClose={() => setActiveTool(null)} showToast={showToast} />}
            
            {activeVaultItem && (
                <VaultDetailOverlay 
                    item={activeVaultItem} 
                    onClose={() => setActiveVaultItem(null)} 
                    onBookmark={handleToggleVaultBookmark}
                />
            )}
            
            {activeProfileView && (
                <ProfileSubView 
                    view={activeProfileView} 
                    onClose={() => setActiveProfileView(null)} 
                    profile={userProfile} 
                    setProfile={setUserProfile} 
                    savedPosts={posts.filter(p => p.bookmarked)}
                    savedVaultItems={vaultItems.filter(v => v.bookmarked)}
                    onTogglePostBookmark={handleTogglePostBookmark}
                    onToggleVaultBookmark={handleToggleVaultBookmark}
                />
            )}
            
            {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} onSubscribe={() => { showToast("Subscribed!"); setShowUpgradeModal(false); }} />}
            
            {isLoggingOut && (
                <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <h2 className="text-white font-bold text-lg">Keluar...</h2>
                    <p className="text-slate-400 text-sm">Sampai jumpa lagi!</p>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold shadow-xl z-[80] animate-bounce whitespace-nowrap">
                    {toast}
                </div>
            )}

        </div>
    );
};

export default App;