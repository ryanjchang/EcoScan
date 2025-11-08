import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../constants/styles';

interface LeaderboardPerson {
    name: string;
    points: number;
    avatar: string;
    isUser?: boolean;
}

interface LeaderboardScreenProps {
    user: any;
    points: number;
}

export default function LeaderboardScreen({ user, points }: LeaderboardScreenProps) {
    const leaderboard: LeaderboardPerson[] = [
        { name: 'Sarah Green', points: 450, avatar: '🌱' },
        { name: 'Mike Earth', points: 380, avatar: '🌍' },
        { name: user?.displayName || 'You', points: points, avatar: '⭐', isUser: true },
        { name: 'Emma Eco', points: 220, avatar: '♻️' },
        { name: 'John Leaf', points: 180, avatar: '🍃' },
    ].sort((a, b) => b.points - a.points);

    return (
        <View style={styles.leaderboardContent}>
            <Text style={styles.pageTitle}>🏆 Leaderboard</Text>
            {leaderboard.map((person, index) => (
                <View
                    key={index}
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
            ))}
        </View>
    );
}