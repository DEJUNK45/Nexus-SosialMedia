import React from 'react';
import { Share2, Heart, MessageSquare, Zap, Bookmark } from 'lucide-react';
import { Post, Story } from '../types';

interface FeedViewProps {
    stories: Story[];
    posts: Post[];
    onStoryClick: (story: Story) => void;
    onPostClick: (post: Post) => void;
    onLike: (postId: number) => void;
    onBookmark: (postId: number) => void;
    onCommentClick: (postId: number) => void;
    onShare: () => void;
}

export const FeedView: React.FC<FeedViewProps> = ({ 
    stories, 
    posts, 
    onStoryClick, 
    onPostClick, 
    onLike, 
    onBookmark,
    onCommentClick, 
    onShare 
}) => {
    return (
        <div className="pb-24 pt-20 px-4 space-y-6">
            {/* Stories */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {stories.map((story) => (
                    <div key={story.id} onClick={() => onStoryClick(story)} className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group">
                        <div className={`w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr ${story.color} group-hover:scale-105 transition-transform`}>
                            <div className="w-full h-full rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center overflow-hidden">
                                <Zap size={20} className="text-white" />
                            </div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{story.user}</span>
                    </div>
                ))}
            </div>

            {/* Posts */}
            {posts.map(post => (
                <div key={post.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full border border-slate-600" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-sm text-slate-200">{post.user}</h3>
                                </div>
                                <p className="text-xs text-slate-400">{post.role}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => onBookmark(post.id)} className="text-slate-400 hover:text-indigo-400 transition-colors">
                                <Bookmark size={18} fill={post.bookmarked ? "currentColor" : "none"} className={post.bookmarked ? "text-indigo-400" : ""} />
                            </button>
                            <button onClick={onShare} className="text-slate-400 hover:text-white">
                                <Share2 size={18}/>
                            </button>
                        </div>
                    </div>
                    
                    <div onClick={() => onPostClick(post)} className="cursor-pointer group">
                        <h2 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-indigo-400 transition-colors">
                            {post.title}
                        </h2>
                        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 mb-3 group-hover:border-slate-700 transition-colors">
                            <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">{post.summary}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-700/50 pt-3">
                        <div className="flex gap-6">
                            <button onClick={() => onLike(post.id)} className={`flex items-center gap-2 transition-colors ${post.liked ? 'text-pink-500' : 'text-slate-400 hover:text-pink-500'}`}>
                                <Heart size={18} fill={post.liked ? "currentColor" : "none"} /> 
                                <span className="text-xs">{post.likes}</span>
                            </button>
                            <button onClick={() => onCommentClick(post.id)} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                                <MessageSquare size={18} /> 
                                <span className="text-xs">{post.comments.length}</span>
                            </button>
                        </div>
                        <button onClick={() => onPostClick(post)} className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-full transition-colors">
                            Full Research
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};