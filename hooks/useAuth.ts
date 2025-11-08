import {
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    User
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUp = async (email: string, password: string, name: string) => {
        try {
            setLoading(true);
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update profile with name
            await updateProfile(result.user, {
                displayName: name,
            });

            setUser(result.user);
            return { success: true };
        } catch (error: any) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true);
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            return { success: true };
        } catch (error: any) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return {
        user,
        loading,
        signUp,
        signIn,
        signOut,
    };
}