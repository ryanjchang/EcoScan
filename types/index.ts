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

export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
}

export type Screen = 'home' | 'leaderboard' | 'history' | 'rewards';