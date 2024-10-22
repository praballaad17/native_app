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
import { GENDEROPTIONS, USERS } from "../../constants";
import useUserType from "../../context/UserProvider";
import useFile from "../../context/FileProvider";
import Loader from "../../components/Loader";

const Details = () => {
  const { setUser } = useUserType();
  const { readData } = useFile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = [
    {
      label: "Name",
      key: "name",
      placeholder: "Enter Patient name",
      type: "text",
    },
    {
      label: "Height",
      key: "height",
      placeholder: "Enter Height",
      type: "number",
    },
    {
      label: "Weight",
      key: "weight",
      placeholder: "Enter Weight",
      type: "number",
    },
    {
      label: "Blood Group",
      key: "bloodGrp",
      placeholder: "Enter Blood Group",
      type: "text",
    },
    {
      label: "Gender",
      key: "gender",
      placeholder: "Select the gender",
      type: "dropdown",
      options: GENDEROPTIONS,
    },
    {
      label: "Date Of Birth",
      key: "dob",
      placeholder: "Select the date of Birth",
      type: "date",
    },
    {
      label: "address",
      key: "address",
      placeholder: "Enter Address",
      type: "text",
    },
  ];

  const submit = async (formData) => {
    setIsSubmitting(true);
    try {
      console.log(formData);
      const numberRes = await readData("number");
      console.log(numberRes);
      const res = await patientRegister({
        ...formData,
        contact: numberRes.number,
      });
      setIsSubmitting(false);
      Alert.alert("Form Submitted", "Your details have been submitted!");
      setUser({ ...res, type: USERS.PATIENT });
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

            <CustomForm fields={fields} onSubmit={submit} />

            {/* <FormField
              title="Name"
              value={form.name}
              placeholder={"Name"}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyle="mt-7"
            />

            <FormField
              title="Height"
              value={form.height}
              placeholder={"height"}
              handleChangeText={(e) => setForm({ ...form, height: e })}
              otherStyle="mt-7"
            />

            <FormField
              title="Blood Group"
              value={form.bloodGrp}
              placeholder={"blood group"}
              handleChangeText={(e) => setForm({ ...form, bloodGrp: e })}
              otherStyle="mt-7"
            />

            <FormField
              title="Date of Birth"
              value={form.dob}
              placeholder={"Date of Birth"}
              handleChangeText={(e) => setForm({ ...form, dob: e })}
              otherStyle="mt-7"
            />

            <FormField
              title="Weight"
              value={form.weight}
              placeholder={"Weight"}
              handleChangeText={(e) => setForm({ ...form, weight: e })}
              otherStyle="mt-7"
            />

            <FormField
              title="Gender"
              value={form.gender}
              placeholder={"Gender"}
              handleChangeText={(e) => setForm({ ...form, gender: e })}
              otherStyle="mt-7"
            />

            <CustomButton
              title={"Proceed"}
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            /> */}
            <View className=" justify-center pt-5 flex-row gap-2"></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Details;
