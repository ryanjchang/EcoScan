import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../constants/styles';

interface RewardsScreenProps {
    points: number;
    onRedeem: (rewardId: string, cost: number) => void;
}

interface Reward {
    id: string;
    title: string;
    description: string;
    pointsCost: number;
    emoji: string;
    category: 'impact' | 'partner';
}

const REWARDS: Reward[] = [
    {
        id: 'tree-1',
        title: 'Plant 1 Tree',
        description: 'Partner with One Tree Planted',
        pointsCost: 100,
        emoji: '🌳',
        category: 'impact'
    },
    {
        id: 'ocean-cleanup',
        title: 'Remove 1lb Ocean Plastic',
        description: 'The Ocean Cleanup Project',
        pointsCost: 150,
        emoji: '🌊',
        category: 'impact'
    },
    {
        id: 'carbon-offset',
        title: 'Offset 10kg CO₂',
        description: 'Verified carbon credits',
        pointsCost: 200,
        emoji: '☁️',
        category: 'impact'
    },
    {
        id: 'bee-conservation',
        title: 'Support Bee Conservation',
        description: 'The Bee Conservancy',
        pointsCost: 120,
        emoji: '🐝',
        category: 'impact'
    },
    {
        id: 'coffee',
        title: '$5 Coffee Gift Card',
        description: 'Starbucks or local cafe',
        pointsCost: 250,
        emoji: '☕',
        category: 'partner'
    },
    {
        id: 'patagonia',
        title: '10% Off Patagonia',
        description: 'Sustainable clothing discount',
        pointsCost: 300,
        emoji: '🧥',
        category: 'partner'
    },
    {
        id: 'whole-foods',
        title: '$10 Whole Foods Credit',
        description: 'Organic groceries',
        pointsCost: 400,
        emoji: '🥬',
        category: 'partner'
    },
];

export default function RewardsScreen({ points, onRedeem }: RewardsScreenProps) {
    const handleRedeem = (reward: Reward) => {
        console.log('🔘 Redeem button clicked for:', reward.title, 'Cost:', reward.pointsCost, 'User points:', points);

        if (points < reward.pointsCost) {
            Alert.alert(
                'Not Enough Points',
                `You need ${reward.pointsCost - points} more points to redeem this reward.\n\nKeep taking eco-actions to earn more!`,
                [{ text: 'OK' }]
            );
            return;
        }

        Alert.alert(
            'Confirm Redemption',
            `Redeem "${reward.title}" for ${reward.pointsCost} points?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Redeem',
                    onPress: () => {
                        console.log('✅ User confirmed redemption, calling onRedeem...');

                        // Deduct points
                        onRedeem(reward.id, reward.pointsCost);

                        // Success message based on category
                        if (reward.category === 'impact') {
                            Alert.alert(
                                'Real Impact Made! 🌍',
                                `Your ${reward.pointsCost} points are making a difference!\n\n${reward.title} - Partnership launching soon.`,
                                [{ text: 'Awesome!' }]
                            );
                        } else {
                            Alert.alert(
                                'Reward Redeemed! 🎁',
                                `${reward.title} has been redeemed!\n\nYou'll receive your reward code via email within 24 hours.`,
                                [{ text: 'Got it!' }]
                            );
                        }
                    },
                    style: 'default'
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.rewardsContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.pageTitle}>🎁 Rewards Shop</Text>

            <View style={styles.balanceCard}>
                <Text style={{ fontSize: 16, color: '#6b7280', marginBottom: 8 }}>Your Balance</Text>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#16a34a' }}>{points} points</Text>
                <Text style={{ fontSize: 14, color: '#9ca3af', marginTop: 4 }}>
                    Earn more by capturing eco-actions!
                </Text>
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 }}>
                    🌍 Real-World Impact
                </Text>
                {REWARDS.filter(r => r.category === 'impact').map((reward) => {
                    const canAfford = points >= reward.pointsCost;
                    return (
                        <View key={reward.id} style={[styles.rewardCard, !canAfford && { opacity: 0.6 }]}>
                            <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.rewardTitle}>{reward.title}</Text>
                                <Text style={styles.rewardDescription}>{reward.description}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                    <Text style={styles.rewardCost}>{reward.pointsCost} pts</Text>
                                    <TouchableOpacity
                                        style={[styles.redeemButton, !canAfford && { backgroundColor: '#d1d5db' }]}
                                        onPress={() => handleRedeem(reward)}
                                    >
                                        <Text style={styles.redeemButtonText}>
                                            {canAfford ? 'Redeem' : 'Locked'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>

            <View style={{ marginBottom: 40 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 }}>
                    🎫 Partner Rewards
                </Text>
                {REWARDS.filter(r => r.category === 'partner').map((reward) => {
                    const canAfford = points >= reward.pointsCost;
                    return (
                        <View key={reward.id} style={[styles.rewardCard, !canAfford && { opacity: 0.6 }]}>
                            <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.rewardTitle}>{reward.title}</Text>
                                <Text style={styles.rewardDescription}>{reward.description}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                    <Text style={styles.rewardCost}>{reward.pointsCost} pts</Text>
                                    <TouchableOpacity
                                        style={[styles.redeemButton, !canAfford && { backgroundColor: '#d1d5db' }]}
                                        onPress={() => handleRedeem(reward)}
                                    >
                                        <Text style={styles.redeemButtonText}>
                                            {canAfford ? 'Redeem' : 'Locked'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>

            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                <Text style={{ textAlign: 'center', color: '#9ca3af', fontSize: 14, paddingHorizontal: 20 }}>
                    💚 More rewards coming soon!{'\n'}
                    Keep earning points through verified eco-actions.
                </Text>
            </View>
        </ScrollView>
    );
}