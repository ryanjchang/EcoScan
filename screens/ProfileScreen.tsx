import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles/styles';

export const ProfileScreen = ({ user, scannedItems }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#6366f1' }]}>
        <Text style={styles.profileAvatar}>{user.avatar}</Text>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user.points}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user.itemsRecycled}</Text>
            <Text style={styles.statLabel}>Items Recycled</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Scans</Text>
        {scannedItems.length === 0 ? (
          <Text style={styles.emptyText}>
            No items scanned yet. Start scanning to track your impact!
          </Text>
        ) : (
          scannedItems
            .slice(-5)
            .reverse()
            .map((item) => (
              <View key={item.id} style={styles.scanHistoryCard}>
                <View>
                  <Text style={styles.scanHistoryName}>
                    {item.emoji} {item.name}
                  </Text>
                  <Text style={styles.scanHistoryCategory}>{item.category}</Text>
                </View>
                <Text style={styles.scanHistoryPoints}>+{item.points} pts</Text>
              </View>
            ))
        )}
      </View>
    </ScrollView>
  );
};