export interface Comment {
    user: string;
    text: string;
}

export interface Post {
    id: number;
    user: string;
    avatar: string;
    role: string;
    title: string;
    summary: string;
    fullContent: string;
    tags: string[];
    likes: number;
    liked: boolean;
    bookmarked?: boolean;
    comments: Comment[];
    type: string;
}

export interface Story {
    id: number;
    user: string;
    color: string;
    content: string;
}

export interface Tool {
    id: number;
    name: string;
    desc: string;
    category: string;
    sponsored: boolean;
}

export interface Community {
    id: number;
    name: string;
    members: string;
    active: number;
    topic: string;
}

export interface VaultItem {
    id: number;
    title: string;
    type: string;
    author: string;
    locked: boolean;
    size: string;
    license: string;
    bookmarked?: boolean;
}

export interface UserProfile {
    name: string;
    bio: string;
    email: string;
}