import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Text, View } from 'react-native';
import { styles } from '../constants/styles';
import { EcoAction } from '../types';

interface RewardModalProps {
    visible: boolean;
    action: EcoAction | null;
}

export default function RewardModal({ visible, action }: RewardModalProps) {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }).start();
        } else {
            scaleAnim.setValue(0);
        }
    }, [visible]);

    if (!action) return null;

    return (
        <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
            <View style={styles.rewardOverlay}>
                <Animated.View style={[styles.rewardCard, { transform: [{ scale: scaleAnim }] }]}>
                    <Text style={styles.rewardEmoji}>🎉</Text>
                    <Text style={styles.rewardTitle}>Awesome!</Text>
                    <Text style={styles.rewardSubtitle}>Action verified successfully</Text>
                    <LinearGradient colors={['#dcfce7', '#bbf7d0']} style={styles.rewardPoints}>
                        <Text style={styles.rewardPointsValue}>+{action.points}</Text>
                        <Text style={styles.rewardPointsLabel}>points earned</Text>
                        <View style={styles.rewardCO2}>
                            <Text style={styles.rewardCO2Text}>💚 Saved {action.co2}g CO₂</Text>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </View>
        </Modal>
    );
}