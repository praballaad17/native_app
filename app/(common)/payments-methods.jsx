import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PaymentsMethods = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full h-full px-4 my-6 items-center">
            <Text className="text-lg font-semibold mb-2">Payments Methods</Text>
            <Text className="text-base text-gray-600 mb-4">
              Here you can manage your payment methods.
            </Text>
            <Text className="font-bold text-red-500">Coming Soon</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PaymentsMethods;
