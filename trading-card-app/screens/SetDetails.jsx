import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, TextInput } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import cardsData from '../data/cards';
import { AuthContext } from '../context/AuthContext';
import { getTheme } from '../theme';

export default function SetDetailsScreen({ route, navigation }) {
  const { favoriteCards, toggleFavorite, ownedCards, toggleOwned } = useContext(AuthContext);
  const theme = getTheme(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('number');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpenCardId, setMenuOpenCardId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [cardViewMode, setCardViewMode] = useState('list');

  const { setName } = route.params;
  const filters = ['All', 'Owned', 'Missing'];
  const sortOptions = ['number', 'name', 'rarity'];

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
      const card = setCards.find((c) => c.id === cardId);
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

  // Filter cards for this specific set
  const setCards = cardsData
    .filter(card => card.name !== "Unknown" && card.set === setName)
    .map((card, idx) => ({
      id: card.id,
      title: card.name,
      type: card.type,
      number: card.number,
      rarity: idx % 5 === 0 ? 'Legend' : idx % 4 === 0 ? 'Epic' : idx % 3 === 0 ? 'Rare' : 'Common',
      image: `https://via.placeholder.com/240x320?text=%23${card.number}`,
      owned: ownedCards[card.id] || false,
      set: card.set,
      team: card.team,
      icon: card.icon,
    }));

  // Sort cards
  const sortedCards = [...setCards].sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'number') return parseInt(a.number) - parseInt(b.number);
    if (sortBy === 'rarity') {
      const rarityOrder = { 'Legend': 0, 'Epic': 1, 'Rare': 2, 'Common': 3 };
      return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    }
    return 0;
  });

  // Filter by search
  const searchResults = searchQuery
    ? sortedCards.filter(card => card.title.toLowerCase().includes(searchQuery.toLowerCase()) || card.team.toLowerCase().includes(searchQuery.toLowerCase()))
    : sortedCards;

  // Filter by owned/missing
  const filtered = (() => {
    if (activeFilter === 'Owned') return searchResults.filter(c => c.owned);
    if (activeFilter === 'Missing') return searchResults.filter(c => !c.owned);
    return searchResults;
  })();

  // Calculate stats
  const totalOwned = setCards.filter(c => c.owned).length;
  const percentage = Math.round((totalOwned / setCards.length) * 100);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Legend': return '#FFD700';
      case 'Epic': return '#9C27B0';
      case 'Rare': return '#2196F3';
      case 'Common': return '#4CAF50';
      default: return '#eee';
    }
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

  const renderCard = ({ item }) => {
    const isSelected = selectedCards.has(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.collectionCard,
          {
            width: cardViewMode === 'list' ? '100%' : '48%',
            backgroundColor: isSelected ? '#e3f2fd' : (item.owned ? '#f0f9f6' : '#fff5f5'),
            borderColor: isSelected ? '#2196F3' : (item.owned ? '#4CAF50' : '#FF5252'),
            borderWidth: isSelected ? 2 : 2,
            position: 'relative',
          },
        ]}
        onPress={() => {
          if (selectionMode) {
            toggleCardSelection(item.id);
          } else {
            alert(`Selected: ${item.title}\nTeam: ${item.team}\nCard #${item.number}${item.owned ? '\nOwned' : '\nMissing'}`);
          }
        }}
        onLongPress={() => {
          toggleCardSelection(item.id);
        }}
      >
        {cardViewMode === 'grid' ? (
          <>
            <View style={{ width: '100%', height: 160, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <Ionicons name={getCardTypeIcon(item.icon)} size={80} color={item.owned ? '#4CAF50' : '#FF5252'} />
              {isSelected && (
                <View style={{ position: 'absolute', top: 4, left: 4, backgroundColor: '#2196F3', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="checkmark" size={16} color="#fff" />
                </View>
              )}
              {!isSelected && (
                <View style={{ position: 'absolute', top: 4, right: 4, backgroundColor: item.owned ? '#4CAF50' : '#FF5252', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name={item.owned ? 'checkmark' : 'close'} size={16} color="#fff" />
                </View>
              )}
              {!selectionMode && (
                <View style={{ position: 'absolute', overflow: 'visible', zIndex: 9999, right: 4, bottom: 4 }}>
                  <TouchableOpacity onPress={(event) => {
                    if (menuOpenCardId === item.id) {
                      setMenuOpenCardId(null);
                      setMenuPosition(null);
                    } else {
                      const { pageX, pageY } = event.nativeEvent;
                      setMenuOpenCardId(item.id);
                      setMenuPosition({ x: pageX - 100, y: pageY + 10 }); // Position menu below and to the left of the icon
                    }
                  }} style={{ padding: 8 }}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#333" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.collectionInfo}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.collectionName, { fontStyle: item.owned ? 'normal' : 'italic' }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ marginLeft: 4 }}>
                  <Ionicons name={favoriteCards[item.id] ? 'star' : 'star-outline'} size={16} color={favoriteCards[item.id] ? '#f16513ff' : '#999'} />
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#666', fontSize: 12, marginTop: 4, fontStyle: item.owned ? 'normal' : 'italic' }} numberOfLines={1}>
                Card #{item.number}
              </Text>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.collectionInfo, { position: 'relative' }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={[styles.collectionName, { fontStyle: item.owned ? 'normal' : 'italic', flex: 1 }]} numberOfLines={1}>
                  {item.title}
                </Text>
                {!selectionMode && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 8 }}>
                    <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ padding: 4 }}>
                      <Ionicons name={favoriteCards[item.id] ? 'star' : 'star-outline'} size={18} color={favoriteCards[item.id] ? '#f16513ff' : '#999'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(event) => {
                      if (menuOpenCardId === item.id) {
                        setMenuOpenCardId(null);
                        setMenuPosition(null);
                      } else {
                        const { pageX, pageY } = event.nativeEvent;
                        setMenuOpenCardId(item.id);
                        setMenuPosition({ x: pageX - 100, y: pageY + 10 });
                      }
                    }} style={{ padding: 4 }}>
                      <Ionicons name="ellipsis-vertical" size={18} color="#333" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <Text style={{ color: '#666', fontSize: 12, fontStyle: item.owned ? 'normal' : 'italic' }} numberOfLines={1}>
                Card #{item.number}
              </Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header with Back Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="chevron-back" size={28} color="#f16513ff" />
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#f16513ff', marginLeft: 4 }}>Back</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity onPress={() => setShowSortMenu(!showSortMenu)}>
              <Ionicons name="swap-vertical-outline" size={22} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCardViewMode(cardViewMode === 'list' ? 'grid' : 'list')}>
              <Ionicons name={cardViewMode === 'list' ? 'grid' : 'list'} size={22} color="#f16513ff" />
            </TouchableOpacity>
          </View>
        </View>

        {selectionMode && (
          <View style={{ backgroundColor: '#2196F3', paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
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

        {/* Set Title and Stats */}
        <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12, elevation: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 8 }}>
            {setName.replace('Sports Card Sets - ', '')}
          </Text>
          <View style={{ marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Text style={{ fontSize: 12, color: '#666' }}>Collection Progress</Text>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#f16513ff' }}>{percentage}%</Text>
            </View>
            <View style={{ height: 12, backgroundColor: '#e0e0e0', borderRadius: 6, overflow: 'hidden' }}>
              <View style={{ height: '100%', width: `${percentage}%`, backgroundColor: '#f16513ff', borderRadius: 6 }} />
            </View>
          </View>
          <Text style={{ fontSize: 12, color: '#999' }}>{totalOwned} of {setCards.length} cards owned</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search cards..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { backgroundColor: '#f0f0f0', color: '#333', borderColor: '#ddd' }]}
            placeholderTextColor="#999"
            returnKeyType="search"
          />
        </View>

        {/* Sort Menu */}
        {showSortMenu && (
          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 12, elevation: 2 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', marginBottom: 8, color: '#666' }}>Sort By:</Text>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setSortBy(option);
                  setShowSortMenu(false);
                }}
                style={{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: sortBy === option ? '#f16513ff' : 'transparent', borderRadius: 6, marginBottom: 4 }}
              >
                <Text style={{ color: sortBy === option ? '#fff' : '#333', fontWeight: sortBy === option ? '700' : '600' }}>
                  {option === 'name' ? 'Name (A-Z)' : option === 'number' ? 'Card Number' : 'Rarity'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Filters */}
        <View style={styles.collectionFilters}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, activeFilter === f && styles.filterButtonActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cards Grid */}
        {filtered.length > 0 ? (
          <FlatList
            key={cardViewMode}
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={renderCard}
            numColumns={cardViewMode === 'list' ? 1 : 2}
            columnWrapperStyle={cardViewMode === 'list' ? undefined : { justifyContent: 'space-between', paddingHorizontal: 8 }}
            scrollEnabled={false}
          />
        ) : (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Ionicons name="search-outline" size={48} color="#ddd" style={{ marginBottom: 12 }} />
            <Text style={{ color: '#999', fontSize: 16 }}>No cards found</Text>
          </View>
        )}
      </ScrollView>
      {menuOpenCardId && menuPosition && (
        <View style={{ position: 'absolute', top: menuPosition.y, left: menuPosition.x, zIndex: 10000 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 6, overflow: 'visible', borderWidth: 1, borderColor: '#ddd', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 100, minWidth: 120 }}>
            <TouchableOpacity
              onPress={() => {
                toggleOwned(menuOpenCardId);
                setMenuOpenCardId(null);
                setMenuPosition(null);
              }}
              style={{ paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
            >
              <Text style={{ color: '#333', fontSize: 14, fontWeight: '500' }}>Have</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const card = setCards.find(c => c.id === menuOpenCardId);
                if (card && card.owned) {
                  toggleOwned(menuOpenCardId);
                }
                setMenuOpenCardId(null);
                setMenuPosition(null);
              }}
              style={{ paddingVertical: 10, paddingHorizontal: 12 }}
            >
              <Text style={{ color: '#333', fontSize: 14, fontWeight: '500' }}>Need</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </React.Fragment>
  );
}
