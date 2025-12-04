import React, { useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { AuthContext } from '../context/AuthContext';

export default function TopBar({ onProfilePress, onNotificationsPress }) {
  const { user, openLogin } = useContext(AuthContext);

  const handleProfilePress = () => {
    if (user) onProfilePress && onProfilePress();
    else openLogin && openLogin();
  };

  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={onNotificationsPress}>
        <Ionicons name="notifications-outline" size={28} color="black" />
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
