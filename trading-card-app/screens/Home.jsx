import React, { useContext } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import TopBar from '../components/TopBar';
import cardsData from '../data/cards';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { favoriteSets } = useContext(AuthContext);

  // Get owned cards (simulated based on card number being even)
  const ownedCards = cardsData
    .filter((card) => card.number % 2 === 0)
    .map((card, idx) => ({
      id: card.id,
      title: card.name,
      type: card.type,
      number: card.number,
      rarity: idx % 5 === 0 ? 'Legend' : idx % 4 === 0 ? 'Epic' : idx % 3 === 0 ? 'Rare' : 'Common',
      image: `https://via.placeholder.com/240x320?text=%23${card.number}`,
      owned: true,
      set: '2022 Allen & Ginter',
      subset: 'Base',
    }));

  // Group owned cards by set to find most collected
  const cardsBySet = {};
  ownedCards.forEach((card) => {
    if (!cardsBySet[card.set]) {
      cardsBySet[card.set] = [];
    }
    cardsBySet[card.set].push(card);
  });

  // Get most collected set
  const mostCollectedSet = Object.keys(cardsBySet).sort((a, b) => cardsBySet[b].length - cardsBySet[a].length)[0];
  const mostCollectedCards = mostCollectedSet ? cardsBySet[mostCollectedSet] : [];

  // Get favorite sets cards (favorites are stored as type||setName keys)
  const favoriteCards = ownedCards.filter((card) => {
    const setKey = `${card.type}||${card.set}`;
    return favoriteSets[setKey];
  });

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
      onPress={() => alert(`${item.title}\nTeam: ${item.type}\n${item.rarity}`)}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: '100%', height: 160, backgroundColor: '#eee' }}
      />
      <View style={{ padding: 8 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '700',
            color: '#333',
          }}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <View
          style={{
            backgroundColor: '#f16513ff',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 4,
            marginTop: 4,
            alignSelf: 'flex-start',
          }}
        >
          <Text style={{ fontSize: 10, color: '#fff', fontWeight: '600' }}>
            {item.rarity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <TopBar
        onProfilePress={() => navigation.navigate('Settings')}
        onNotificationsPress={() => {}}
      />

      <View style={{ marginTop: 14 }}>
        <Text style={styles.sectionTitle}>Cards You Own ({ownedCards.length})</Text>
        <FlatList
          data={ownedCards}
          horizontal
          keyExtractor={(i) => i.id}
          renderItem={renderHomeCard}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 6 }}
        />
      </View>

      {mostCollectedCards.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Your Most Collected Set</Text>
          <Text style={{ fontSize: 12, color: '#666', paddingHorizontal: 6, marginBottom: 8 }}>
            {mostCollectedSet} ({mostCollectedCards.length} cards)
          </Text>
          <FlatList
            data={mostCollectedCards}
            horizontal
            keyExtractor={(i) => i.id}
            renderItem={renderHomeCard}
            showsHorizontalScrollIndicator={false}
            style={{ paddingLeft: 6 }}
          />
        </View>
      )}

      {favoriteCards.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Your Favorites ⭐</Text>
          <FlatList
            data={favoriteCards}
            horizontal
            keyExtractor={(i) => i.id}
            renderItem={renderHomeCard}
            showsHorizontalScrollIndicator={false}
            style={{ paddingLeft: 6 }}
          />
        </View>
      )}
    </ScrollView>
  );
}
