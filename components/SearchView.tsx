import React from 'react';
import { Post, Tool, VaultItem } from '../types';
import { FileText, Zap, Box } from 'lucide-react';

interface SearchViewProps {
    query: string;
    posts: Post[];
    tools: Tool[];
    vaultItems: VaultItem[];
    onPostClick: (post: Post) => void;
    onToolClick: (tool: Tool) => void;
    onVaultItemClick: (item: VaultItem) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ 
    query, posts, tools, vaultItems, 
    onPostClick, onToolClick, onVaultItemClick 
}) => {
    if (!query) {
        return (
            <div className="pt-24 px-6 text-center text-slate-500 animate-fade-in">
                <p>Type to search across research, tools, and vault items...</p>
            </div>
        );
    }

    const hasResults = posts.length > 0 || tools.length > 0 || vaultItems.length > 0;

    if (!hasResults) {
        return (
            <div className="pt-24 px-6 text-center text-slate-500 animate-fade-in">
                <p>No results found for "{query}"</p>
            </div>
        );
    }

    return (
        <div className="pb-24 pt-20 px-4 space-y-6 animate-fade-in">
            {posts.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Research</h3>
                    {posts.map(post => (
                        <div key={post.id} onClick={() => onPostClick(post)} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex gap-3 cursor-pointer hover:bg-slate-800 transition-colors">
                            <div className="mt-1 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                                <FileText size={14} className="text-indigo-400"/>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200 text-sm line-clamp-1">{post.title}</h4>
                                <p className="text-xs text-slate-400 line-clamp-2">{post.summary}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tools.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tools</h3>
                    {tools.map(tool => (
                        <div key={tool.id} onClick={() => onToolClick(tool)} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex gap-3 cursor-pointer hover:bg-slate-800 transition-colors">
                             <div className="mt-1 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                                <Zap size={14} className="text-yellow-400"/>
                             </div>
                            <div>
                                <h4 className="font-bold text-slate-200 text-sm">{tool.name}</h4>
                                <p className="text-xs text-slate-400">{tool.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {vaultItems.length > 0 && (
                 <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vault</h3>
                    {vaultItems.map(item => (
                        <div key={item.id} onClick={() => onVaultItemClick(item)} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex gap-3 cursor-pointer hover:bg-slate-800 transition-colors">
                             <div className="mt-1 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                <Box size={14} className="text-green-400"/>
                             </div>
                            <div>
                                <h4 className="font-bold text-slate-200 text-sm">{item.title}</h4>
                                <p className="text-xs text-slate-400">{item.type} • {item.size}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};