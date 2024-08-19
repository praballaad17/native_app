import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function explore() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text>documents</Text>
            <View className="w-full flex flex-row">
              <FontAwesome name="stethoscope" size={24} color="black" />
              <Text>My consultations</Text>
              <FontAwesome name="angle-right" size={24} color="black" />
            </View>
            <View className="w-full flex flex-row">
              <Text>My Documents</Text>
              <FontAwesome name="angle-right" size={24} color="black" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
