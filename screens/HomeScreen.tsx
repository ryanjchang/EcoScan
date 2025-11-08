import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { mockPosts } from '../utils/mockData';

export const HomeScreen = ({ user }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome back, {user.name}!</Text>
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Your Impact</Text>
            <Text style={styles.statsEmoji}>🏆</Text>
          </View>
          <Text style={styles.statsPoints}>{user.points} points</Text>
          <Text style={styles.statsItems}>{user.itemsRecycled} items recycled</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {mockPosts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.postAvatar}>{post.avatar}</Text>
              <View style={styles.postInfo}>
                <Text style={styles.postUser}>{post.user}</Text>
                <Text style={styles.postAction}>{post.action}</Text>
                <View style={styles.postMeta}>
                  <Text style={styles.postPoints}>🌱 +{post.points} pts</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
              </View>
            </View>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.postActionButton}>
                <Text>❤️ {post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postActionButton}>
                <Text>💬</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postActionButton}>
                <Text>↗️</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
