import { View, Text } from "react-native";
import { router } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { StatusBar } from "expo-status-bar";

const Role = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full flex-1 items-center justify-center bg-white">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Text className="text-3xl font-pblack">Choose your Role</Text>

            <CustomButton
              title="Patient"
              handlePress={() => router.push("/patient-details")}
              containerStyles="w-full mt-7"
            />
            <CustomButton
              title="Doctor"
              handlePress={() => router.push("/welcome")}
              containerStyles="w-full mt-7"
            />
            <CustomButton
              title="Executive"
              handlePress={() => router.push("/resume-upload")}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Role;
