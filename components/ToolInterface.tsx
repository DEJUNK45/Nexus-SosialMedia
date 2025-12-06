import React, { useState } from 'react';
import { Zap, X, Send, Loader2 } from 'lucide-react';
import { Tool } from '../types';
import { generateGeminiResponse } from '../services/geminiService';

interface ToolInterfaceProps {
    tool: Tool;
    onClose: () => void;
    showToast: (msg: string) => void;
}

export const ToolInterface: React.FC<ToolInterfaceProps> = ({ tool, onClose, showToast }) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!input.trim()) return;
        
        setIsLoading(true);
        setResponse(null); // Clear previous response
        
        try {
            // Construct a context-aware prompt based on the tool category
            let promptPrefix = "";
            if (tool.category === 'Dev Tools') {
                promptPrefix = "You are an expert coding assistant named CodeWiz. Help debug or write code for: ";
            } else if (tool.category === 'Legal') {
                promptPrefix = "You are a legal document assistant. Analyze or summarize the following legal context: ";
            } else {
                promptPrefix = "You are a helpful AI assistant called Nexus Assistant. Answer the following: ";
            }

            const result = await generateGeminiResponse(`${promptPrefix}${input}`);
            setResponse(result);
        } catch (error) {
            showToast("Failed to generate response.");
            setResponse("An error occurred while connecting to the AI.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-slate-900 animate-slide-up flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-slate-700 bg-slate-900">
                <h2 className="font-bold text-white flex items-center gap-2">
                    <Zap className="text-indigo-500" size={20} /> 
                    {tool.name}
                </h2>
                <button onClick={onClose}><X size={24} className="text-slate-400" /></button>
            </div>
            <div className="flex-1 p-4 flex flex-col bg-slate-900 overflow-hidden">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Zap size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                            <p className="text-xs text-slate-400">{tool.desc}</p>
                        </div>
                        
                        {/* Response Area */}
                        {response && (
                             <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 animate-fade-in">
                                <h4 className="text-xs font-bold text-indigo-400 mb-2 uppercase">Output</h4>
                                <div className="prose prose-invert prose-sm max-w-none text-slate-200 whitespace-pre-wrap">
                                    {response}
                                </div>
                             </div>
                        )}
                        
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-8">
                                <Loader2 className="animate-spin text-indigo-500 mb-2" size={32} />
                                <p className="text-xs text-slate-400 animate-pulse">Thinking...</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="relative">
                        <textarea 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={tool.category === 'Dev Tools' ? "Paste your code or error here..." : "Type your prompt here..."}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 min-h-[80px] resize-none"
                        />
                    </div>
                    <button 
                        onClick={handleGenerate} 
                        disabled={isLoading || !input.trim()}
                        className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-lg text-sm transition-colors ${isLoading || !input.trim() ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                    >
                        {isLoading ? 'Processing...' : 'Generate Result'}
                        {!isLoading && <Send size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
};