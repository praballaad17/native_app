import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Modal } from "react-native";
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
  const [isvisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState(0);
  const [error, setError] = useState("");

  const dropdownOptions = [
    { label: "select", value: "select" },
    { label: "male", value: "male" },
    { label: "female", value: "female" },
    { label: "other", value: "other" },
  ];

  const handleSubmit = () => {
    console.log("otp is send");
    sendOTP("item");
   

    const patientData = {
      name,
      age,
      contact,
      isActive: true, // Default patient is active when created
    };
    // onSubmit(patientData);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const sendOTP = (item) => {
    console.log("send otp is send");
    setIsVisible(true);
    // setSelectedPatient(item);
  };

  const verify = () => {
    //
    if (otp === "1234" || otp === 1234) {
      setIsVisible(false);
      // handlePress();
    } else {
      setError("OTP is not correct, re-enter");
    }
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
                title="Submitt"
                containerStyles="mt-4 border-slate-300  min-h-[42px]"
                textStyles=" text-sm"
                onPress={handleSubmit}
              />

<Modal
            className="bg-gray-100"
            animationType="slide"
            transparent={true}
            visible={isvisible}
            onRequestClose={() => {
              setIsVisible(false);
            }}
          >
            <View
              // className="bg-white"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                className="bg-gray-200"
                style={{
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                <Text>
                  Enter the OTP, recieved on Patient's registered mobile number.
                </Text>
                <TextInput
                  className="border border-slate-300 my-2 px-3"
                  keyboardType="numeric"
                  maxLength={6}
                  autoCorrect={false}
                  autoFocus={true}
                  value={otp}
                  onChangeText={setOtp}
                  onSubmitEditing={verify}
                  placeholder="Enter OTP"
                />
                {error.length !== 0 && (
                  <Text className="text-red-600 ">{error}</Text>
                )}
                <View className="flex-row justify-around">
                  <Button
                    className=" bg-secondary-100"
                    title="Verify"
                    onPress={verify}
                  />
                  <Button
                    className="px-4 mx-2"
                    title="close"
                    onPress={() => setIsVisible(false)}
                  />
                </View>
              </View>
            </View>
          </Modal>
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
