import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from '../styles/styles';

export const LoginScreen = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Mock login - replace with real Firebase auth
    // try {
    //   setLoading(true);
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   setUser(userCredential.user);
    // } catch (error) {
    //   Alert.alert('Login Error', error.message);
    // } finally {
    //   setLoading(false);
    // }

    setLoading(true);
    setTimeout(() => {
      setUser({
        name: 'Alex Green',
        email: email,
        points: 450,
        itemsRecycled: 89,
        avatar: '♻️',
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginCard}>
        <Text style={styles.loginEmoji}>♻️</Text>
        <Text style={styles.loginTitle}>EcoScan</Text>
        <Text style={styles.loginSubtitle}>Scan. Recycle. Connect.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};