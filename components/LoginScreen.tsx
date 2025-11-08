import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from '../constants/styles';

interface LoginScreenProps {
    signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
}

export default function LoginScreen({ signIn, signUp }: LoginScreenProps) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    const handleAuth = async () => {
        if (authLoading) return;

        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (isSignUp && !name) {
            Alert.alert('Error', 'Please enter your name');
            return;
        }

        setAuthLoading(true);

        if (isSignUp) {
            const result = await signUp(email, password, name);
            if (!result.success) {
                Alert.alert('Sign Up Failed', result.error);
            }
        } else {
            const result = await signIn(email, password);
            if (!result.success) {
                Alert.alert('Sign In Failed', result.error);
            }
        }

        setAuthLoading(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient colors={['#4ade80', '#22c55e', '#16a34a']} style={styles.loginContainer}>
                <StatusBar barStyle="light-content" />
                <ScrollView contentContainerStyle={styles.loginContent} keyboardShouldPersistTaps="handled">
                    <View style={styles.logoContainer}>
                        <LinearGradient colors={['#86efac', '#22c55e']} style={styles.logoCircle}>
                            <Text style={styles.logoEmoji}>🌿</Text>
                        </LinearGradient>
                        <Text style={styles.appTitle}>EcoRewards</Text>
                        <Text style={styles.appSubtitle}>Turn green actions into rewards</Text>
                    </View>

                    <View style={styles.loginBox}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1f2937' }}>
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </Text>

                        {isSignUp && (
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />

                        <TouchableOpacity
                            style={[styles.authButton, authLoading && { opacity: 0.6 }]}
                            onPress={handleAuth}
                            disabled={authLoading}
                            activeOpacity={0.7}
                        >
                            {authLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.authButtonText}>
                                    {isSignUp ? 'Sign Up' : 'Sign In'}
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                            <Text style={{ textAlign: 'center', marginTop: 20, color: '#6b7280' }}>
                                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                                <Text style={{ color: '#22c55e', fontWeight: 'bold' }}>
                                    {isSignUp ? 'Sign In' : 'Sign Up'}
                                </Text>
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}