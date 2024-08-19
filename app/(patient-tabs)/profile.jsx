import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function profile() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text>documents</Text>
            <TouchableOpacity
              onPress={() => router.push("/patient-consultations")}
              className="w-full flex flex-row justify-between"
            >
              <View className="flex flex-row">
                <FontAwesome name="stethoscope" size={24} color="black" />
                <Text className="font-psemibold mx-2">My consultations</Text>
              </View>
              <FontAwesome name="angle-right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/photo-upload")}
              className="w-full flex flex-row justify-between"
            >
              <View className="flex flex-row">
                <FontAwesome name="stethoscope" size={24} color="black" />
                <Text className="font-psemibold mx-2">My Lab Tests</Text>
              </View>
              <FontAwesome name="angle-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
