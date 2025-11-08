export interface EcoAction {
    type: string;
    name: string;
    points: number;
    co2: number;
    emoji: string;
    id: number;
    timestamp: string;
    image?: string;
    aiReasoning?: string;
    confidence?: number;
}

export interface Quest{
    type: string;
    name: string;
    id: number;
    points: number;
    co2: number;
    progress: number;
    goal: number;
    completed?: boolean;

}

export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
}

export type Screen = 'home' | 'leaderboard' | 'history' | 'rewards' | 'quests';