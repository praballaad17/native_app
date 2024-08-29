import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";

const NavigationHeader = () => {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <View className="bg-secondary rounded-xl p-2">
          <Ionicons name="location" size={24} color="white" />
        </View>
        <TouchableOpacity
          onPress={() => router.push("/location")}
          className="flex flex-row items-center ml-2"
        >
          <Text>Location</Text>
          <FontAwesome
            name="angle-down"
            size={25}
            color="black"
            className="ml-3"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/notification")}
        className="bg-secondary rounded-3xl p-2"
      >
        <Ionicons name="notifications" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationHeader;
