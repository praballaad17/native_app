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
import { getAppointment } from "../../services/patientServices";
import usePatient from "../../context/PatientProvider";

const PatientConsultations = () => {
  const { patientId } = usePatient();
  const [isvisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState();
  const [error, setError] = useState("");
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAppointment(patientId);
      console.log(response);
      setAppointmentData(response);
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
            <Text className="text-xl font-psemibold py-2">
              My Consultations
            </Text>
            {appointmentData && appointmentData.length > 0 ? (
              appointmentData.map((item, idx) => (
                <View className="my-1 p-3 bg-gray-50" key={idx}>
                  <Text>
                    <Text className="font-bold">Doctor: </Text>
                    {item.doctorId.name}
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
              ))
            ) : (
              <Text>No Consultations</Text>
            )}
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

export default PatientConsultations;
