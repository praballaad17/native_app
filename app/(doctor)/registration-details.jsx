import { View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import useFile from "../../context/FileProvider";

export default RegistrationDetails = () => {
  const { writeData } = useFile();
  const [form, setForm] = useState({
    license: "",
    registration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(form);
    try {
      writeData("doctor-registration-from", form);
      Alert.alert("Form Saved", "Your details were save!");
      router.push("/photo-upload");
    } catch (error) {
      Alert.alert(
        "Form Failed",
        "Your details were unable to save! Please retry later"
      );
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className=" h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="text-2xl text-semibold mt-10 font-psemibold">
              Just little one more step, for our true warrior
            </Text>
            <FormField
              title="Resistration Number"
              value={form.registration}
              placeholder={"your resistration number"}
              handleChangeText={(e) => setForm({ ...form, registration: e })}
              otherStyle="mt-7"
              //   keyboardType="email-address"
            />

            <FormField
              title="License"
              value={form.license}
              placeholder={"your license number"}
              handleChangeText={(e) => setForm({ ...form, license: e })}
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
