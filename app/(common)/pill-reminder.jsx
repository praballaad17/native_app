import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PushNotification from "react-native-push-notification"; // For bare React Native

const DailyReminder = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const setReminder = () => {
    const reminderTime = new Date();
    reminderTime.setHours(date.getHours());
    reminderTime.setMinutes(date.getMinutes());

    // Schedule the notification
    PushNotification.localNotificationSchedule({
      message: "Your daily reminder!", // Reminder message
      date: reminderTime, // Date and time for the reminder
      repeatType: "day", // Repeat every day
    });

    Alert.alert(
      "Reminder Set",
      `Daily reminder set for ${date.toLocaleTimeString()}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Daily Reminder</Text>

      <View style={styles.timePickerContainer}>
        <Text style={styles.label}>Select Time:</Text>
        <Button title="Pick Time" onPress={() => setShowPicker(true)} />

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Text style={styles.timeText}>
          Selected Time: {date.toLocaleTimeString()}
        </Text>
      </View>

      <Button title="Set Reminder" onPress={setReminder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  timePickerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 18,
    marginTop: 10,
    color: "#666",
  },
});

export default DailyReminder;
