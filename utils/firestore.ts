import {
    arrayUnion,
    doc,
    getDoc,
    increment,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Initialize user data in Firestore
export const createUserProfile = async (userId: string, email: string, name: string) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
            email,
            name,
            points: 0,
            actions: [],
            createdAt: new Date().toISOString(),
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating user profile:', error);
        return { success: false, error };
    }
};

// Get user data from Firestore
export const getUserData = async (userId: string) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return { success: true, data: userSnap.data() };
        } else {
            return { success: false, error: 'User not found' };
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        return { success: false, error };
    }
};

// Add a new eco-action
export const addEcoAction = async (userId: string, action: any) => {
    try {
        const userRef = doc(db, 'users', userId);

        // Add action and increment points
        await updateDoc(userRef, {
            actions: arrayUnion(action),
            points: increment(action.points),
        });

        return { success: true };
    } catch (error) {
        console.error('Error adding action:', error);
        return { success: false, error };
    }
};

// Update user points
export const updateUserPoints = async (userId: string, pointsToAdd: number) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            points: increment(pointsToAdd),
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating points:', error);
        return { success: false, error };
    }
};