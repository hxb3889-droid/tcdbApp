import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Switch, TextInput, Alert } from 'react-native';
import styles from '../styles';
import { AuthContext } from '../context/AuthContext';
import { getTheme } from '../theme';
import cardsData from '../data/cards';

export default function SettingsScreen() {
  const { user, setUser } = useContext(AuthContext);
  const theme = getTheme(false); // Always use light theme
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [username, setUsername] = useState(user?.name || 'User Name');
  const [email, setEmail] = useState(user?.email || 'user@example.com');

  // Calculate collection stats
  const cards = cardsData.filter(card => card.name !== "Unknown").map((card) => ({
    owned: card.owned,
    set: card.set,
  }));
  
  const totalCardsOwned = cards.filter(card => card.owned).length;
  const uniqueSets = new Set(cards.map(card => card.set)).size;

  const handleSave = () => {
    if (user) {
      setUser({ ...user, name: username, email });
      Alert.alert('Saved', 'Your settings have been saved.');
    } else {
      Alert.alert('Not signed in', 'Please sign in to save account settings.');
    }
  };

  const handleLogout = () => {
    if (!user) {
      Alert.alert('Not signed in', "You're not signed in.");
      return;
    }
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => { setUser(null); Alert.alert('Logged out'); } },
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.profileSection}>
        <Image source={{ uri: user?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }} style={styles.profilePicLarge} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{username}</Text>
          <Text style={{ color: theme.textSecondary, marginTop: 4 }}>{email}</Text>
          <TouchableOpacity onPress={() => Alert.alert('Edit profile')} style={{ marginTop: 8 }}>
            <Text style={{ color: theme.primary }}>Edit profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#f0f0f0', marginHorizontal: 8, marginVertical: 12, borderRadius: 8, padding: 12 }]}>
        <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: 12 }]}>Collection Stats</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#4CAF50' }}>{totalCardsOwned}</Text>
            <Text style={{ color: '#666', fontSize: 12, marginTop: 4 }}>Cards Owned</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#f16513ff' }}>{uniqueSets}</Text>
            <Text style={{ color: '#666', fontSize: 12, marginTop: 4 }}>Sets Owned</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Preferences</Text>
        <View style={[styles.row, { backgroundColor: theme.card }]}>
          <Text style={[styles.label, { color: theme.text }]}>Push Notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Account</Text>
        <TextInput style={[styles.input, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]} value={username} onChangeText={setUsername} placeholder="Display name" placeholderTextColor={theme.textTertiary} />
        <TextInput style={[styles.input, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" placeholderTextColor={theme.textTertiary} />
      </View>

      <View style={{ padding: 10 }}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={{ color: theme.primary, fontWeight: '600' }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
