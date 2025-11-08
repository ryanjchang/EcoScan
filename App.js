// Alternative App.js using react-native-tflite (Direct .tflite file support)
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Tflite from 'react-native-tflite';
import {styles} from './styles/styles.ts'
const CLASSES = [
  'garbage',
  'recycling',
  'bike',
  'compost',
  'reusable_bag',
  'solar_panel'
];

export default function App() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    loadModel();
    
    return () => {
      // Cleanup
      Tflite.close();
    };
  }, []);

  // Load the TFLite model
  const loadModel = async () => {
    try {
      setIsLoading(true);
      
      await Tflite.loadModel({
        model: 'sustainable_classifier.tflite', // Place in android/app/src/main/assets
        labels: 'labels.txt', // Optional: text file with one label per line
        numThreads: 4, // Number of threads to use
        isAsset: true, // Model is in assets folder
      });
      
      setIsModelLoaded(true);
      setIsLoading(false);
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      Alert.alert('Error', 'Failed to load model: ' + error.message);
      setIsLoading(false);
    }
  };

  // Run inference on image
  const classifyImage = async (imageUri) => {
    if (!isModelLoaded) {
      Alert.alert('Error', 'Model not loaded yet');
      return;
    }

    try {
      setIsLoading(true);
      setPredictions(null);

      // Run inference
      const results = await Tflite.runModelOnImage({
        path: imageUri,
        imageMean: 127.5, // For MobileNetV2 preprocessing
        imageStd: 127.5,  // For MobileNetV2 preprocessing
        numResults: 6,    // Return top 6 classes
        threshold: 0.05,  // Minimum confidence threshold (5%)
      });

      // Format results
      const formattedResults = results.map((result, index) => ({
        label: CLASSES[result.index] || `Class ${result.index}`,
        confidence: result.confidence * 100,
      }));

      setPredictions(formattedResults);
      setIsLoading(false);
    } catch (error) {
      console.error('Error during classification:', error);
      Alert.alert('Error', 'Failed to classify image: ' + error.message);
      setIsLoading(false);
    }
  };

  // Handle image picker
  const pickImage = (source) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };

    const launchFunction = source === 'camera' ? launchCamera : launchImageLibrary;

    launchFunction(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.errorCode) {
        console.log('Error:', response.errorMessage);
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        setImage(imageUri);
        classifyImage(imageUri);
      }
    });
  };

  // Get sustainability tip and emoji
  const getSustainabilityInfo = (label) => {
    const info = {
      garbage: {
        tip: 'Consider if this can be recycled or composted instead',
        emoji: '♻️',
        color: '#FF6B6B'
      },
      recycling: {
        tip: 'Great job! Make sure items are clean and dry',
        emoji: '♻️',
        color: '#4CAF50'
      },
      bike: {
        tip: 'Cycling reduces carbon emissions and improves health',
        emoji: '🚴',
        color: '#2196F3'
      },
      compost: {
        tip: 'Composting reduces waste and creates nutrient-rich soil',
        emoji: '🌱',
        color: '#8BC34A'
      },
      reusable_bag: {
        tip: 'Reusable bags help eliminate single-use plastics',
        emoji: '🛍️',
        color: '#FF9800'
      },
      solar_panel: {
        tip: 'Solar energy is clean and renewable',
        emoji: '☀️',
        color: '#FFC107'
      },
    };
    
    return info[label] || {
      tip: 'Keep up the sustainable practices!',
      emoji: '🌍',
      color: '#4CAF50'
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>♻️ Sustainable Actions</Text>
          <Text style={styles.subtitle}>AI-Powered Eco Classifier</Text>
        </View>

        {/* Image Display */}
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>📸</Text>
              <Text style={styles.placeholderSubtext}>
                Take or select a photo
              </Text>
            </View>
          )}
        </View>

        {/* Loading Indicator */}
        {isLoading && !isModelLoaded && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Loading model...</Text>
          </View>
        )}

        {isLoading && isModelLoaded && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Analyzing image...</Text>
          </View>
        )}

        {/* Predictions */}
        {predictions && predictions.length > 0 && (
          <View style={styles.resultsContainer}>
            <View style={styles.topPrediction}>
              {(() => {
                const topPred = predictions[0];
                const info = getSustainabilityInfo(topPred.label);
                return (
                  <>
                    <Text style={styles.topEmoji}>{info.emoji}</Text>
                    <Text style={[styles.topLabel, { color: info.color }]}>
                      {topPred.label.replace('_', ' ').toUpperCase()}
                    </Text>
                    <Text style={styles.topConfidence}>
                      {topPred.confidence.toFixed(1)}% confident
                    </Text>
                    <View style={styles.tipContainer}>
                      <Text style={styles.tipText}>{info.tip}</Text>
                    </View>
                  </>
                );
              })()}
            </View>

            {predictions.length > 1 && (
              <View style={styles.otherPredictions}>
                <Text style={styles.otherTitle}>Other possibilities:</Text>
                {predictions.slice(1).map((prediction, index) => (
                  <View key={index} style={styles.predictionRow}>
                    <Text style={styles.predictionLabel}>
                      {prediction.label.replace('_', ' ')}
                    </Text>
                    <View style={styles.confidenceBar}>
                      <View
                        style={[
                          styles.confidenceFill,
                          { width: `${prediction.confidence}%` },
                        ]}
                      />
                      <Text style={styles.confidenceText}>
                        {prediction.confidence.toFixed(0)}%
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.cameraButton,
              !isModelLoaded && styles.buttonDisabled
            ]}
            onPress={() => pickImage('camera')}
            disabled={!isModelLoaded}
          >
            <Text style={styles.buttonIcon}>📷</Text>
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.galleryButton,
              !isModelLoaded && styles.buttonDisabled
            ]}
            onPress={() => pickImage('gallery')}
            disabled={!isModelLoaded}
          >
            <Text style={styles.buttonIcon}>🖼️</Text>
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* Model Status */}
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusIndicator,
            isModelLoaded ? styles.statusReady : styles.statusLoading
          ]} />
          <Text style={styles.statusText}>
            {!isModelLoaded
              ? 'Loading AI model...'
              : 'Ready to classify images'}
          </Text>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Supported Categories:</Text>
          <View style={styles.categoriesGrid}>
            {CLASSES.map((label, index) => (
              <View key={index} style={styles.categoryChip}>
                <Text style={styles.categoryText}>
                  {label.replace('_', ' ')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
