import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import CustomButton from "../../components/CustomButton";

export default function profile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const primaryTabs = [
    {
      name: "Payouts",
      icon: <FontAwesome name="stethoscope" size={24} color="black" />,
      url: "/payouts",
    },
    {
      name: "My Lab Tests",
      icon: <Fontisto name="test-tube" size={24} color="black" />,
      url: "/apointments",
    },
    {
      name: "Membership Plan",
      icon: <Fontisto name="test-tube" size={24} color="black" />,
      url: "/apointments",
    },
    {
      name: "Manage payments methods",
      icon: <FontAwesome5 name="credit-card" size={24} color="black" />,
      url: "/apointments",
    },
    {
      name: "Pill Reminder",
      icon: <FontAwesome5 name="pills" size={24} color="black" />,
      url: "/apointments",
    },
    {
      name: "Refer and earn",
      icon: <FontAwesome name="share" size={24} color="black" />,
      url: "/apointments",
    },
  ];
  const secondaryTabs = ["Need help?", "Settings", "About us"];

  const logout = () => {
    //
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6 bg-gray-50">
            {primaryTabs.map((item, index) => ( 
              <TouchableOpacity
                onPress={() => router.push(item.url)}
                className="w-full flex flex-row justify-between my-3"
                key={index}
              >
                <View className="flex flex-row">
                  {item.icon}
                  <Text className="font-psemibold mx-2">{item.name}</Text>
                </View>
                <FontAwesome name="angle-right" size={20} color="black" />
              </TouchableOpacity>
            ))}
          </View>

          <View className="w-full justify-center h-100 px-4 my-5px bg-gray-50">
            {secondaryTabs.map((item, idx) => (
              <TouchableOpacity
                onPress={() => router.push("/patient-consultations")}
                className="w-full flex flex-row justify-between my-3"
                key={idx}
              >
                <View className="flex flex-row">
                  <FontAwesome name="stethoscope" size={24} color="black" />
                  <Text className="font-psemibold mx-2">{item}</Text>
                </View>
                <FontAwesome name="angle-right" size={20} color="black" />
              </TouchableOpacity>
            ))}
            <CustomButton
              title={"Sign out"}
              handlePress={logout}
              containerStyles="mt-4 bg-white border border-slate-300  min-h-[42px]"
              textStyles="text-orange-600 text-sm"
              isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
