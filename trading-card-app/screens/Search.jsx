import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import styles from '../styles';
import cardsData from '../data/cards';

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Get unique card types from data
  const uniqueTypes = ['All', ...new Set(cardsData.map((c) => c.type))];
  const tabs = uniqueTypes;

  const filtered = cardsData.filter((c) => {
    const matchesTab = activeTab === "All" || c.type === activeTab;
    const trimmedQuery = query.trim().toLowerCase();
    // If query is empty, show all cards; otherwise filter by name or team
    const matchesQuery = trimmedQuery === "" || c.name.toLowerCase().includes(trimmedQuery) || c.team.toLowerCase().includes(trimmedQuery);
    return matchesTab && matchesQuery;
  });

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.cardItem} onPress={() => alert(`Selected: ${item.name}\nTeam: ${item.team}\nCard #${item.number}`)}>
      <Image source={{ uri: 'https://via.placeholder.com/72x108?text=%23' + item.number }} style={styles.cardThumb} />
      <View style={{ marginLeft: 12, flex: 1, justifyContent: "center" }}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={{ color: "#666", marginTop: 4 }}>{item.team}</Text>
        <Text style={{ color: "#999", marginTop: 2, fontSize: 12 }}>Card #{item.number}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput placeholder="Search player name or team..." value={query} onChangeText={setQuery} style={styles.searchInput} returnKeyType="search" />
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((t) => (
          <TouchableOpacity key={t} style={[styles.tabButton, activeTab === t && styles.tabButtonActive]} onPress={() => setActiveTab(t)}>
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList data={filtered} keyExtractor={(item) => item.id} renderItem={renderCard} contentContainerStyle={{ paddingVertical: 8 }} ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20, color: '#999' }}>No results found</Text>} />
    </View>
  );
}
