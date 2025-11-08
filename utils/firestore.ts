import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserData {
    points: number;
    actions: any[];
    createdAt: string;
    lastUpdated: string;
    displayName?: string;
    email?: string;
    avatar?: string;
}

export const getUserData = async (userId: string, userProfile?: { displayName?: string; email?: string }) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return { success: true, data: userSnap.data() as UserData };
        } else {
            // Create initial user document if it doesn't exist
            const initialData: UserData = {
                points: 0,
                actions: [],
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                displayName: userProfile?.displayName || 'Anonymous',
                email: userProfile?.email || '',
                avatar: '⭐',
            };
            await setDoc(userRef, initialData);
            return { success: true, data: initialData };
        }
    } catch (error: any) {
        console.error('Error getting user data:', error);

        if (error.code === 'unavailable' || error.message?.includes('offline')) {
            console.log('📱 Working offline - using local state');
            return {
                success: true,
                data: {
                    points: 0,
                    actions: [],
                    createdAt: new Date().toISOString(),
                    lastUpdated: new Date().toISOString(),
                    displayName: userProfile?.displayName || 'Anonymous',
                    email: userProfile?.email || '',
                    avatar: '⭐',
                },
                offline: true
            };
        }

        return {
            success: false,
            error: error.message,
            data: {
                points: 0,
                actions: [],
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                displayName: userProfile?.displayName || 'Anonymous',
                email: userProfile?.email || '',
                avatar: '⭐',
            }
        };
    }
};

export const addEcoAction = async (userId: string, action: any, userProfile?: { displayName?: string; email?: string }) => {
    try {
        const userRef = doc(db, 'users', userId);

        // First check if document exists
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // Document exists, update it
            await updateDoc(userRef, {
                actions: arrayUnion(action),
                points: increment(action.points),
                lastUpdated: new Date().toISOString(),
            });
            console.log('✅ Action saved to Firestore');
        } else {
            // Document doesn't exist, create it WITH user profile
            await setDoc(userRef, {
                points: action.points,
                actions: [action],
                displayName: userProfile?.displayName || 'Anonymous',
                email: userProfile?.email || '',
                avatar: '⭐',
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
            });
            console.log('✅ User document created with first action');
        }

        return { success: true };
    } catch (error: any) {
        console.error('Error adding eco action:', error);

        if (error.code === 'unavailable' || error.message?.includes('offline')) {
            console.log('📱 Offline - action saved locally');
            return { success: true, offline: true };
        }

        return { success: false, error: error.message };
    }
};

// Get top users for leaderboard
export const getLeaderboard = async (limitCount: number = 10) => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('points', 'desc'), limit(limitCount));

        const querySnapshot = await getDocs(q);
        const leaderboard: any[] = [];

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            leaderboard.push({
                userId: docSnap.id,
                name: data.displayName || data.email?.split('@')[0],
                points: data.points || 0,
                avatar: data.avatar || '🌱',
            });
        });

        return { success: true, data: leaderboard };
    } catch (error: any) {
        console.error('Error fetching leaderboard:', error);
        return { success: false, error: error.message, data: [] };
    }
};

export const updateUserProfile = async (
    userId: string,
    displayName: string,
    email: string,
    points?: number  // Optional points parameter
) => {
    try {
        const userRef = doc(db, 'users', userId);

        const updateData: any = {
            displayName,
            email,
            lastUpdated: new Date().toISOString(),
        };

        // Only update points if provided
        if (points !== undefined) {
            updateData.points = points;
        }

        await updateDoc(userRef, updateData);

        console.log('✅ User profile updated');
        return { success: true };
    } catch (error: any) {
        console.error('Error updating profile:', error);
        return { success: false, error: error.message };
    }
};