import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import the date picker component

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { DATEOPTIONS } from "../../constants";

const PersonalDetails = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    experience: "",
    education: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    institute: "",
    grade: "",
    from: new Date(),
    till: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState({
    from: false,
    till: false,
  });

  const submit = () => {
    //
    router.push("/photo-upload");
  };

  const addEducation = () => {
    const { institute, grade, from, till } = currentEducation;
    if (institute && grade && from && till) {
      setForm({
        ...form,
        education: [...form.education, { institute, grade, from, till }],
      });

      setCurrentEducation({
        institute: "",
        grade: "",
        from: new Date(),
        till: new Date(),
      });
    }
  };

  const removeEducation = (index) => {
    setForm({
      ...form,
      education: form.education.filter((_, idx) => idx !== index),
    });
  };

  const onDateChange = (event, selectedDate, field) => {
    setCurrentEducation({
      ...currentEducation,
      [field]: selectedDate,
    });
    setShowDatePicker({ ...showDatePicker, [field]: false });
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className=" h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="text-2xl text-semibold mt-10 font-psemibold">
              Some Personal Details
            </Text>
            <FormField
              title="Name"
              value={form.name}
              placeholder={"Name"}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyle="mt-7"
              //   keyboardType="email-address"
            />

            <FormField
              title="Address"
              value={form.password}
              placeholder={"Address"}
              handleChangeText={(e) => setForm({ ...form, address: e })}
              otherStyle="mt-7"
            />

            {/* Education */}
            <Text style={styles.label}>Education</Text>
            <TextInput
              style={styles.input}
              placeholder="Institute Name"
              value={currentEducation.institute}
              onChangeText={(e) =>
                setCurrentEducation({ ...currentEducation, institute: e })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Grade"
              value={currentEducation.grade}
              onChangeText={(e) =>
                setCurrentEducation({ ...currentEducation, grade: e })
              }
            />
            <View className="flex-row justify-between my-2 items-center">
              <Text className="border border-black-100 flex-1 py-2 px-4 mr-3">
                {currentEducation.from
                  ? currentEducation.from.toLocaleDateString(
                      "en-US",
                      DATEOPTIONS
                    )
                  : "Select Date"}
              </Text>
              <Button
                title="From Date"
                onPress={() =>
                  setShowDatePicker({ ...showDatePicker, from: true })
                }
              />
            </View>
            {showDatePicker.from && (
              <DateTimePicker
                value={currentEducation.from}
                mode="date"
                display="default"
                onChange={(e, selectedDate) =>
                  onDateChange(e, selectedDate, "from")
                }
              />
            )}
            <View className="flex-row justify-between my-2 items-center">
              <Text className="border border-black-100 flex-1 py-2 px-4 mr-3">
                {currentEducation.till
                  ? currentEducation.till.toLocaleDateString(
                      "en-US",
                      DATEOPTIONS
                    )
                  : "Select Date"}
              </Text>
              <Button
                title="Till Date"
                onPress={() =>
                  setShowDatePicker({ ...showDatePicker, till: true })
                }
              />
            </View>

            {showDatePicker.till && (
              <DateTimePicker
                value={currentEducation.till}
                mode="date"
                display="default"
                onChange={(e, selectedDate) =>
                  onDateChange(e, selectedDate, "till")
                }
              />
            )}
            <Button title="Add Education" onPress={addEducation} />
            <View style={styles.skillsContainer}>
              {form.education.map((edu, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.rectangleBox}
                  onPress={() => removeEducation(index)}
                >
                  <View className="flex-row justify-between">
                    <Text className="text-lg font-bold">{edu.institute}</Text>
                    <Text className="text-lg font-bold">✕</Text>
                  </View>
                  <Text className="text-sm"> {edu.grade}</Text>
                  <Text>
                    {edu.from.toLocaleDateString("en-US", DATEOPTIONS)} -{" "}
                    {edu.till.toLocaleDateString("en-US", DATEOPTIONS)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <CustomButton
              title={"Proceed"}
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className=" justify-center pt-5 flex-row gap-2"></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  skillsInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 20,
  },
  skillBadge: {
    backgroundColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    fontSize: 16,
  },
  rectangleBox: {
    backgroundColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
  },
  rectangleText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "green",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  experienceContainer: {
    marginTop: 10,
  },
  experienceBox: {
    backgroundColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
  },
  experienceText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default PersonalDetails;
