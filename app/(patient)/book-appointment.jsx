import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import TimeSlot from "../../components/TimeSlot";
import Calender from "../../components/Calender";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";

const Appointment = () => {
  const params = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("test", params.doctorId);

  useEffect(() => {
    // Example data fetched from the server
    const fetchedSlots = ["08:00", "09:00", "10:30", "13:00", "15:00", "15:30"];
    setAvailableSlots(fetchedSlots);
  }, []);

  const submit = () => {
    //
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Calender
              doctorId={params.doctorId}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <TimeSlot
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              availableSlots={availableSlots}
            />

            <CustomButton
              title={"Book The appointment"}
              handlePress={submit}
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
