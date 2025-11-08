import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ScannerScreen } from '../screens/ScannerScreen';
import { SocialScreen } from '../screens/SocialScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HomeIcon, ScanIcon, SocialIcon, ProfileIcon } from '../components/Icons';

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [scannedItems, setScannedItems] = useState([]);

  if (!user) {
    return <LoginScreen setUser={setUser} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#10b981',
          tabBarInactiveTintColor: '#9ca3af',
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" options={{ tabBarIcon: HomeIcon }}>
          {(props) => <HomeScreen {...props} user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Scan" options={{ tabBarIcon: ScanIcon }}>
          {(props) => (
            <ScannerScreen
              {...props}
              user={user}
              setUser={setUser}
              scannedItems={scannedItems}
              setScannedItems={setScannedItems}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Social" component={SocialScreen} options={{ tabBarIcon: SocialIcon }} />
        <Tab.Screen name="Profile" options={{ tabBarIcon: ProfileIcon }}>
          {(props) => <ProfileScreen {...props} user={user} scannedItems={scannedItems} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}