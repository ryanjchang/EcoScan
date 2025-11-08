import React from 'react';
import { Text } from 'react-native';

export const HomeIcon = ({ focused }) => (
  <Text style={{ fontSize: 24 }}>{focused ? '🏠' : '🏡'}</Text>
);

export const ScanIcon = ({ focused }) => (
  <Text style={{ fontSize: 24 }}>{focused ? '📸' : '📷'}</Text>
);

export const SocialIcon = ({ focused }) => (
  <Text style={{ fontSize: 24 }}>{focused ? '👥' : '👤'}</Text>
);

export const ProfileIcon = ({ focused }) => (
  <Text style={{ fontSize: 24 }}>{focused ? '⭐' : '✨'}</Text>
);