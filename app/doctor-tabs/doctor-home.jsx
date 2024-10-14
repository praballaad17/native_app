import { View, Text } from "react-native";
import React from "react";
import GetVarifiedNotification from "../(doctor)/get-varified-notification";
import NavigationHeader from "../../components/NavigationHeader";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DoctorHome = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <NavigationHeader />
            <GetVarifiedNotification />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default DoctorHome;
