import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import styles from '../styles';
import TopBar from '../components/TopBar';

export default function HomeScreen({ navigation }) {
  const [pollOptions, setPollOptions] = useState([
    { id: '1', text: 'Yes', votes: 0 },
    { id: '2', text: 'No', votes: 0 },
  ]);

  const vote = (id) => {
    setPollOptions((prev) => prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt)));
  };

  const featured = [
    { id: 'f1', title: 'Bob addis', subtitle: 'Rare', image: 'https://www.tcdb.com/Images/Cards/Baseball/9092/9092-157Fr.jpg' },
    { id: 'f2', title: 'Ted Williams', subtitle: 'Epic', image: 'https://via.placeholder.com/220x320?text=Field' },
    { id: 'f3', title: 'Ronaldo', subtitle: 'Legend', image: 'https://via.placeholder.com/220x320?text=Clutch' },
  ];

  const renderFeatured = ({ item }) => (
    <TouchableOpacity style={styles.featuredItem} onPress={() => Alert.alert(`Open ${item.title}`)}>
      <ImageBackground source={{ uri: item.image }} style={styles.featuredThumb} imageStyle={{ borderRadius: 10 }}>
        <View style={styles.featuredOverlay} />
        <View style={styles.featuredMeta}>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <TopBar onProfilePress={() => navigation.navigate('Settings')} onNotificationsPress={() => Alert.alert('Notifications pressed')} />

      <View style={{ paddingHorizontal: 6 }}>
        <ImageBackground
          source={{ uri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnaTnV0jPoGTYJZuVQgPN3D1lySK8LQBEqWSxgssxo4I77RGQmnZKXkFzx3PyHJgjmiXcL7kJHVcgensYsDkNzGaThQ6P1WEuEWjCsmdTWDGXBV3oHMfVI344k6E_zirHOv1-J2DPtPbM/s400/banana+fish.jpg' }}
          style={styles.hero}
          imageStyle={{ borderRadius: 14 }}
        >
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Card of the Day</Text>
            <Text style={styles.heroSubtitle}>banana fishy • Rare</Text>
            <TouchableOpacity style={styles.ctaButton} onPress={() => Alert.alert('Added to collection')}>
              <Text style={styles.ctaText}>Add to collection</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={{ marginTop: 14 }}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <FlatList data={featured} horizontal keyExtractor={(i) => i.id} renderItem={renderFeatured} showsHorizontalScrollIndicator={false} style={{ paddingLeft: 6 }} />
      </View>

      <View style={{ marginTop: 12, paddingHorizontal: 6 }}>
        <View style={styles.section}>
          <Text style={styles.title}>Poll of the Day</Text>
          <Text style={styles.pollQuestion}>Do you like today's card?</Text>
          <FlatList
            data={pollOptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.pollOption} onPress={() => vote(item.id)}>
                <Text style={{ fontWeight: '600' }}>{item.text}</Text>
                <Text style={{ color: '#888' }}>{item.votes} votes</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}
