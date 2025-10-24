import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// ---------- Top Bar ----------
const TopBar = ({ onProfilePress, onNotificationsPress }) => (
  <View style={styles.topBar}>
    <TouchableOpacity onPress={onNotificationsPress}>
      <Ionicons name="notifications-outline" size={28} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={onProfilePress}>
      <Image
        source={{ uri: "https://via.placeholder.com/40" }}
        style={styles.profilePic}
      />
    </TouchableOpacity>
  </View>
);

// ---------- Home Screen ----------
const HomeScreen = () => {
  const [pollOptions, setPollOptions] = useState([
    { id: "1", text: "Yes", votes: 0 },
    { id: "2", text: "No", votes: 0 },
  ]);

  const vote = (id) => {
    setPollOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
  };

  return (
    <View style={styles.container}>
      <TopBar
        onProfilePress={() => alert("Profile pressed")}
        onNotificationsPress={() => alert("Notifications pressed")}
      />

      {/* Card of the Day */}
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Card of the Day</Text>
        <Image
          source={{ uri: "https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-e8a0249654e68b957372daadeb86f8f6_67868fa2a16c2.jpg?1736871842" }}
          style={styles.cardImage}
        />
        <Text style={styles.cardText}>Ball buster</Text>
      </View>

      {/* Poll of the Day */}
      <View style={styles.pollContainer}>
        <Text style={styles.title}>Poll of the Day</Text>
        <Text style={styles.pollQuestion}>Do you like today's card?</Text>
        <FlatList
          data={pollOptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.pollOption}
              onPress={() => vote(item.id)}
            >
              <Text>{item.text} ({item.votes})</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

// ---------- Other Tabs ----------
const SearchScreen = () => (
  <View style={styles.center}>
    <Text>Search Cards</Text>
  </View>
);

const CollectionScreen = () => (
  <View style={styles.center}>
    <Text>My Collection</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.center}>
    <Text>Settings</Text>
  </View>
);

// ---------- App Navigation ----------
export default function App() {
  return (
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

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Collection" component={CollectionScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
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
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
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
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginVertical: 5,
  },
});
