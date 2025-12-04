import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import cardsData from '../data/cards';

export default function CollectionScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [expandedTypes, setExpandedTypes] = useState({});
  const [expandedSets, setExpandedSets] = useState({});
  const [subsetSelection, setSubsetSelection] = useState({});

  const filters = ['All', 'Owned', 'Wishlist'];
  const sortOptions = ['name', 'number', 'rarity'];

  // Transform CSV card data into collection format
  const cards = cardsData.map((card, idx) => ({
    id: card.id,
    title: card.name,
    type: card.type,
    number: card.number,
    rarity: idx % 5 === 0 ? 'Legend' : idx % 4 === 0 ? 'Epic' : idx % 3 === 0 ? 'Rare' : 'Common',
    image: `https://via.placeholder.com/240x320?text=%23${card.number}`,
    owned: card.number % 2 === 0,
    set: '2022 Allen & Ginter',
    subset: 'Base',
  }));

  // Sort cards based on sortBy preference
  const sortedCards = [...cards].sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'number') return a.number - b.number;
    if (sortBy === 'rarity') {
      const rarityOrder = { 'Legend': 0, 'Epic': 1, 'Rare': 2, 'Common': 3 };
      return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    }
    return 0;
  });

  // Group by type -> set -> cards (skip category)
  const typeData = {};
  sortedCards.forEach((card) => {
    const typ = card.type;
    const st = card.set;

    if (!typeData[typ]) typeData[typ] = {};
    if (!typeData[typ][st]) typeData[typ][st] = [];
    typeData[typ][st].push(card);
  });

  const typeNames = Object.keys(typeData).sort();

  const toggleType = (type) => {
    setExpandedTypes((s) => ({ ...s, [type]: !s[type] }));
  };

  const toggleSet = (type, setName) => {
    const key = `${type}||${setName}`;
    setExpandedSets((s) => ({ ...s, [key]: !s[key] }));
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.collectionCard} onPress={() => alert(`${item.title}\nTeam: ${item.type}\n${item.rarity}`)}>
      <Image source={{ uri: item.image }} style={styles.collectionImage} />
      <View style={styles.collectionInfo}>
        <Text style={styles.collectionName} numberOfLines={1}>{item.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#666', fontSize: 12 }}>{item.subset || item.type}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.rarity}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSet = (type, setName) => {
    const setCards = typeData[type][setName];
    const key = `${type}||${setName}`;
    const expanded = !!expandedSets[key];

    const subsets = Array.from(new Set(setCards.map((c) => c.subset || 'Base')));
    const subsetOptions = ['All', ...subsets];
    const selectedSubset = subsetSelection[key] || 'All';

    const cardsForSubset = setCards.filter((c) => selectedSubset === 'All' ? true : (c.subset || 'Base') === selectedSubset);

    const owned = cardsForSubset.filter((c) => c.owned);
    const missing = cardsForSubset.filter((c) => !c.owned);

    const filteredSetCards = cardsForSubset.filter((c) => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Owned') return c.owned;
      if (activeFilter === 'Wishlist') return !c.owned;
      return true;
    });

    if (activeFilter !== 'All' && filteredSetCards.length === 0) return null;

    return (
      <View key={key} style={{ marginTop: 10, marginLeft: 12 }}>
        <TouchableOpacity onPress={() => toggleSet(type, setName)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '700' }}>{setName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#f16513ff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, marginRight: 8 }}>
              <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>{owned.length}/{cardsForSubset.length}</Text>
            </View>
            <Text style={{ color: '#666', fontSize: 12 }}>{expanded ? '▾' : '▸'}</Text>
          </View>
        </TouchableOpacity>

        {expanded && (
          <View>
            {subsetOptions.length > 1 && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 6, marginLeft: 8 }}>
                {subsetOptions.map((s) => (
                  <TouchableOpacity key={s} onPress={() => setSubsetSelection((st) => ({ ...st, [key]: s }))} style={{ marginRight: 6, marginBottom: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, backgroundColor: selectedSubset === s ? '#f16513ff' : '#e8e8e8' }}>
                    <Text style={{ color: selectedSubset === s ? '#fff' : '#333', fontSize: 11, fontWeight: '600' }}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {owned.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 6, marginLeft: 8 }}>In Set ({owned.length})</Text>
                <FlatList data={owned} keyExtractor={(i) => i.id} renderItem={renderCard} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }} scrollEnabled={false} />
              </View>
            )}

            {missing.length > 0 && (
              <View>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#999', marginBottom: 6, marginLeft: 8 }}>Missing ({missing.length})</Text>
                <FlatList data={missing} keyExtractor={(i) => i.id} renderItem={renderCard} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }} scrollEnabled={false} />
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderType = (type) => {
    const expanded = !!expandedTypes[type];
    const typeSets = typeData[type];
    const setNames = Object.keys(typeSets).sort();

    return (
      <View key={type} style={{ marginTop: 8, marginLeft: 8 }}>
        <TouchableOpacity onPress={() => toggleType(type)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6, paddingHorizontal: 6 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#333' }}>{type}</Text>
          <Text style={{ color: '#666', fontSize: 12 }}>{expanded ? '▾' : '▸'}</Text>
        </TouchableOpacity>

        {expanded && (
          <View>
            {setNames.map((setName) => renderSet(type, setName))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>My Collection</Text>
        <TouchableOpacity onPress={() => setShowSortMenu(!showSortMenu)}>
          <Ionicons name="swap-vertical-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

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

      <View style={styles.collectionFilters}>
        {filters.map((f) => (
          <TouchableOpacity key={f} style={[styles.filterButton, activeFilter === f && styles.filterButtonActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {typeNames.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{ color: '#777' }}>No cards found.</Text>
        </View>
      ) : (
        typeNames.map((type) => (
          <View key={type} style={{ marginTop: 12 }}>
            <TouchableOpacity onPress={() => toggleType(type)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 10, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: '#000' }}>{type}</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>{expandedTypes[type] ? '▾' : '▸'}</Text>
            </TouchableOpacity>

            {expandedTypes[type] && (
              <View>
                {Object.keys(typeData[type]).sort().map((setName) => renderSet(type, setName))}
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
