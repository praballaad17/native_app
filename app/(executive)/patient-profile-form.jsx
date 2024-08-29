import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import CustomDropdownSelect from "../../components/CustomDropDownSelect";

const PatientProfileForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValue, setSelectedValue] = useState();

  const dropdownOptions = [
    { label: "select", value: "select" },
    { label: "male", value: "male" },
    { label: "female", value: "female" },
    { label: "other", value: "other" },
  ];

  const handleSubmit = () => {
    const patientData = {
      name,
      age,
      contact,
      isActive: true, // Default patient is active when created
    };
    onSubmit(patientData);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full min-h-[85vh] px-4 my-6">
            <Text className="text-2xl my-3 font-bold">
              Patient Profile Form
            </Text>

            <View className="w-full px-4 py-7 rounded-lg justify-center bg-white">
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Contact"
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
              />

              <CustomDropdownSelect
                options={dropdownOptions}
                placeholder="select gender"
                onSelect={handleSelect}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />

              <CustomButton
                title="Submit"
                containerStyles="mt-4 border-slate-300  min-h-[42px]"
                textStyles=" text-sm"
                onPress={handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default PatientProfileForm;
