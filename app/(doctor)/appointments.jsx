import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { getAppointments } from "../../services/doctorServices";
import useUserType from "../../context/UserProvider";
import useDoctor from "../../context/DoctorProvider";

const Appointments = () => {
  const { user } = useUserType();
  const [isvisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState();
  const [error, setError] = useState("");
  const { doctorId } = useDoctor();
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {}
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAppointments(doctorId);
      console.log(response);
      setAppointments(response);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable To fetch Appointments");
    }
  };

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
            <Text className="text-xl font-psemibold py-2">Appointments</Text>
            {appointments.length ? appointments.map((item, idx) => (
              <View className="my-1 py-1 bg-gray-50" key={idx}>
                <Text>
                  <Text className="font-bold">Paitent Name: </Text>
                  {item.patientId.name}
                </Text>
                <Text>
                  <Text className="font-bold">Appointment Date:</Text>{" "}
                  {item.date}
                </Text>
                <Text>
                  <Text className="font-bold">Stot: </Text>
                  {item.timeslot}
                </Text>
                <Button title="Send OTP" onPress={() => sendOTP(item)} />
              </View>
            )) : 
            <Text className="text-center text-2xl">No Appointments</Text>}
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

export default Appointments;
