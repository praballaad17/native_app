import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import your existing User1Layout
import User1Layout from "../app/(patient-tabs)/_layout";

// Placeholder components for User2 and User3 layouts
const User2Home = () => <Text>User 2 Home</Text>;
const User2Profile = () => <Text>User 2 Profile</Text>;

const User3Dashboard = () => <Text>User 3 Dashboard</Text>;
const User3Settings = () => <Text>User 3 Settings</Text>;
const User3Notifications = () => <Text>User 3 Notifications</Text>;

const Tab = createBottomTabNavigator();

const User2Layout = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={User2Home} />
    <Tab.Screen name="Profile" component={User2Profile} />
  </Tab.Navigator>
);

const User3Layout = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={User3Dashboard} />
    <Tab.Screen name="Settings" component={User3Settings} />
    <Tab.Screen name="Notifications" component={User3Notifications} />
  </Tab.Navigator>
);

const UserSwitcher = () => {
  const [currentUser, setCurrentUser] = useState("user1");

  const renderContent = () => {
    switch (currentUser) {
      case "user1":
        return <User1Layout />;
      case "user2":
        return <User2Layout />;
      case "user3":
        return <User3Layout />;
      default:
        return null;
    }
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.userSwitcher}>
          <TouchableOpacity
            style={[
              styles.button,
              currentUser === "user1" && styles.activeButton,
            ]}
            onPress={() => setCurrentUser("user1")}
          >
            <Text>User 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              currentUser === "user2" && styles.activeButton,
            ]}
            onPress={() => setCurrentUser("user2")}
          >
            <Text>User 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              currentUser === "user3" && styles.activeButton,
            ]}
            onPress={() => setCurrentUser("user3")}
          >
            <Text>User 3</Text>
          </TouchableOpacity>
        </View>
        {renderContent()}
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userSwitcher: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeButton: {
    backgroundColor: "#e0e0e0",
  },
});

export default UserSwitcher;
