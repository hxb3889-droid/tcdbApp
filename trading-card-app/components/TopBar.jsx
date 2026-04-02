import React, { useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { AuthContext } from '../context/AuthContext';
import { getTheme } from '../theme';

export default function TopBar({ onProfilePress, onNotificationsPress }) {
  const { user, openLogin, darkMode } = useContext(AuthContext);
  const theme = getTheme(darkMode);

  const handleProfilePress = () => {
    if (user) onProfilePress && onProfilePress();
    else openLogin && openLogin();
  };

  return (
    <View style={[styles.topBar, { backgroundColor: theme.bg }]}>
      <TouchableOpacity onPress={onNotificationsPress}>
        <Ionicons name="notifications-outline" size={28} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfilePress}>
        <Image
          source={{ uri: user?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }}
          style={styles.profilePic}
        />
      </TouchableOpacity>
    </View>
  );
}
