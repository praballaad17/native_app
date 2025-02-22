import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import TimeSlot from "../../components/TimeSlot";
import Calender from "../../components/Calender";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import { postAppointment } from "../../services/patientServices";
import usePatient from "../../context/PatientProvider";

const Appointment = () => {
  const params = useLocalSearchParams();
  const { patientId } = usePatient();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const clearDate = () => {
    setSelectedDate("");
    setSelectedSlot(null);
  }


  const bookAppointment = () => {
    if (selectedDate && selectedSlot) {
      setIsSubmitting(true);
      // Perform the booking operation here
      let formdata = {
        date: selectedDate,
        timeslot: selectedSlot,
        doctorId: params.doctorId,
        patientId: patientId
      };
      postAppointment(formdata);
      Alert.alert("Booking Successful",`Appointment for ${selectedSlot} booked successfully!`,[
        {text: 'OK', onPress: () => router.push('/')},
      ]);
    } else {
      alert("Please select a date and time slot!");
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            {!selectedDate ? <Calender
              doctorId={params.doctorId}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            /> :
            <TimeSlot
              selectedSlot={selectedSlot}
              selectedDate={selectedDate}
              setSelectedSlot={setSelectedSlot}
              clearDate={clearDate}
              doctorId={params.doctorId}
            />
            }

            <CustomButton
              title={"Book The appointment"}
              handlePress={bookAppointment}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Appointment;
