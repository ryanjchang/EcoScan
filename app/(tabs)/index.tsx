import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../constants/styles';
import { useAuth } from '../../hooks/useAuth';
import { getActionEmoji, getActionName, getCO2Savings, getPointsForAction, verifyEcoAction } from '../../utils/aiVerification';
import { addEcoAction, getUserData } from '../../utils/firestore';

export default function HomeScreen() {
  // Auth state from Firebase
  const { user, loading, signIn, signUp, signOut } = useAuth();

  // Login form state
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // App state
  const [points, setPoints] = useState(0);
  const [actions, setActions] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showReward, setShowReward] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [verifying, setVerifying] = useState(false);

  const cameraRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const ecoActionTypes = [
    { type: 'bottle', name: 'Reusable Bottle', points: 10, co2: 50, emoji: '♻️' },
    { type: 'recycle', name: 'Recycling', points: 15, co2: 100, emoji: '🗑️' },
    { type: 'bike', name: 'Bike Commute', points: 25, co2: 200, emoji: '🚴' },
    { type: 'compost', name: 'Composting', points: 20, co2: 150, emoji: '🌱' },
  ];

  const leaderboard = [
    { name: 'Sarah Green', points: 450, avatar: '🌱' },
    { name: 'Mike Earth', points: 380, avatar: '🌍' },
    { name: user?.displayName || 'You', points: points, avatar: '⭐', isUser: true },
    { name: 'Emma Eco', points: 220, avatar: '♻️' },
    { name: 'John Leaf', points: 180, avatar: '🍃' },
  ].sort((a, b) => b.points - a.points);

  const totalCO2Saved = actions.reduce((sum, action) => sum + action.co2, 0);

  // Load user data when user logs in
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    const result = await getUserData(user.uid);
    if (result.success && result.data) {
      setPoints(result.data.points || 0);
      setActions(result.data.actions || []);
    }
  };

  // Reward animation effect
  useEffect(() => {
    if (showReward) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowReward(false));
      }, 3000);
    }
  }, [showReward]);

  // Auth handlers
  const handleAuth = async () => {
    if (authLoading) return;

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isSignUp && !name) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setAuthLoading(true);

    if (isSignUp) {
      const result = await signUp(email, password, name);
      if (!result.success) {
        Alert.alert('Sign Up Failed', result.error);
      }
    } else {
      const result = await signIn(email, password);
      if (!result.success) {
        Alert.alert('Sign In Failed', result.error);
      }
    }

    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    setPoints(0);
    setActions([]);
    setShowMenu(false);
  };

  // Camera handlers
  const handleCameraOpen = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission Required', 'Camera access is needed to capture eco-actions');
        return;
      }
    }
    setShowCamera(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedPhoto(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const verifyAction = async () => {
    if (!capturedPhoto) return;

    setVerifying(true);

    try {
      // Show that AI is processing
      console.log('🤖 Calling GPT-4 Vision API...');

      // Call GPT-4 Vision API to verify the action
      const verification = await verifyEcoAction(capturedPhoto);

      console.log('✅ AI Result:', verification);

      // Check if action is eco-friendly
      if (!verification.isEcoFriendly) {
        Alert.alert(
          'Not an Eco-Action ❌',
          verification.reasoning || 'This doesn\'t appear to be an eco-friendly action. Please try capturing a sustainable activity!',
          [{ text: 'Try Again', onPress: () => { setVerifying(false); retakePhoto(); } }]
        );
        setVerifying(false);
        return;
      }

      // If confidence is too low, ask for confirmation
      if (verification.confidence < 60) {
        Alert.alert(
          'Low Confidence ⚠️',
          `AI is ${verification.confidence}% confident this is eco-friendly.\n\n${verification.reasoning}\n\nDo you want to proceed?`,
          [
            { text: 'Try Again', onPress: () => { setVerifying(false); retakePhoto(); }, style: 'cancel' },
            { text: 'Yes, Proceed', onPress: () => saveVerifiedAction(verification) }
          ]
        );
        setVerifying(false);
        return;
      }

      // Action verified! Save it
      await saveVerifiedAction(verification);

    } catch (error: any) {
      console.error('❌ Verification error:', error);
      setVerifying(false);

      Alert.alert(
        'Verification Failed',
        `Error: ${error.message}\n\nMake sure your OpenAI API key is set correctly in utils/aiVerification.ts`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Try Again', onPress: verifyAction }
        ]
      );
    }
  };

  const saveVerifiedAction = async (verification: any) => {
    const points = getPointsForAction(verification.actionType);
    const co2 = getCO2Savings(verification.actionType);
    const emoji = getActionEmoji(verification.actionType);
    const name = getActionName(verification.actionType);

    const newAction = {
      type: verification.actionType,
      name: name,
      points: points,
      co2: co2,
      emoji: emoji,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      image: capturedPhoto,
      aiReasoning: verification.reasoning,
      confidence: verification.confidence,
    };

    // Update local state immediately
    setActions([newAction, ...actions]);
    setPoints(points + newAction.points);
    setLastAction(newAction);
    setShowCamera(false);
    setCapturedPhoto(null);
    setVerifying(false);
    setShowReward(true);

    // Save to Firestore
    if (user) {
      await addEcoAction(user.uid, newAction);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={{ marginTop: 20, color: '#6b7280' }}>Loading...</Text>
      </View>
    );
  }

  // Login screen
  if (!user) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <LinearGradient colors={['#4ade80', '#22c55e', '#16a34a']} style={styles.loginContainer}>
          <StatusBar barStyle="light-content" />
          <ScrollView contentContainerStyle={styles.loginContent} keyboardShouldPersistTaps="handled">
            <View style={styles.logoContainer}>
              <LinearGradient colors={['#86efac', '#22c55e']} style={styles.logoCircle}>
                <Text style={styles.logoEmoji}>🌿</Text>
              </LinearGradient>
              <Text style={styles.appTitle}>EcoRewards</Text>
              <Text style={styles.appSubtitle}>Turn green actions into rewards</Text>
            </View>

            <View style={styles.loginBox}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#1f2937' }}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </Text>

              {isSignUp && (
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={[styles.authButton, authLoading && { opacity: 0.6 }]}
                onPress={handleAuth}
                disabled={authLoading}
                activeOpacity={0.7}
              >
                {authLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.authButtonText}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#6b7280' }}>
                  {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                  <Text style={{ color: '#22c55e', fontWeight: 'bold' }}>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </Text>
                </Text>
              </TouchableOpacity>

              <View style={[styles.featuresContainer, { marginTop: 30 }]}>
                <View style={styles.featureCard}>
                  <Text style={styles.featureEmoji}>📸</Text>
                  <Text style={styles.featureText}>Capture</Text>
                </View>
                <View style={styles.featureCard}>
                  <Text style={styles.featureEmoji}>🤖</Text>
                  <Text style={styles.featureText}>AI Verify</Text>
                </View>
                <View style={styles.featureCard}>
                  <Text style={styles.featureEmoji}>🏆</Text>
                  <Text style={styles.featureText}>Earn</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }

  // Main app screens (after login)
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <View style={styles.navLeft}>
          <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.navLogo}>
            <Text style={styles.navLogoText}>🌿</Text>
          </LinearGradient>
          <Text style={styles.navTitle}>EcoRewards</Text>
        </View>
        <View style={styles.navRight}>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{points} pts</Text>
          </View>
          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={{ paddingRight: 20 }}>
        <TouchableOpacity
          style={[styles.tab, currentScreen === 'home' && styles.tabActive]}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={[styles.tabText, currentScreen === 'home' && styles.tabTextActive]}>
            Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentScreen === 'leaderboard' && styles.tabActive]}
          onPress={() => setCurrentScreen('leaderboard')}
        >
          <Text style={[styles.tabText, currentScreen === 'leaderboard' && styles.tabTextActive]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentScreen === 'history' && styles.tabActive]}
          onPress={() => setCurrentScreen('history')}
        >
          <Text style={[styles.tabText, currentScreen === 'history' && styles.tabTextActive]}>
            History
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentScreen === 'home' && (
          <View style={styles.homeContent}>
            <LinearGradient colors={['#22c55e', '#16a34a', '#14532d']} style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Welcome, {user?.displayName?.split(' ')[0]}! 👋</Text>
              <Text style={styles.welcomeSubtitle}>Ready to make the planet greener?</Text>
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>📈</Text>
                  <Text style={styles.statValue}>{points}</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>🌿</Text>
                  <Text style={styles.statValue}>{actions.length}</Text>
                  <Text style={styles.statLabel}>Actions</Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.impactCard}>
              <Text style={styles.sectionTitle}>🌍 Your Impact</Text>
              <LinearGradient colors={['#dcfce7', '#bbf7d0']} style={styles.impactContent}>
                <Text style={styles.impactValue}>{(totalCO2Saved / 1000).toFixed(2)}</Text>
                <Text style={styles.impactLabel}>kg CO₂ saved</Text>
                <Text style={styles.impactSubtext}>
                  Equal to {Math.floor(totalCO2Saved / 411)} km not driven by car
                </Text>
              </LinearGradient>
            </View>

            <TouchableOpacity style={styles.cameraButton} onPress={handleCameraOpen} activeOpacity={0.8}>
              <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.cameraButtonGradient}>
                <Text style={styles.cameraIcon}>📸</Text>
                <Text style={styles.cameraButtonText}>Capture Eco-Action</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.actionsGrid}>
              <Text style={styles.sectionTitle}>Eco-Actions</Text>
              <View style={styles.grid}>
                {ecoActionTypes.map((action) => (
                  <View key={action.type} style={styles.actionCard}>
                    <Text style={styles.actionEmoji}>{action.emoji}</Text>
                    <Text style={styles.actionName}>{action.name}</Text>
                    <Text style={styles.actionPoints}>+{action.points} pts</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {currentScreen === 'leaderboard' && (
          <View style={styles.leaderboardContent}>
            <Text style={styles.pageTitle}>🏆 Leaderboard</Text>
            {leaderboard.map((person, index) => (
              <View
                key={index}
                style={[styles.leaderboardRow, person.isUser && styles.leaderboardRowUser]}
              >
                <Text style={styles.leaderboardRank}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </Text>
                <Text style={styles.leaderboardAvatar}>{person.avatar}</Text>
                <View style={styles.leaderboardInfo}>
                  <Text style={styles.leaderboardName}>{person.name}</Text>
                  <Text style={styles.leaderboardPoints}>{person.points} points</Text>
                </View>
                {person.isUser && <Text style={styles.leaderboardStar}>⭐</Text>}
              </View>
            ))}
          </View>
        )}

        {currentScreen === 'history' && (
          <View style={styles.historyContent}>
            <Text style={styles.pageTitle}>Your Journey</Text>
            {actions.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>✨</Text>
                <Text style={styles.emptyText}>Start capturing eco-actions!</Text>
              </View>
            ) : (
              actions.map((action) => (
                <View key={action.id} style={styles.historyCard}>
                  {action.image && (
                    <Image source={{ uri: action.image }} style={styles.historyImage} resizeMode="cover" />
                  )}
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyName}>✅ {action.name}</Text>
                    <Text style={styles.historyDate}>
                      {new Date(action.timestamp).toLocaleDateString()} at {new Date(action.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <View style={styles.historyBadges}>
                      <View style={styles.historyBadgeGreen}>
                        <Text style={styles.historyBadgeText}>+{action.points} pts</Text>
                      </View>
                      <View style={styles.historyBadgeBlue}>
                        <Text style={styles.historyBadgeText}>{action.co2}g CO₂</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      {/* Camera Modal */}
      <Modal visible={showCamera} animationType="slide" statusBarTranslucent>
        <View style={styles.cameraContainer}>
          {!capturedPhoto ? (
            <>
              <CameraView style={styles.camera} ref={cameraRef} facing="back">
                <View style={styles.cameraOverlay}>
                  <View style={styles.cameraHeader}>
                    <TouchableOpacity
                      style={styles.cameraClose}
                      onPress={() => setShowCamera(false)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.cameraCloseText}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cameraFooter}>
                    <Text style={styles.cameraHint}>Capture your eco-action</Text>
                  </View>
                </View>
              </CameraView>

              <View style={styles.captureButtonContainer}>
                <TouchableOpacity style={styles.captureButton} onPress={takePicture} activeOpacity={0.8}>
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.previewContainer}>
              <Image source={{ uri: capturedPhoto }} style={styles.previewImage} resizeMode="cover" />
              <View style={styles.previewOverlay}>
                <TouchableOpacity
                  style={styles.retakeButton}
                  onPress={retakePhoto}
                  activeOpacity={0.8}
                  disabled={verifying}
                >
                  <Text style={styles.retakeButtonText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.verifyButton, verifying && { opacity: 0.6 }]}
                  onPress={verifyAction}
                  activeOpacity={0.8}
                  disabled={verifying}
                >
                  {verifying ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.verifyButtonText}>✓ Verify with AI</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>

      {/* Reward Popup */}
      {showReward && lastAction && (
        <Modal transparent visible={showReward} animationType="fade" statusBarTranslucent>
          <View style={styles.rewardOverlay}>
            <Animated.View style={[styles.rewardCard, { transform: [{ scale: scaleAnim }] }]}>
              <Text style={styles.rewardEmoji}>🎉</Text>
              <Text style={styles.rewardTitle}>Awesome!</Text>
              <Text style={styles.rewardSubtitle}>Action verified successfully</Text>
              <LinearGradient colors={['#dcfce7', '#bbf7d0']} style={styles.rewardPoints}>
                <Text style={styles.rewardPointsValue}>+{lastAction.points}</Text>
                <Text style={styles.rewardPointsLabel}>points earned</Text>
                <View style={styles.rewardCO2}>
                  <Text style={styles.rewardCO2Text}>💚 Saved {lastAction.co2}g CO₂</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          </View>
        </Modal>
      )}

      {/* Menu Modal */}
      <Modal visible={showMenu} transparent animationType="slide" statusBarTranslucent>
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.menuContent}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Menu</Text>
                <TouchableOpacity onPress={() => setShowMenu(false)}>
                  <Text style={styles.menuClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.menuProfile}>
                <Text style={styles.menuAvatar}>👤</Text>
                <Text style={styles.menuName}>{user?.displayName}</Text>
                <Text style={styles.menuEmail}>{user?.email}</Text>
              </View>

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
                <Text style={styles.logoutIcon}>🚪</Text>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}