import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { mockFriends, mockEvents } from '../utils/mockData';

export const SocialScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor: '#a855f7' }]}>
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        {mockEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.eventMeta}>
              <Text style={styles.eventDetail}>📅 {event.date}</Text>
              <Text style={styles.eventDetail}>📍 {event.location}</Text>
            </View>
            <View style={styles.eventFooter}>
              <Text style={styles.eventAttendees}>{event.attendees} attending</Text>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Friends Leaderboard</Text>
        {mockFriends.map((friend, index) => (
          <View key={friend.id} style={styles.friendCard}>
            <View style={styles.friendInfo}>
              <Text style={styles.friendRank}>#{index + 1}</Text>
              <Text style={styles.friendAvatar}>{friend.avatar}</Text>
              <View>
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.friendPoints}>{friend.points} points</Text>
              </View>
            </View>
            <Text style={styles.trophyEmoji}>🏆</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};