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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  placeholder: {
    width: 300,
    height: 300,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  placeholderText: {
    fontSize: 60,
    marginBottom: 10,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#999',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 25,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  topPrediction: {
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  topEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  topLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  topConfidence: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  tipContainer: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  otherPredictions: {
    marginTop: 20,
  },
  otherTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  predictionRow: {
    marginBottom: 12,
  },
  predictionLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  confidenceBar: {
    height: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  confidenceText: {
    position: 'absolute',
    right: 10,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
  },
  galleryButton: {
    backgroundColor: '#2196F3',
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusReady: {
    backgroundColor: '#4CAF50',
  },
  statusLoading: {
    backgroundColor: '#FFC107',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 6,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#2E7D32',
    textTransform: 'capitalize',
  },
});