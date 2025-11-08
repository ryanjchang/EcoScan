import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../constants/styles';
import { EcoAction } from '../types';

interface HistoryScreenProps {
    actions: EcoAction[];
}

export default function HistoryScreen({ actions }: HistoryScreenProps) {
    return (
        <View style={styles.historyContent}>
            <Text style={styles.pageTitle}>Your Journey</Text>
            {actions.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyEmoji}>✨</Text>
                    <Text style={styles.emptyText}>Start capturing eco-actions!</Text>
                </View>
            ) : (
                actions.map((action) => (
                    <View key={action.id} style={styles.historyCard}>
                        {action.image && (
                            <Image source={{ uri: action.image }} style={styles.historyImage} resizeMode="cover" />
                        )}
                        <View style={styles.historyInfo}>
                            <Text style={styles.historyName}>✅ {action.name}</Text>
                            <Text style={styles.historyDate}>
                                {new Date(action.timestamp).toLocaleDateString()} at {new Date(action.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                            <View style={styles.historyBadges}>
                                <View style={styles.historyBadgeGreen}>
                                    <Text style={styles.historyBadgeText}>+{action.points} pts</Text>
                                </View>
                                <View style={styles.historyBadgeBlue}>
                                    <Text style={styles.historyBadgeText}>{action.co2}g CO₂</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            )}
        </View>
    );
}