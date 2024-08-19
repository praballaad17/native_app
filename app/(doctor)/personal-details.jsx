import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const PersonalDetails = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    //
    router.push("/photo-upload");
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className=" h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="text-2xl text-semibold mt-10 font-psemibold">
              Some Personal Details
            </Text>
            <FormField
              title="Name"
              value={form.name}
              placeholder={"Name"}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyle="mt-7"
              //   keyboardType="email-address"
            />

            <FormField
              title="Address"
              value={form.password}
              placeholder={"Address"}
              handleChangeText={(e) => setForm({ ...form, address: e })}
              otherStyle="mt-7"
            />

            <CustomButton
              title={"Proceed"}
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className=" justify-center pt-5 flex-row gap-2"></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PersonalDetails;
