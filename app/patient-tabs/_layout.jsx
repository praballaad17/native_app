import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StatusBar } from "expo-status-bar";

const PatientTabLayout = () => {
  return (
    <>
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
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome6
                name="user-doctor"
                size={24}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="documents"
          options={{
            headerShown: false,
            tabBarLabel: "Documents",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name="documents"
                size={24}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="home" size={24} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default PatientTabLayout;
