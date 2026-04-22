import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import cardsData from '../data/cards';
import setFamilies from '../data/setsFamilies';
import { AuthContext } from '../context/AuthContext';
import { getTheme } from '../theme';

export default function CollectionScreen({ navigation }) {
  const { ownedCards } = useContext(AuthContext);
  const theme = getTheme(false);
  const [expandedFamilies, setExpandedFamilies] = useState({});

  // Calculate progress for each set
  const setProgress = {};
  cardsData.forEach((card) => {
    if (card.name !== 'Unknown') {
      const setName = card.set;
      if (!setProgress[setName]) {
        setProgress[setName] = { total: 0, owned: 0 };
      }
      setProgress[setName].total += 1;
      if (ownedCards[card.id]) {
        setProgress[setName].owned += 1;
      }
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

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#333' }}>My Collection</Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#666', marginBottom: 12 }}>Card Sets</Text>
        {Object.entries(familyProgress).map(([familyName, progress]) => {
          const isExpanded = expandedFamilies[familyName];
          const hasMultipleSubsets = progress.subsets.length > 1;
          const percentage = Math.round((progress.total > 0 ? (progress.owned / progress.total) * 100 : 0));

          return (
            <View key={familyName} style={{ marginBottom: 12 }}>
              <TouchableOpacity
                onPress={() => hasMultipleSubsets && toggleFamilyExpand(familyName)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  padding: 14,
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#333', flex: 1 }}>{familyName}</Text>
                    {hasMultipleSubsets && (
                      <Text style={{ color: '#f16513ff', fontSize: 14, marginLeft: 8 }}>{isExpanded ? '▾' : '▸'}</Text>
                    )}
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#999' }}>
                    {progress.owned}/{progress.total}
                  </Text>
                </View>
                <View style={{ height: 10, backgroundColor: '#e8e8e8', borderRadius: 5, overflow: 'hidden', marginBottom: 8, elevation: 1 }}>
                  <View
                    style={{
                      height: '100%',
                      width: `${percentage}%`,
                      backgroundColor: `${percentage < 50 ? '#FF9800' : percentage < 100 ? '#4CAF50' : '#4CAF50'}`,
                      borderRadius: 5,
                    }}
                  />
                </View>
                <Text style={{ fontSize: 11, color: '#999' }}>{percentage}% complete</Text>
              </TouchableOpacity>

              {isExpanded && hasMultipleSubsets && (
                <View style={{ marginTop: 10, paddingLeft: 8 }}>
                  {progress.subsets.map((subset) => {
                    const subsetProgress = setProgress[subset.fullName] || { total: 0, owned: 0 };
                    const subsetPct = Math.round((subsetProgress.total > 0 ? (subsetProgress.owned / subsetProgress.total) * 100 : 0));
                    return (
                      <TouchableOpacity
                        key={subset.fullName}
                        onPress={() => navigation.navigate('SetDetails', { setName: subset.fullName })}
                        style={{
                          backgroundColor: '#f8f8f8',
                          borderRadius: 8,
                          padding: 12,
                          marginBottom: 8,
                          borderLeftWidth: 4,
                          borderLeftColor: '#f16513ff',
                          elevation: 1,
                        }}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <Text style={{ fontSize: 13, fontWeight: '600', color: '#333', flex: 1 }}>{subset.name}</Text>
                          <Text style={{ fontSize: 11, fontWeight: '600', color: '#999' }}>
                            {subsetProgress.owned}/{subsetProgress.total}
                          </Text>
                        </View>
                        <View style={{ height: 6, backgroundColor: '#e0e0e0', borderRadius: 3, overflow: 'hidden' }}>
                          <View style={{ height: '100%', width: `${subsetPct}%`, backgroundColor: '#f16513ff', borderRadius: 3 }} />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              {!hasMultipleSubsets && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('SetDetails', { setName: progress.subsets[0].fullName })}
                  style={{ marginTop: 0 }}
                />
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
