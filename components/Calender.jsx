import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

const Calender = ({ selectedDate, setSelectedDate }) => {
  // Define the dates you want to disable
  const disabledDates = {
    "2024-08-20": { disabled: true, disableTouchEvent: true },
    "2024-08-21": { disabled: true, disableTouchEvent: true },
    "2024-09-15": { disabled: true, disableTouchEvent: true },
  };

  const currentDate = new Date().toISOString().split("T")[0];

  // Mark the selected date
  const markedDates = {
    ...disabledDates,
    [selectedDate]: { selected: true, marked: true, selectedColor: "blue" },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Appointment Date </Text>
      <Calendar
        // Initially visible month. Default = Date()
        current={currentDate}
        minDate={currentDate} // Disable dates before today
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={"2020-01-01"}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={"2030-12-31"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        // Disable month navigation arrows. Default = false
        disableArrowLeft={false}
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        // Mark selected date
        // markedDates={{
        //   [selectedDate]: {
        //     selected: true,
        //     marked: true,
        //     selectedColor: "blue",
        //   },
        // }}
        markedDates={markedDates}
      />
      {selectedDate ? (
        <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
    color: "blue",
  },
});

export default Calender;
