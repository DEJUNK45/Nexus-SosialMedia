import { Post, Story, Tool, Community, VaultItem } from './types';

export const INITIAL_POSTS: Post[] = [
    {
        id: 1,
        user: "Dr. Sarah Miller",
        avatar: "https://picsum.photos/150/150?random=1",
        role: "AI Researcher",
        title: "Optimasi LLM untuk Edukasi",
        summary: "Penelitian terbaru menunjukkan metode prompting 'Chain-of-Thought' meningkatkan akurasi pengajaran matematika sebesar 40%.",
        fullContent: "Metode Chain-of-Thought (CoT) memungkinkan model bahasa besar untuk memecah masalah kompleks menjadi langkah-langkah perantara. Dalam studi ini, kami menerapkan CoT pada dataset soal matematika tingkat sekolah menengah. Hasilnya menunjukkan peningkatan akurasi dari 35% (zero-shot) menjadi 75% dengan CoT.",
        tags: ["AI", "Education", "Paper"],
        likes: 342,
        liked: false,
        bookmarked: false,
        comments: [
            {user: "Budi Santoso", text: "Apakah ini berlaku untuk model open source?"},
            {user: "Ani Wijaya", text: "Sangat inspiratif, terima kasih sharingnya dok!"}
        ],
        type: "research"
    },
    {
        id: 2,
        user: "Dev Komunitas",
        avatar: "https://picsum.photos/150/150?random=2",
        role: "Top Contributor",
        title: "Daftar Prompt Midjourney V6",
        summary: "Kumpulan 50+ prompt gaya fotorealistik yang sudah saya kurasi. Gratis untuk disalin.",
        fullContent: "Berikut adalah daftar prompt yang telah dikurasi untuk hasil fotorealistik. Gunakan parameter --v 6.0 --style raw untuk hasil terbaik. Link download PDF lengkap ada di bagian bawah.",
        tags: ["Generative Art", "Resource"],
        likes: 890,
        liked: true,
        bookmarked: false,
        comments: [],
        type: "resource"
    },
];

export const STORIES: Story[] = [
    { id: 1, user: "Daily Digest", color: "from-blue-500 to-purple-600", content: "Top News: OpenAI baru saja merilis fitur voice real-time untuk semua pengguna gratis!" },
    { id: 2, user: "New AI Tools", color: "from-green-500 to-emerald-600", content: "5 Tools baru minggu ini: 1. Devin (Coding), 2. Sora (Video), 3. Claude 3 (Writing)..." },
    { id: 3, user: "Events", color: "from-pink-500 to-rose-600", content: "Webinar Gratis: 'Membangun RAG Pipeline' besok malam jam 19.00 WIB." },
];

export const TOOLS: Tool[] = [
    { id: 1, name: "Nexus Assistant", desc: "Ask anything about AI research.", category: "Productivity", sponsored: true },
    { id: 2, name: "CodeWiz", desc: "Assistant debugging Python realtime.", category: "Dev Tools", sponsored: false },
    { id: 3, name: "VoiceClone AI", desc: "Kloning suara untuk konten kreator.", category: "Audio", sponsored: false },
    { id: 4, name: "LegalMinds", desc: "AI khusus membaca kontrak hukum.", category: "Legal", sponsored: false },
];

export const COMMUNITIES: Community[] = [
    { id: 1, name: "Skripsi Survivors", members: "12.5k", active: 342, topic: "Academic" },
    { id: 2, name: "Python Indonesia", members: "45k", active: 1200, topic: "Coding" },
    { id: 3, name: "Startup Founders", members: "8k", active: 150, topic: "Business" },
];

export const VAULT_ITEMS: VaultItem[] = [
    { id: 1, title: "Modern Data Stack", type: "E-Book", author: "O'Reilly (Open)", locked: false, size: "12 MB", license: "CC BY-SA", bookmarked: false },
    { id: 2, title: "Dataset E-Commerce Indo", type: "Dataset", author: "Kaggle User", locked: false, size: "450 MB", license: "MIT", bookmarked: false },
    { id: 3, title: "Template Tesis Latex", type: "Template", author: "Nexus Pro", locked: true, size: "2 MB", license: "Commercial", bookmarked: false }, 
];