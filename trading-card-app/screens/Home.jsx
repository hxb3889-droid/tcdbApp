import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import TopBar from '../components/TopBar';
import cardsData from '../data/cards';
import setFamilies from '../data/setsFamilies';
import { AuthContext } from '../context/AuthContext';
import { getTheme } from '../theme';

export default function HomeScreen({ navigation }) {
  const { favoriteCards, ownedCards } = useContext(AuthContext);
  const theme = getTheme(false); // Always use light theme
  const [expandedFamilies, setExpandedFamilies] = useState({});

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
      owned: ownedCards[card.id] || false,
      set: card.set,
      subset: card.subset || 'Base',
      icon: card.icon,
    }));

  // Get favorite cards by ID
  const favoritedCards = allCards.filter((card) => favoriteCards && favoriteCards[card.id]);

  // Calculate progress for each set
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

  // Group progress by family
  const familyProgress = {};
  setFamilies.forEach((family) => {
    const familyTotal = family.subsets.reduce((sum, subset) => sum + (setProgress[subset.fullName]?.total || 0), 0);
    const familyOwned = family.subsets.reduce((sum, subset) => sum + (setProgress[subset.fullName]?.owned || 0), 0);
    familyProgress[family.baseSetName] = { total: familyTotal, owned: familyOwned, subsets: family.subsets };
  });

  const toggleFamilyExpand = (familyName) => {
    setExpandedFamilies((prev) => ({ ...prev, [familyName]: !prev[familyName] }));
  };

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
        backgroundColor: item.owned ? '#f0f9f6' : '#fff5f5',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        borderWidth: 2,
        borderColor: item.owned ? '#4CAF50' : '#FF5252',
      }}
      onPress={() => alert(`${item.title}\nTeam: ${item.type}${item.owned ? '\nOwned' : '\nMissing'}`)}
    >
      <View
        style={{ width: '100%', height: 160, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
      >
        <Ionicons name={getCardTypeIcon(item.icon)} size={60} color={item.owned ? '#4CAF50' : '#FF5252'} />
        {!item.owned && (
          <View style={{ position: 'absolute', top: 4, right: 4, backgroundColor: '#FF5252', borderRadius: 10, paddingHorizontal: 4, paddingVertical: 2 }}>
            <Text style={{ color: '#fff', fontSize: 8, fontWeight: '600' }}>Missing</Text>
          </View>
        )}
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
            fontStyle: item.owned ? 'normal' : 'italic',
          }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: '#999',
            marginTop: 4,
            textAlign: 'center',
          }}
          numberOfLines={2}
        >
          {item.set}
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
          {Object.entries(familyProgress).map(([familyName, progress]) => {
            const percentage = Math.round((progress.total > 0 ? (progress.owned / progress.total) * 100 : 0));
            const isExpanded = expandedFamilies[familyName];
            const hasMultipleSubsets = progress.subsets.length > 1;

            return (
              <View key={familyName} style={{ marginBottom: 10 }}>
                <TouchableOpacity
                  onPress={() => hasMultipleSubsets && toggleFamilyExpand(familyName)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    padding: 12,
                    elevation: 2,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: '#333' }}>{familyName}</Text>
                      {hasMultipleSubsets && (
                        <Text style={{ color: '#666', fontSize: 12, marginLeft: 8 }}>{isExpanded ? '▾' : '▸'}</Text>
                      )}
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#666' }}>
                      {progress.owned}/{progress.total}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 10,
                      backgroundColor: '#e0e0e0',
                      borderRadius: 5,
                      overflow: 'hidden',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <View
                      style={{
                        height: '100%',
                        width: `${percentage}%`,
                        backgroundColor: '#f16513ff',
                        borderRadius: 5,
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: 11, color: '#999', marginTop: 6 }}>
                    {percentage}% complete
                  </Text>
                </TouchableOpacity>

                {isExpanded && hasMultipleSubsets && (
                  <View style={{ marginTop: 8, paddingLeft: 12 }}>
                    {progress.subsets.map((subset) => {
                      const subsetProgress = setProgress[subset.fullName] || { total: 0, owned: 0 };
                      const subsetPct = Math.round((subsetProgress.total > 0 ? (subsetProgress.owned / subsetProgress.total) * 100 : 0));
                      return (
                        <TouchableOpacity
                          key={subset.fullName}
                          onPress={() => navigation.navigate('SetDetails', { setName: subset.fullName })}
                          style={{
                            backgroundColor: '#f9f9f9',
                            borderRadius: 6,
                            padding: 10,
                            marginBottom: 8,
                            borderLeftWidth: 4,
                            borderLeftColor: '#f16513ff',
                            elevation: 2,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.08,
                            shadowRadius: 2,
                          }}
                        >
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: '600', color: '#333', flex: 1 }}>{subset.name}</Text>
                            <Text style={{ fontSize: 11, fontWeight: '600', color: '#666' }}>
                              {subsetProgress.owned}/{subsetProgress.total}
                            </Text>
                          </View>
                          <View style={{ marginTop: 6, height: 6, backgroundColor: '#e0e0e0', borderRadius: 3, overflow: 'hidden', elevation: 1 }}>
                            <View style={{ height: '100%', width: `${subsetPct}%`, backgroundColor: '#4CAF50', borderRadius: 3 }} />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}

                {!hasMultipleSubsets && (
                  <View style={{ marginTop: 0 }}>
                    {progress.subsets.map((subset) => (
                      <TouchableOpacity
                        key={subset.fullName}
                        onPress={() => navigation.navigate('Collection', { setName: subset.fullName })}
                        style={{ marginTop: 0 }}
                      />
                    ))}
                  </View>
                )}
              </View>
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
