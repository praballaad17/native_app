import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabIcno = (icon, color, focused) => {
  return (
    <View>
      <Image source={icon} />
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="doctor-home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={24} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={24} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="patient"
        options={{
          tabBarLabel: "Patient",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="health-and-safety"
              size={24}
              color={color}
              // focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
