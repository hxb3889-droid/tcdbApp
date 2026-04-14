import React, { useContext } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import TopBar from '../components/TopBar';
import cardsData from '../data/cards';
import { AuthContext } from '../context/AuthContext';
import { getTheme } from '../theme';

export default function HomeScreen({ navigation }) {
  const { favoriteCards } = useContext(AuthContext);
  const theme = getTheme(false); // Always use light theme

  // Get all cards with complete data
  const allCards = cardsData
    .filter((card) => card.name !== "Unknown")
    .map((card, idx) => ({
      id: card.id,
      title: card.name,
      type: card.type,
      number: card.number,
      rarity: idx % 5 === 0 ? 'Legend' : idx % 4 === 0 ? 'Epic' : idx % 3 === 0 ? 'Rare' : 'Common',
      image: `https://via.placeholder.com/240x320?text=%23${card.number}`,
      owned: card.owned,
      set: '1987 Topps',
      subset: 'Base',
      icon: card.icon,
    }));

  // Get favorite cards by ID
  const favoritedCards = allCards.filter((card) => favoriteCards && favoriteCards[card.id]);

  // Group cards by set to show collection progress
  const setProgress = {};
  allCards.forEach((card) => {
    const setName = card.set;
    if (!setProgress[setName]) {
      setProgress[setName] = { total: 0, owned: 0 };
    }
    setProgress[setName].total += 1;
    if (card.owned) {
      setProgress[setName].owned += 1;
    }
  });

  const getCardTypeIcon = (iconName) => {
    const iconMap = {
      'baseball': 'baseball',
      'basketball': 'basketball',
      'football': 'football',
      'ice-hockey': 'ice-hockey',
      'soccer': 'soccer',
    };
    return iconMap[iconName] || 'baseball';
  };

  // Render card for horizontal scroll - larger and better display
  const renderHomeCard = ({ item }) => (
    <TouchableOpacity
      style={{
        width: 120,
        marginRight: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
      }}
      onPress={() => alert(`${item.title}\nTeam: ${item.type}`)}
    >
      <View
        style={{ width: '100%', height: 160, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}
      >
        <Ionicons name={getCardTypeIcon(item.icon)} size={60} color="#f16513ff" />
      </View>
      <View style={{ padding: 8 }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '600',
            color: '#666',
            marginBottom: 4,
            textAlign: 'center',
          }}
          numberOfLines={1}
        >
          {item.type}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '700',
            color: '#333',
            textAlign: 'center',
          }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]} contentContainerStyle={{ paddingBottom: 40 }}>
      <TopBar
        onProfilePress={() => navigation.navigate('Settings')}
        onNotificationsPress={() => {}}
      />

      {/* Sets You Have Collected */}
      <View style={{ marginTop: 20 }}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Sets You've Collected 📦</Text>
        <View style={{ paddingHorizontal: 6 }}>
          {Object.entries(setProgress).map(([setName, progress]) => {
            const percentage = Math.round((progress.owned / progress.total) * 100);
            return (
              <TouchableOpacity
                key={setName}
                onPress={() => navigation.navigate('Collection', { setName })}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 10,
                  elevation: 2,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#333' }}>{setName}</Text>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#666' }}>
                    {progress.owned}/{progress.total}
                  </Text>
                </View>
                <View
                  style={{
                    height: 8,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <View
                    style={{
                      height: '100%',
                      width: `${percentage}%`,
                      backgroundColor: '#f16513ff',
                    }}
                  />
                </View>
                <Text style={{ fontSize: 11, color: '#999', marginTop: 6 }}>
                  {percentage}% complete
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {favoritedCards.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Favorites ⭐ ({favoritedCards.length})</Text>
          <FlatList
            data={favoritedCards}
            horizontal
            keyExtractor={(i) => i.id}
            renderItem={renderHomeCard}
            showsHorizontalScrollIndicator={false}
            style={{ paddingLeft: 6 }}
          />
        </View>
      ) : (
        <View style={{ marginTop: 20, alignItems: 'center', paddingVertical: 40 }}>
          <Ionicons name="star-outline" size={48} color={theme.textSecondary} style={{ marginBottom: 12 }} />
          <Text style={{ color: theme.textSecondary, fontSize: 16, fontWeight: '600' }}>No favorite cards yet</Text>
          <Text style={{ color: theme.textTertiary, fontSize: 12, marginTop: 8, textAlign: 'center', paddingHorizontal: 20 }}>
            Visit your collection to mark cards as favorites
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
