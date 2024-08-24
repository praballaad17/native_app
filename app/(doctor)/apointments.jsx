import { View, Text, TouchableOpacity, Button, Modal } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Apointments = () => {
  const [isvisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState();
  const [error, setError] = useState("");
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
        appointmentId: selectedPatient,
      },
    });
  };

  const sendOTP = (item) => {
    setIsVisible(true);
    setSelectedPatient(item);
  };

  const verify = () => {
    //
    if (otp === "1234" || otp === 1234) {
      setIsVisible(false);
      handlePress();
    } else {
      setError("OTP is not correct, re-enter");
    }
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6 ">
            <Text className="text-xl font-psemibold py-2">Apointments</Text>
            {appointmentData.map((item, idx) => (
              <TouchableOpacity className="my-1 py-1 bg-gray-50" key={idx}>
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
                <Button title="Send OTP" onPress={() => sendOTP(item)} />
              </TouchableOpacity>
            ))}
          </View>

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
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Apointments;
