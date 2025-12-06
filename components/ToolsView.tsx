import React, { useState } from 'react';
import { Zap, Crown } from 'lucide-react';
import { Tool } from '../types';

interface ToolsViewProps {
    tools: Tool[];
    onToolClick: (tool: Tool) => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({ tools, onToolClick }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // Extract unique categories from the tools list
    const categories = ['All', ...Array.from(new Set(tools.map(tool => tool.category)))];

    // Filter tools based on selection
    const filteredTools = selectedCategory === 'All' 
        ? tools 
        : tools.filter(tool => tool.category === selectedCategory);

    return (
        <div className="pb-24 pt-20 px-4 space-y-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-white">AI Toolbox</h2>
                <span className="text-xs text-indigo-400">Direktori Terkurasi</span>
            </div>
            
            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                            selectedCategory === category
                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            <div className="space-y-4 min-h-[200px]">
                {filteredTools.length === 0 ? (
                    <div className="text-center text-slate-500 py-10 animate-fade-in">
                        No tools found in this category.
                    </div>
                ) : (
                    filteredTools.map(tool => (
                        <div key={tool.id} className={`p-4 rounded-xl border ${tool.sponsored ? 'bg-indigo-900/20 border-indigo-500/30' : 'bg-slate-800/50 border-slate-700/50'} flex justify-between items-center animate-fade-in`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${tool.sponsored ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-700 text-slate-400'}`}>
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-slate-200">{tool.name}</h3>
                                        {tool.sponsored && <span className="text-[9px] border border-indigo-500 text-indigo-400 px-1 rounded uppercase">Ad</span>}
                                    </div>
                                    <p className="text-xs text-slate-400 line-clamp-1">{tool.desc}</p>
                                    <span className="text-[10px] text-slate-500 mt-1 block">{tool.category}</span>
                                </div>
                            </div>
                            <button onClick={() => onToolClick(tool)} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors">
                                Try
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-white text-lg">Master Prompt Engineering</h3>
                    <p className="text-indigo-100 text-xs mt-1 mb-3">Kursus video singkat + 500 template prompt premium.</p>
                    <button className="bg-white text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">Beli ($9.99)</button>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12">
                    <Crown size={120} />
                </div>
            </div>
        </div>
    );
};