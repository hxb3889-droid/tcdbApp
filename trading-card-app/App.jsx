import React, { useState, useContext, createContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, TextInput, Switch, Alert, ScrollView, ImageBackground, Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// Simple auth context for demo login/logout
const AuthContext = createContext({ user: null, setUser: () => {}, openLogin: () => {}, closeLogin: () => {} });

// Login modal (temporary credentials: id=testuser password=password123)
const LoginModal = ({ visible, onClose }) => {
  const { setUser } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const tempId = "garner@gmail.com";
  const tempPassword = "bob";

  const handleLogin = () => { 
    if (id.toLowerCase() === tempId && password === tempPassword) {
      // set a simple user object
      setUser({ id: tempId, name: "Mr. Garner", email: tempId, avatar: "https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-0df87436fe3b2eeed3a7f9c463821113_67867e4992ad5.jpg?1736867401" });
      onClose();
      Alert.alert("Logged in", "Welcome, Mr. Garner");
    } else {
      Alert.alert("Login failed", `Invalid id or password. Try id: ${tempId} / password: ${tempPassword}`);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <View style={{ width: 320, backgroundColor: '#fff', borderRadius: 8, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Sign in</Text>
          <TextInput placeholder="id" value={id} onChangeText={setId} style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, padding: 8, marginBottom: 8 }} />
          <TextInput placeholder="password" value={password} secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, padding: 8, marginBottom: 12 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
              <Text style={{ color: '#666' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#f16513ff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ---------- Top Bar ----------
const TopBar = ({ onProfilePress, onNotificationsPress }) => {
  const { user, openLogin } = useContext(AuthContext);

  const handleProfilePress = () => {
    if (user) {
      onProfilePress && onProfilePress();
    } else {
      openLogin && openLogin();
    }
  };

  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={onNotificationsPress}>
        <Ionicons name="notifications-outline" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfilePress}>
        <Image
          source={{ uri: user?.avatar || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }}
          style={styles.profilePic}
        />
      </TouchableOpacity>
    </View>
  );
};

// ---------- Home Screen ----------
const HomeScreen = ({ navigation }) => {
  const { openLogin } = useContext(AuthContext);
  const [pollOptions, setPollOptions] = useState([
    { id: "1", text: "Yes", votes: 0 },
    { id: "2", text: "No", votes: 0 },
  ]);
  const [pollAnswered, setPollAnswered] = useState(false);

  const vote = (id) => {
    setPollOptions((prev) => prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt)));
    setPollAnswered(true);
  };

  const featured = [
    { id: "f1", title: "Bob addis", subtitle: "Rare", image: "https://www.tcdb.com/Images/Cards/Baseball/9092/9092-157Fr.jpg" },
    { id: "f2", title: "Ted Williams", subtitle: "Epic", image: "https://via.placeholder.com/220x320?text=Field" },
    { id: "f3", title: "Ronaldo", subtitle: "Legend", image: "https://via.placeholder.com/220x320?text=Clutch" },
  ];

  const renderFeatured = ({ item }) => (
    <TouchableOpacity style={styles.featuredItem} onPress={() => alert(`Open ${item.title}`)}>
      <ImageBackground source={{ uri: "https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-e8a0249654e68b957372daadeb86f8f6_67868fa2a16c2.jpg?1736871842" }} style={styles.featuredThumb} imageStyle={{ borderRadius: 10 }}>
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
      <TopBar onProfilePress={() => navigation.navigate('Settings')} onNotificationsPress={() => alert("Notifications pressed")} />

      {/* Hero / Card of the Day */}
      <View style={{ paddingHorizontal: 6 }}>
        <ImageBackground
          source={{ uri: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjnaTnV0jPoGTYJZuVQgPN3D1lySK8LQBEqWSxgssxo4I77RGQmnZKXkFzx3PyHJgjmiXcL7kJHVcgensYsDkNzGaThQ6P1WEuEWjCsmdTWDGXBV3oHMfVI344k6E_zirHOv1-J2DPtPbM/s400/banana+fish.jpg" }}
          style={styles.hero}
          imageStyle={{ borderRadius: 14 }}
        >
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Card of the Day</Text>
            <Text style={styles.heroSubtitle}>banana fishy • Rare</Text>
            <TouchableOpacity style={styles.ctaButton} onPress={() => alert('Added to collection')}>
              <Text style={styles.ctaText}>Add to collection</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Featured horizontal carousel */}
      <View style={{ marginTop: 14 }}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <FlatList data={featured} horizontal keyExtractor={(i) => i.id} renderItem={renderFeatured} showsHorizontalScrollIndicator={false} style={{ paddingLeft: 6 }} />
      </View>

      {/* Poll of the Day */}
      {!pollAnswered && (
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
      )}
    </ScrollView>
  );
};

// ---------- Other Tabs ----------
const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Baseball", "Soccer"];

  // Sample card data — replace with API data when available
  const cards = [
    { id: "1", title: "Bob Addis", type: "Baseball", image: "https://www.tcdb.com/Images/Cards/Baseball/9092/9092-157Fr.jpg" },
    { id: "2", title: "Ted Williams", type: "Baseball", image: "https://via.placeholder.com/120x180?text=Field" },
    { id: "3", title: "Ronaldo", type: "Soccer", image: "https://via.placeholder.com/120x180?text=Raptors" },
    { id: "4", title: "Messi", type: "Soccer", image: "https://via.placeholder.com/120x180?text=Bombers" },
    { id: "5", title: "Babe ruth", type: "Baseball", image: "https://via.placeholder.com/120x180?text=Clutch" },
    { id: "6", title: "Neymar", type: "Soccer", image: "https://via.placeholder.com/120x180?text=Eagles" },
  ];

  const filtered = cards.filter((c) => {
    const matchesTab = activeTab === "All" || c.type === activeTab;
    const matchesQuery = c.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchesTab && matchesQuery;
  });

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => alert(`Selected: ${item.title}`)}
    >
      <Image source={{ uri: item.image }} style={styles.cardThumb} />
      <View style={{ marginLeft: 12, flex: 1, justifyContent: "center" }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={{ color: "#666", marginTop: 4 }}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search cards, Baseball, Soccer..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabButton, activeTab === t && styles.tabButtonActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>No results</Text>}
      />
    </View>
  );
};

const CollectionScreen = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedTypes, setExpandedTypes] = useState({});
  const [expandedSets, setExpandedSets] = useState({});
  const [subsetSelection, setSubsetSelection] = useState({});

  const filters = ["All", "Owned", "Wishlist"];

  const cards = [
    // ===== SPORT CARDS =====
    // Baseball
    { id: "c1", title: "Bob Addis", type: "Baseball", category: "Sport", rarity: "Rare", image: "https://www.tcdb.com/Images/Cards/Baseball/9092/9092-157Fr.jpg", owned: true, set: "1954 Topps", subset: "Base" },
    { id: "c2", title: "Ted Williams", type: "Baseball", category: "Sport", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=Field", owned: true, set: "1954 Topps", subset: "Base" },
    { id: "c7", title: "Willie Mays", type: "Baseball", category: "Sport", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=Mays", owned: false, set: "1954 Topps", subset: "Variation A" },
    { id: "c5", title: "Babe Ruth", type: "Baseball", category: "Sport", rarity: "Legend", image: "https://via.placeholder.com/240x320?text=Clutch", owned: true, set: "1954 Topps", subset: "Variation A" },
    { id: "c21", title: "Jackie Robinson", type: "Baseball", category: "Sport", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=Robinson", owned: false, set: "1954 Topps", subset: "Base" },
    { id: "c22", title: "Stan The Man Musial", type: "Baseball", category: "Sport", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=Musial", owned: true, set: "1970 Topps", subset: "Base" },

    // Soccer
    { id: "c3", title: "Ronaldo", type: "Soccer", category: "Sport", rarity: "Common", image: "https://via.placeholder.com/240x320?text=Raptors", owned: false, set: "2022 Panini Adrenalyn", subset: "Base" },
    { id: "c4", title: "Messi", type: "Soccer", category: "Sport", rarity: "Uncommon", image: "https://via.placeholder.com/240x320?text=Bombers", owned: true, set: "2022 Panini Adrenalyn", subset: "Base" },
    { id: "c6", title: "Neymar", type: "Soccer", category: "Sport", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=Eagles", owned: false, set: "2022 Panini Adrenalyn", subset: "Shiny" },
    { id: "c23", title: "Mbappé", type: "Soccer", category: "Sport", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=Mbappe", owned: true, set: "2023 Panini Prizm", subset: "Base" },
    { id: "c24", title: "Haaland", type: "Soccer", category: "Sport", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=Haaland", owned: true, set: "2023 Panini Prizm", subset: "Shiny" },
    { id: "c25", title: "Vinicius Jr", type: "Soccer", category: "Sport", rarity: "Uncommon", image: "https://via.placeholder.com/240x320?text=ViniJr", owned: false, set: "2023 Panini Prizm", subset: "Base" },

    // Basketball
    { id: "c26", title: "Michael Jordan", type: "Basketball", category: "Sport", rarity: "Legend", image: "https://via.placeholder.com/240x320?text=Jordan", owned: true, set: "1986 Fleer", subset: "Base" },
    { id: "c27", title: "LeBron James", type: "Basketball", category: "Sport", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=LeBron", owned: true, set: "2021 Panini Mosaic", subset: "Base" },
    { id: "c28", title: "Luka Doncic", type: "Basketball", category: "Sport", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=Luka", owned: false, set: "2021 Panini Mosaic", subset: "Gold" },

    // ===== COLLECTIBLES CARD GAMES =====
    // Pokémon
    { id: "p1", title: "Pikachu", type: "Pokémon", category: "CCG", rarity: "Common", image: "https://via.placeholder.com/240x320?text=Pikachu", owned: true, set: "Base Set", subset: "Holo" },
    { id: "p2", title: "Charizard", type: "Pokémon", category: "CCG", rarity: "Legend", image: "https://via.placeholder.com/240x320?text=Charizard", owned: false, set: "Base Set", subset: "Holo" },
    { id: "p3", title: "Blastoise", type: "Pokémon", category: "CCG", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=Blastoise", owned: true, set: "Base Set", subset: "Non-Holo" },
    { id: "p4", title: "Venusaur", type: "Pokémon", category: "CCG", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=Venusaur", owned: true, set: "Jungle", subset: "Holo" },
    { id: "p5", title: "Mewtwo", type: "Pokémon", category: "CCG", rarity: "Legend", image: "https://via.placeholder.com/240x320?text=Mewtwo", owned: false, set: "Base Set", subset: "Holo" },
    { id: "p6", title: "Dragonite", type: "Pokémon", category: "CCG", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=Dragonite", owned: true, set: "Fossil", subset: "Holo" },

    // Magic: The Gathering
    { id: "m1", title: "Black Lotus", type: "MTG", category: "CCG", rarity: "Legend", image: "https://via.placeholder.com/240x320?text=BlackLotus", owned: false, set: "Limited Edition Alpha", subset: "Base" },
    { id: "m2", title: "Lightning Bolt", type: "MTG", category: "CCG", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=LightningBolt", owned: true, set: "Limited Edition Beta", subset: "Base" },
    { id: "m3", title: "Mox Sapphire", type: "MTG", category: "CCG", rarity: "Legend", image: "https://via.placeholder.com/240x320?text=MoxSapphire", owned: false, set: "Limited Edition Alpha", subset: "Base" },

    // Yu-Gi-Oh!
    { id: "y1", title: "Blue-Eyes White Dragon", type: "Yu-Gi-Oh!", category: "CCG", rarity: "Legend", image: "https://via.placeholder.com/240x320?text=BlueEyes", owned: true, set: "Legend of Blue Eyes", subset: "1st Edition" },
    { id: "y2", title: "Dark Magician", type: "Yu-Gi-Oh!", category: "CCG", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=DarkMagician", owned: true, set: "Legend of Blue Eyes", subset: "Unlimited" },
    { id: "y3", title: "Red-Eyes Black Dragon", type: "Yu-Gi-Oh!", category: "CCG", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=RedEyes", owned: false, set: "Metal Raiders", subset: "Unlimited" },

    // ===== NON-SPORT CARDS =====
    // Movie/TV
    { id: "n1", title: "Star Wars: Luke Skywalker", type: "Movie/TV", category: "Non-Sport", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=Luke", owned: true, set: "1977 Star Wars", subset: "Base" },
    { id: "n2", title: "Star Wars: Darth Vader", type: "Movie/TV", category: "Non-Sport", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=DarthVader", owned: true, set: "1977 Star Wars", subset: "Base" },
    { id: "n3", title: "Marvel: Spider-Man", type: "Movie/TV", category: "Non-Sport", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=Spiderman", owned: false, set: "2020 Marvel", subset: "Holo" },

    // Rock/Pop Music
    { id: "n4", title: "The Beatles", type: "Music", category: "Non-Sport", rarity: "Epic", image: "https://via.placeholder.com/240x320?text=Beatles", owned: true, set: "1964 Music Cards", subset: "Base" },
    { id: "n5", title: "Elvis Presley", type: "Music", category: "Non-Sport", rarity: "Rare", image: "https://via.placeholder.com/240x320?text=Elvis", owned: false, set: "1956 Music Cards", subset: "Base" },
  ];

  // Group by category -> type -> set -> cards
  const categoryData = {};
  cards.forEach((card) => {
    const cat = card.category;
    const typ = card.type;
    const st = card.set;

    if (!categoryData[cat]) categoryData[cat] = {};
    if (!categoryData[cat][typ]) categoryData[cat][typ] = {};
    if (!categoryData[cat][typ][st]) categoryData[cat][typ][st] = [];
    categoryData[cat][typ][st].push(card);
  });

  const categoryNames = Object.keys(categoryData).sort();

  const toggleCategory = (category) => {
    setExpandedCategories((s) => ({ ...s, [category]: !s[category] }));
  };

  const toggleType = (category, type) => {
    const key = `${category}||${type}`;
    setExpandedTypes((s) => ({ ...s, [key]: !s[key] }));
  };

  const toggleSet = (category, type, setName) => {
    const key = `${category}||${type}||${setName}`;
    setExpandedSets((s) => ({ ...s, [key]: !s[key] }));
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.collectionCard} onPress={() => alert(`Open ${item.title}`)}>
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

  const renderSet = (category, type, setName) => {
    const setCards = categoryData[category][type][setName];
    const key = `${category}||${type}||${setName}`;
    const expanded = !!expandedSets[key];

    // subsets within this set
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
        <TouchableOpacity onPress={() => toggleSet(category, type, setName)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
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
            {/* subset selector buttons */}
            {subsetOptions.length > 1 && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 6, marginLeft: 8 }}>
                {subsetOptions.map((s) => (
                  <TouchableOpacity key={s} onPress={() => setSubsetSelection((st) => ({ ...st, [key]: s }))} style={{ marginRight: 6, marginBottom: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, backgroundColor: selectedSubset === s ? '#f16513ff' : '#e8e8e8' }}>
                    <Text style={{ color: selectedSubset === s ? '#fff' : '#333', fontSize: 11, fontWeight: '600' }}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Owned */}
            {owned.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 6, marginLeft: 8 }}>In Set ({owned.length})</Text>
                <FlatList data={owned} keyExtractor={(i) => i.id} renderItem={renderCard} numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }} scrollEnabled={false} />
              </View>
            )}

            {/* Missing */}
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

  const renderType = (category, type) => {
    const typeKey = `${category}||${type}`;
    const expanded = !!expandedTypes[typeKey];
    const typeSets = categoryData[category][type];
    const setNames = Object.keys(typeSets).sort();

    return (
      <View key={typeKey} style={{ marginTop: 8, marginLeft: 8 }}>
        <TouchableOpacity onPress={() => toggleType(category, type)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6, paddingHorizontal: 6 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#333' }}>{type}</Text>
          <Text style={{ color: '#666', fontSize: 12 }}>{expanded ? '▾' : '▸'}</Text>
        </TouchableOpacity>

        {expanded && (
          <View>
            {setNames.map((setName) => renderSet(category, type, setName))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>My Collection</Text>
        <TouchableOpacity onPress={() => alert('Sort options')}>
          <Ionicons name="filter-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.collectionFilters}>
        {filters.map((f) => (
          <TouchableOpacity key={f} style={[styles.filterButton, activeFilter === f && styles.filterButtonActive]} onPress={() => setActiveFilter(f)}>
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {categoryNames.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{ color: '#777' }}>No cards found.</Text>
        </View>
      ) : (
        categoryNames.map((category) => (
          <View key={category} style={{ marginTop: 12 }}>
            <TouchableOpacity onPress={() => toggleCategory(category)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 10, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color: '#000' }}>{category}</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>{expandedCategories[category] ? '▾' : '▸'}</Text>
            </TouchableOpacity>

            {expandedCategories[category] && (
              <View>
                {Object.keys(categoryData[category]).sort().map((type) => renderType(category, type))}
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const SettingsScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState(user?.name || "User Name");
  const [email, setEmail] = useState(user?.email || "user@example.com");

  const handleSave = () => {
    if (user) {
      setUser({ ...user, name: username, email });
      Alert.alert("Saved", "Your settings have been saved.");
    } else {
      Alert.alert("Not signed in", "Please sign in to save account settings.");
    }
  };

  const handleLogout = () => {
    if (!user) {
      Alert.alert("Not signed in", "You're not signed in.");
      return;
    }
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => { setUser(null); Alert.alert("Logged out"); } },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.profileSection}>
        <Image source={{ uri: user?.avatar || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }} style={styles.profilePicLarge} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.cardTitle}>{username}</Text>
          <Text style={{ color: "#666", marginTop: 4 }}>{email}</Text>
          <TouchableOpacity onPress={() => Alert.alert("Edit profile")} style={{ marginTop: 8 }}>
            <Text style={{ color: "#f16513ff" }}>Edit profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Push Notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Display name" />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
      </View>

      <View style={{ padding: 10 }}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={{ color: "#f16513ff", fontWeight: "600" }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// ---------- App Navigation ----------
export default function App() {
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const openLogin = () => setLoginVisible(true);
  const closeLogin = () => setLoginVisible(false);

  return (
    <AuthContext.Provider value={{ user, setUser, openLogin, closeLogin }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: '#f16513ff',
              borderTopColor: 'transparent', // removes line
            },
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") iconName = "home-outline";
              else if (route.name === "Search") iconName = "search-outline";
              else if (route.name === "Collection") iconName = "albums-outline";
              else if (route.name === "Settings") iconName = "settings-outline";

              return <Ionicons name={iconName} size={size} color="white" />;
            },
            headerShown: false,
            listeners: ({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault();
                openLogin();
              },
            }),
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Collection" component={CollectionScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      {/* Full-screen overlay when not logged in */}
      {!user && (
        <TouchableOpacity 
          activeOpacity={1}
          onPress={openLogin}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            zIndex: 10,
          }}
        />
      )}

      {/* Login modal rendered at root so it overlays the app */}
      <LoginModal visible={loginVisible} onClose={closeLogin} />
    </AuthContext.Provider>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FAFAFA",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardContainer: {
    flexDirection: 'row', 
    alignItems: "left",
    marginBottom: 20,
    backgroundColor: "#ffffffff",
    borderRadius: 10,
  },
  cardInfoContainer: {
    
    flexDirection: 'column', 
    alignItems: "left",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: "AdventPro-Medium",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cardImage: {
    width: 141,
    height: 200,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
  },
   verticalLine: {
    display: 'inline-block',
    width: 1.5, // Thickness of the line
    height: '95%', // Makes the line span the full height of its parent
    backgroundColor: 'black', // Color of the line
    marginTop: "2.5%",
    marginLeft: 15,
  },
  pollContainer: {
    marginTop: 10,
  },
  pollQuestion: {
    fontSize: 16,
    marginBottom: 10,
  },
  pollOption: {
    padding: 10,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    marginVertical: 5,
  },
  /* Search screen styles */
  searchBar: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  tabButtonActive: {
    backgroundColor: "#f16513ff",
  },
  tabText: {
    color: "#333",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  cardItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    marginHorizontal: 6,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    elevation: 1,
  },
  cardThumb: {
    width: 72,
    height: 108,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  /* Home improvements */
  hero: {
    height: 220,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  heroContent: {
    padding: 16,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  heroSubtitle: {
    color: "#fff",
    marginTop: 6,
    fontSize: 13,
  },
  ctaButton: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  ctaText: {
    color: "#fff",
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
    marginBottom: 8,
  },
  featuredItem: {
    width: 140,
    marginRight: 12,
  },
  featuredThumb: {
    width: 140,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  featuredMeta: {
    padding: 8,
  },
  featuredTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  featuredSubtitle: {
    color: "#fff",
    fontSize: 11,
    opacity: 0.9,
    marginTop: 4,
  },
  /* Settings screen styles */
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
  },
  profilePicLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eee",
  },
  section: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 15,
  },
  input: {
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 6,
  },
  saveButton: {
    backgroundColor: "#f16513ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  /* Collection styles */
  collectionFilters: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#f2f2f2',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#f16513ff',
  },
  filterText: {
    color: '#333',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  collectionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 1,
  },
  collectionImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#eee',
  },
  collectionInfo: {
    padding: 8,
  },
  collectionName: {
    fontSize: 14,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#eee',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '700',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
});
