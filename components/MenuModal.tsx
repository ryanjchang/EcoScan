import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../constants/styles';

interface MenuModalProps {
    visible: boolean;
    user: any;
    onClose: () => void;
    onLogout: () => void;
}

export default function MenuModal({ visible, user, onClose, onLogout }: MenuModalProps) {
    return (
        <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
            <TouchableOpacity
                style={styles.menuOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                    <View style={styles.menuContent}>
                        <View style={styles.menuHeader}>
                            <Text style={styles.menuTitle}>Menu</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.menuClose}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuProfile}>
                            <Text style={styles.menuAvatar}>👤</Text>
                            <Text style={styles.menuName}>{user?.displayName}</Text>
                            <Text style={styles.menuEmail}>{user?.email}</Text>
                        </View>

                        <TouchableOpacity style={styles.logoutButton} onPress={onLogout} activeOpacity={0.8}>
                            <Text style={styles.logoutIcon}>🚪</Text>
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
}