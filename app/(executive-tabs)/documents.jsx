import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";

export default function explore() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="text-2xl my-4">Upload The Documents</Text>
            <View style={styles.container}>
              <View style={styles.row}>
                <Text className="text-lg font-bold" style={styles.text}>
                  Medical Records:
                </Text>
                <CustomButton
                  title={"Proceed"}
                  handlePress={() => router.push("/upload-medical")}
                  containerStyles="px-4 min-h-[40px] bg-white border border-secondary"
                  textStyles="text-secondary"
                  isLoading={isSubmitting}
                />
              </View>
              <View style={styles.row}>
                <Text className="text-lg font-bold" style={styles.text}>
                  Prescriptions:
                </Text>
                <CustomButton
                  title={"Proceed"}
                  handlePress={() => router.push("/upload-prescription")}
                  containerStyles="px-4 min-h-[40px] bg-white border border-secondary"
                  textStyles="text-secondary"
                  isLoading={isSubmitting}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    flex: 1,
  },
});
