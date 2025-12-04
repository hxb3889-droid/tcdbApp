import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from './context/AuthContext';
import styles from './styles';
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import CollectionScreen from './screens/Collection';
import SettingsScreen from './screens/Settings';
import LoginScreen from './screens/Login';

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const auth = { user, setUser, openLogin, closeLogin };

  // If user isn't signed in (or explicit request to show login), show the Login screen alone
  if (showLogin || !user) {
    const fakeNav = { replace: () => closeLogin() };
    return (
      <AuthContext.Provider value={auth}>
        <View style={styles.container}>
          <LoginScreen navigation={fakeNav} />
        </View>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: '#f16513ff',
              borderTopColor: 'transparent',
            },
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home-outline';
              else if (route.name === 'Search') iconName = 'search-outline';
              else if (route.name === 'Collection') iconName = 'albums-outline';
              else if (route.name === 'Settings') iconName = 'settings-outline';
              return <Ionicons name={iconName} size={size} color="white" />;
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Collection" component={CollectionScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
