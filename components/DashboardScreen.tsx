import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../constants/styles';
import { EcoAction } from '../types';

interface DashboardScreenProps {
    user: any;
    points: number;
    actions: EcoAction[];
    totalCO2Saved: number;
    onCameraOpen: () => void;
}

const ecoActionTypes = [
    { type: 'bottle', name: 'Reusable Bottle', points: 10, co2: 50, emoji: '♻️' },
    { type: 'recycle', name: 'Recycling', points: 15, co2: 100, emoji: '🗑️' },
    { type: 'bike', name: 'Bike Commute', points: 25, co2: 200, emoji: '🚴' },
    { type: 'compost', name: 'Composting', points: 20, co2: 150, emoji: '🌱' },
];

export default function DashboardScreen({
    user,
    points,
    actions,
    totalCO2Saved,
    onCameraOpen,
}: DashboardScreenProps) {
    return (
        <View style={styles.homeContent}>
            <LinearGradient colors={['#22c55e', '#16a34a', '#14532d']} style={styles.welcomeCard}>
                <Text style={styles.welcomeTitle}>Welcome, {user?.displayName?.split(' ')[0]}! 👋</Text>
                <Text style={styles.welcomeSubtitle}>Ready to make the planet greener?</Text>
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>📈</Text>
                        <Text style={styles.statValue}>{points}</Text>
                        <Text style={styles.statLabel}>Points</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>🌿</Text>
                        <Text style={styles.statValue}>{actions.length}</Text>
                        <Text style={styles.statLabel}>Actions</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.impactCard}>
                <Text style={styles.sectionTitle}>🌍 Your Impact</Text>
                <LinearGradient colors={['#dcfce7', '#bbf7d0']} style={styles.impactContent}>
                    <Text style={styles.impactValue}>{(totalCO2Saved / 1000).toFixed(2)}</Text>
                    <Text style={styles.impactLabel}>kg CO₂ saved</Text>
                    <Text style={styles.impactSubtext}>
                        Equal to {Math.floor(totalCO2Saved / 411)} km not driven by car
                    </Text>
                </LinearGradient>
            </View>

            <TouchableOpacity style={styles.cameraButton} onPress={onCameraOpen} activeOpacity={0.8}>
                <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.cameraButtonGradient}>
                    <Text style={styles.cameraIcon}>📸</Text>
                    <Text style={styles.cameraButtonText}>Capture Eco-Action</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={styles.actionsGrid}>
                <Text style={styles.sectionTitle}>Eco-Actions</Text>
                <View style={styles.grid}>
                    {ecoActionTypes.map((action) => (
                        <View key={action.type} style={styles.actionCard}>
                            <Text style={styles.actionEmoji}>{action.emoji}</Text>
                            <Text style={styles.actionName}>{action.name}</Text>
                            <Text style={styles.actionPoints}>+{action.points} pts</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}