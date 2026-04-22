import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import styles from '../styles';
import cardsData from '../data/cards';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../theme';

export default function SearchScreen() {
  const { favoriteCards, toggleFavorite, ownedCards, toggleOwned } = React.useContext(AuthContext);
  const theme = getTheme(false); // Always use light theme
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Get unique card types from data
  const uniqueTypes = ['All', ...new Set(cardsData.map((c) => c.type))];
  const tabs = uniqueTypes;

  const filtered = cardsData.filter(card => card.name !== "Unknown").map(card => ({ ...card, owned: ownedCards[card.id] || false })).filter((c) => {
    const matchesTab = activeTab === "All" || c.type === activeTab;
    const trimmedQuery = query.trim().toLowerCase();
    // If query is empty, show all cards; otherwise filter by name or team
    const matchesQuery = trimmedQuery === "" || c.name.toLowerCase().includes(trimmedQuery) || c.team.toLowerCase().includes(trimmedQuery);
    return matchesTab && matchesQuery;
  });

  const renderCard = ({ item }) => (
    <TouchableOpacity style={[styles.cardItem, { backgroundColor: item.owned ? '#f0f9f6' : '#fff5f5', borderLeftWidth: 4, borderLeftColor: item.owned ? '#4CAF50' : '#FF5252' }]} onPress={() => alert(`Selected: ${item.name}\nTeam: ${item.team}\nCard #${item.number}${item.owned ? '\nOwned' : '\nMissing'}`)}>
      <Image source={{ uri: 'https://via.placeholder.com/72x108?text=%23' + item.number }} style={styles.cardThumb} />
      <View style={{ marginLeft: 12, flex: 1, justifyContent: "center" }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.cardTitle, { color: item.owned ? '#4CAF50' : '#F44336', fontStyle: item.owned ? 'normal' : 'italic' }]}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => toggleOwned(item.id)} style={{ marginRight: 4 }}>
              <Ionicons name={item.owned ? 'checkmark-circle' : 'close-circle'} size={16} color={item.owned ? '#4CAF50' : '#FF5252'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ marginLeft: 4 }}>
              <Ionicons name={favoriteCards[item.id] ? 'star' : 'star-outline'} size={16} color={favoriteCards[item.id] ? theme.primary : theme.textTertiary} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ color: theme.textSecondary, marginTop: 4 }}>{item.team || item.set}</Text>
        {item.team ? (
          <Text style={{ color: theme.textTertiary, marginTop: 2, fontSize: 12 }}>{item.set}</Text>
        ) : null}
        <Text style={{ color: theme.textTertiary, marginTop: 2, fontSize: 12 }}>Card #{item.number}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.searchBar}>
        <TextInput placeholder="Search player name or team..." value={query} onChangeText={setQuery} style={[styles.searchInput, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]} placeholderTextColor={theme.textTertiary} returnKeyType="search" />
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((t) => (
          <TouchableOpacity key={t} style={[styles.tabButton, activeTab === t && styles.tabButtonActive]} onPress={() => setActiveTab(t)}>
            <Text style={[styles.tabText, { color: activeTab === t ? '#fff' : theme.text }, activeTab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList data={filtered} keyExtractor={(item) => item.id} renderItem={renderCard} contentContainerStyle={{ paddingVertical: 8 }} ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20, color: theme.textTertiary }}>No results found</Text>} />
    </View>
  );
}
