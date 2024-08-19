import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const TabIcno = (icon, color, focused) => {
  return (
    <View>
      <Image source={icon} />
    </View>
  );
};

const PatientTabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="patient-home"
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
        name="consult"
        options={{
          headerShown: false,
          tabBarLabel: "Consult",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user-doctor" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="documents"
        options={{
          tabBarLabel: "Documents",
          tabBarIcon: ({ color }) => (
            <Ionicons name="documents" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default PatientTabLayout;
