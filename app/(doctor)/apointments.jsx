import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Apointments = () => {
  const appointmentData = [
    {
      patient: "John king",
      date: "24-08-2024",
      slot: "15:00",
    },
    {
      patient: "Jack King",
      date: "24-08-2024",
      slot: "12:00",
    },
    {
      patient: "Jill King",
      date: "24-08-2024",
      slot: "13:00",
    },
  ];

  const handlePress = () => {
    router.push({
      pathname: "/prescription",
      params: {
        appointmentId: 123,
      },
    });
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6 ">
            <Text>Apointments</Text>
            {appointmentData.map((item, idx) => (
              <TouchableOpacity
                onPress={handlePress}
                className="my-1 py-1 bg-gray-50"
                key={idx}
              >
                <Text>
                  <Text className="font-bold">Paitent Name: </Text>
                  {item.patient}
                </Text>
                <Text>
                  <Text className="font-bold">Appointment Date:</Text>{" "}
                  {item.date}
                </Text>
                <Text>
                  <Text className="font-bold">Stot: </Text>
                  {item.slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Apointments;
