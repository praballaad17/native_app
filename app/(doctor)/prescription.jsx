import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Prescription = () => {
  const params = useLocalSearchParams();
  const [form, setForm] = useState({
    syntoms: "",
  });

  const handleInputChange = (value) => {
    setForm({
      ...form, // Spread the current form values
      syntoms: value, // Update only the text field
    });
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6 ">
            <Text className="font-bold">Syntom Description:</Text>
            <TextInput
              className="border h-[100px] border-gray-400 px-2"
              placeholder="Type here..."
              value={form.syntoms}
              onChangeText={handleInputChange}
            />
            <Text className="font-bold">Medication:</Text>
            <TextInput
              className="border border-gray-400 px-2"
              placeholder="Type here..."
              value={form.syntoms}
              onChangeText={handleInputChange}
            />
            <Text className="font-bold">Doctors Remark:</Text>
            <TextInput
              className="border h-[100px] border-gray-400 px-2"
              placeholder="Type here..."
              value={form.syntoms}
              onChangeText={handleInputChange}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Prescription;
