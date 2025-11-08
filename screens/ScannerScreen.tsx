import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/styles';
import { itemDatabase } from '../utils/itemDatabase';

export const ScannerScreen = ({ user, setUser, scannedItems, setScannedItems }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedItem, setScannedItem] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScan = async () => {
    setScanning(true);

    // Mock AI vision recognition
    setTimeout(() => {
      const items = Object.keys(itemDatabase);
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const itemData = itemDatabase[randomItem];

      const newItem = { ...itemData, id: Date.now(), timestamp: new Date() };
      setScannedItems([...scannedItems, newItem]);
      setUser({
        ...user,
        points: user.points + itemData.points,
        itemsRecycled: user.itemsRecycled + 1,
      });
      setScannedItem(newItem);
      setScanning(false);
    }, 2000);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleScan();
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  if (scannedItem) {
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>✅</Text>
          <Text style={styles.resultTitle}>Item Recognized!</Text>

          <View style={styles.resultInfoCard}>
            <Text style={styles.resultItemEmoji}>{scannedItem.emoji}</Text>
            <Text style={styles.resultItemName}>{scannedItem.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{scannedItem.category}</Text>
            </View>
          </View>

          <View style={styles.pointsContainer}>
            <Text style={styles.pointsEmoji}>🌱</Text>
            <Text style={styles.pointsText}>+{scannedItem.points} points</Text>
          </View>

          <Text style={styles.resultMessage}>
            Great job! You've earned {scannedItem.points} points for recycling.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setScannedItem(null)}
          >
            <Text style={styles.primaryButtonText}>Scan Another Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.scannerContainer}>
      {scanning ? (
        <View style={styles.scanningOverlay}>
          <ActivityIndicator size="large" color="#10b981" />
          <Text style={styles.scanningText}>Analyzing item...</Text>
        </View>
      ) : (
        <>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <Text style={styles.scanInstruction}>Position item in frame</Text>

          <View style={styles.scanButtons}>
            <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
              <Text style={styles.scanButtonText}>📸 Scan Item</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <Text style={styles.galleryButtonText}>🖼️ Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};