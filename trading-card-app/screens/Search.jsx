import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
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
  const [menuOpenCardId, setMenuOpenCardId] = useState(null);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [selectionMode, setSelectionMode] = useState(false);

  // Get unique card types from data
  const uniqueTypes = ['All', ...new Set(cardsData.map((c) => c.type))];
  const tabs = uniqueTypes;

  const toggleCardSelection = (cardId) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
    if (newSelected.size > 0 && !selectionMode) {
      setSelectionMode(true);
    } else if (newSelected.size === 0) {
      setSelectionMode(false);
    }
  };

  const markSelectedAs = (owned) => {
    selectedCards.forEach((cardId) => {
      const card = cardsData.find((c) => c.id === cardId);
      if (card && ownedCards[cardId] !== owned) {
        toggleOwned(cardId);
      }
    });
    setSelectedCards(new Set());
    setSelectionMode(false);
  };

  const clearSelection = () => {
    setSelectedCards(new Set());
    setSelectionMode(false);
  };

  const filtered = cardsData.filter(card => card.name !== "Unknown").map(card => ({ ...card, owned: ownedCards[card.id] || false })).filter((c) => {
    const matchesTab = activeTab === "All" || c.type === activeTab;
    const trimmedQuery = query.trim().toLowerCase();
    // If query is empty, show all cards; otherwise filter by name or team
    const matchesQuery = trimmedQuery === "" || c.name.toLowerCase().includes(trimmedQuery) || c.team.toLowerCase().includes(trimmedQuery);
    return matchesTab && matchesQuery;
  });

  const renderCard = ({ item }) => {
    const isSelected = selectedCards.has(item.id);
    return (
      <TouchableOpacity 
        style={[
          styles.cardItem, 
          { 
            backgroundColor: isSelected ? '#e3f2fd' : (item.owned ? '#f0f9f6' : '#fff5f5'),
            borderLeftWidth: 4, 
            borderLeftColor: isSelected ? '#2196F3' : (item.owned ? '#4CAF50' : '#FF5252'),
            position: 'relative',
            borderWidth: isSelected ? 2 : 0,
            borderColor: isSelected ? '#2196F3' : 'transparent'
          }
        ]} 
        onPress={() => {
          if (selectionMode) {
            toggleCardSelection(item.id);
          } else {
            alert(`Selected: ${item.name}\nTeam: ${item.team}\nCard #${item.number}${item.owned ? '\nOwned' : '\nMissing'}`);
          }
        }}
        onLongPress={() => {
          toggleCardSelection(item.id);
        }}
      >
        <Image source={{ uri: 'https://via.placeholder.com/72x108?text=%23' + item.number }} style={styles.cardThumb} />
        {isSelected && (
          <View style={{ position: 'absolute', top: 8, left: 8, backgroundColor: '#2196F3', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
        )}
        {!isSelected && (
          <View style={{ position: 'absolute', top: 8, right: 8, backgroundColor: item.owned ? '#4CAF50' : '#FF5252', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name={item.owned ? 'checkmark' : 'close'} size={16} color="#fff" />
          </View>
        )}
        <View style={{ marginLeft: 12, flex: 1, justifyContent: "center", overflow: 'visible', position: 'relative' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <Text style={[styles.cardTitle, { color: item.owned ? '#4CAF50' : '#F44336', fontStyle: item.owned ? 'normal' : 'italic' }]}>{item.name}</Text>
            {!selectionMode && (
              <View style={{ position: 'absolute', overflow: 'visible', zIndex: 9999, right: 0, top: 0 }}>
                <TouchableOpacity onPress={() => setMenuOpenCardId(menuOpenCardId === item.id ? null : item.id)} style={{ padding: 8 }}>
                  <Ionicons name="ellipsis-vertical" size={20} color={theme.text} />
                </TouchableOpacity>
                {menuOpenCardId === item.id && (
                  <View style={{ position: 'absolute', top: 40, right: 0, backgroundColor: '#fff', borderRadius: 6, overflow: 'visible', borderWidth: 1, borderColor: '#ddd', zIndex: 9999, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 100, minWidth: 120 }}>
                    <TouchableOpacity
                      onPress={() => {
                        toggleOwned(item.id);
                        setMenuOpenCardId(null);
                      }}
                      style={{ paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
                      zIndex={9999}
                    >
                      <Text style={{ color: theme.text, fontSize: 14, fontWeight: '500' }}>Have</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (item.owned) {
                          toggleOwned(item.id);
                        }
                        setMenuOpenCardId(null);
                      }}
                      style={{ paddingVertical: 10, paddingHorizontal: 12 }}
                      zIndex={9999}
                    >
                      <Text style={{ color: theme.text, fontSize: 14, fontWeight: '500' }}>Need</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
          <Text style={{ color: theme.textSecondary, marginTop: 4 }}>{item.team || item.set}</Text>
          {item.team ? (
            <Text style={{ color: theme.textTertiary, marginTop: 2, fontSize: 12 }}>{item.set}</Text>
          ) : null}
          <Text style={{ color: theme.textTertiary, marginTop: 2, fontSize: 12 }}>Card #{item.number}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {selectionMode && (
        <View style={{ backgroundColor: '#2196F3', paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>{selectedCards.size} selected</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity 
              onPress={() => markSelectedAs(true)}
              style={{ backgroundColor: '#4CAF50', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 }}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>Have</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => markSelectedAs(false)}
              style={{ backgroundColor: '#FF5252', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 }}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>Need</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={clearSelection}
              style={{ backgroundColor: '#666', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 }}
            >
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
