import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import CustomButton from "./CustomButton";
import { timeSlots } from "../constants/payload";
import { checkAppointment } from "../services/patientServices";

const filterSlot = (slots, isToday) => {
  if(isToday) {
  const currentTime = new Date().getTime();
  console.log("currentTime: ", currentTime);
  return slots
    .map(slot => slot.timeslot)
    .filter(slot => {
        const [hours, minutes] = slot.split(":").map(Number);
        const slotTime = new Date();
        slotTime.setHours(hours, minutes, 0, 0);
        console.log("slotTime: ", slotTime);
        return slotTime.getTime() > currentTime;
    });
  } else {
    return slots.map(slot => slot.timeslot);
  }
};

const TimeSlot = ({ selectedSlot, setSelectedSlot, selectedDate, clearDate, doctorId }) => {
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const getter = async () => {
      const fetchedSlots = await checkAppointment(doctorId, selectedDate);
      const isToday = new Date(selectedDate).toDateString() === new Date().toDateString();
      console.log("isToday: ", isToday);
      const transformedSlots = filterSlot(fetchedSlots, isToday);
      setBookedSlots(transformedSlots);
    };

    getter();
  }, [doctorId, selectedDate]);
 
  const handleSlotPress = (slot) => {
    if (!bookedSlots.includes(slot)) {
      setSelectedSlot(slot);
      Alert.alert(`Selected Time Slot`, `You selected ${slot}`);
      // Perform other operations here, such as booking the slot or navigating
    } else {
      Alert.alert("Unavailable Slot", `The slot ${slot} is not available.`);
    }
  };


  return (
    <View style={styles.container}>
      <View className="flex-row justify-center space-x-6 mt-6">
      <Text  className="flex-row items-center bg-gray-300 p-3 rounded-lg text-black ml-2" >Date Selected : {selectedDate}</Text>
      <TouchableOpacity onPress={clearDate} className="flex-row items-center bg-red-500 p-3 rounded-lg">
          <Text className="text-white ml-2">Clear Date</Text>
        </TouchableOpacity>
        </View>
      <Text style={styles.title}>Select a Time Slot</Text>
      <View style={styles.slotContainer}>
      {timeSlots.map((slot) => (
        <TouchableOpacity
          key={slot}
          style={[
            styles.slot,
            selectedSlot === slot && styles.selectedSlot,
            bookedSlots.includes(slot) && styles.disabledSlot,
          ]}
          onPress={() => handleSlotPress(slot)}
          disabled={bookedSlots.includes(slot)}
        >
          <Text
            style={[
              styles.slotText,
              bookedSlots.includes(slot) && styles.disabledSlotText,
            ]}
          >
            {slot}
          </Text>
        </TouchableOpacity>
      ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  slot: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: 80,
  },
  selectedSlot: {
    backgroundColor: "#4CAF50",
  },
  slotText: {
    fontSize: 18,
    textAlign: "center",
  },
  disabledSlot: {
    backgroundColor: "#d3d3d3",
  },
  disabledSlotText: {
    color: "#a9a9a9",
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
    color: "blue",
    textAlign: "center",
  },
});

export default TimeSlot;
