import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from '../constants/styles';
import { getLeaderboard } from '../utils/firestore';

interface LeaderboardPerson {
    name: string;
    points: number;
    avatar: string;
    isUser?: boolean;
    userId: string;
}

interface LeaderboardScreenProps {
    user: any;
    points: number;
}

export default function LeaderboardScreen({ user, points }: LeaderboardScreenProps) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardPerson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLeaderboard();
    }, []);

    const loadLeaderboard = async () => {
        setLoading(true);
        const result = await getLeaderboard(10);

        if (result.success && result.data) {
            // Mark current user in the leaderboard
            const leaderboardData = result.data.map((person: any) => ({
                ...person,
                isUser: person.userId === user?.uid,
            }));
            setLeaderboard(leaderboardData);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={styles.leaderboardContent}>
                <Text style={styles.pageTitle}>🏆 Leaderboard</Text>
                <ActivityIndicator size="large" color="#22c55e" style={{ marginTop: 20 }} />
            </View>
        );
    }

    return (
        <View style={styles.leaderboardContent}>
            <Text style={styles.pageTitle}>🏆 Leaderboard</Text>
            {leaderboard.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#6b7280' }}>
                    No users yet. Be the first!
                </Text>
            ) : (
                leaderboard.map((person, index) => (
                    <View
                        key={person.userId}
                        style={[styles.leaderboardRow, person.isUser && styles.leaderboardRowUser]}
                    >
                        <Text style={styles.leaderboardRank}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                        </Text>
                        <Text style={styles.leaderboardAvatar}>{person.avatar}</Text>
                        <View style={styles.leaderboardInfo}>
                            <Text style={styles.leaderboardName}>{person.name}</Text>
                            <Text style={styles.leaderboardPoints}>{person.points} points</Text>
                        </View>
                        {person.isUser && <Text style={styles.leaderboardStar}>⭐</Text>}
                    </View>
                ))
            )}
        </View>
    );
}