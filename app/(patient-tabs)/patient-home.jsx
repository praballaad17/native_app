import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const home = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <View className="flex flex-row items-center">
              <View className="bg-secondary rounded-xl p-1">
                <Ionicons name="location" size={24} color="white" />
              </View>
              <TouchableOpacity className="flex flex-row items-center ml-2">
                <Text>Location</Text>

                <FontAwesome
                  name="angle-down"
                  size={25}
                  color="black"
                  className="ml-2"
                />
              </TouchableOpacity>
            </View>
            <Text className="test-3xl text-green">Hello home!</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default home;
