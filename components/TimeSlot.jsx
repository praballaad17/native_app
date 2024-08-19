import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const TimeSlot = ({ selectedSlot, setSelectedSlot, availableSlots }) => {
  // Generate time slots for the day (e.g., 08:00 AM to 08:00 PM)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8; // 08:00 AM
    const endHour = 20; // 08:00 PM

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSlotPress = (slot) => {
    if (availableSlots.includes(slot)) {
      setSelectedSlot(slot);
      Alert.alert(`Selected Time Slot`, `You selected ${slot}`);
      // Perform other operations here, such as booking the slot or navigating
    } else {
      Alert.alert("Unavailable Slot", `The slot ${slot} is not available.`);
    }
  };

  const renderItem = ({ item }) => {
    const isAvailable = availableSlots.includes(item);
    return (
      <TouchableOpacity
        style={[
          styles.slot,
          selectedSlot === item && styles.selectedSlot,
          !isAvailable && styles.disabledSlot,
        ]}
        onPress={() => handleSlotPress(item)}
        disabled={!isAvailable}
      >
        <Text
          style={[styles.slotText, !isAvailable && styles.disabledSlotText]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Time Slot</Text>
      <FlatList
        data={timeSlots}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        extraData={selectedSlot}
      />
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
  slot: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  selectedSlot: {
    backgroundColor: "#4CAF50",
  },
  slotText: {
    fontSize: 18,
    textAlign: "center",
  },
  selectedSlot: {
    backgroundColor: "#4CAF50",
  },
  disabledSlot: {
    backgroundColor: "#d3d3d3",
  },
  disabledSlotText: {
    color: "#a9a9a9",
  },
});

export default TimeSlot;
