import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { patientRegister } from "../../services/patientServices";
import CustomForm from "../../components/CustomForm";
import { GENDEROPTIONS, PATIENTFIELDS, USERS } from "../../constants";
import useUserType from "../../context/UserProvider";
import useFile from "../../context/FileProvider";
import Loader from "../../components/Loader";

const Details = () => {
  const { setUser } = useUserType();
  const { readData } = useFile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (formData) => {
    setIsSubmitting(true);
    try {
      const numberRes = await readData("number");
      console.log(numberRes);
      const res = await patientRegister({
        ...formData,
        contact: numberRes,
      });
      setIsSubmitting(false);
      console.log(res);
      Alert.alert("Form Submitted", "Your details have been submitted!");
      setUser(res);
      router.push("/");
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      Alert.alert(
        "Form Error",
        "Your details were not able to save! Please Try Later"
      );
    }
  };

  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="text-2xl text-semibold mt-10 font-psemibold">
              Just little one more step, for our true warrior
            </Text>

            <CustomForm fields={PATIENTFIELDS} onSubmit={submit} />
            <View className=" justify-center pt-5 flex-row gap-2"></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Details;
