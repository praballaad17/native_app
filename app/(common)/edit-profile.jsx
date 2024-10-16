import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Entypo,
  Feather,
} from "@expo/vector-icons"; // Icons
import CustomDropdownSelect from "../../components/CustomDropDownSelect";
import { GENDEROPTIONS } from "../../constants";

const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const handleSave = () => {
    // Handle save action
    console.log("Profile updated");
  };

  const onDateChange = (event, selectedDate) => {
    setDob(selectedDate);
    setShowDate(false);
  };

  const options = { month: "short", day: "numeric", year: "numeric" };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={styles.container}>
          <View className="border-b py-4 mb-4 border-black-100">
            <Text className="text-2xl font-psemibold">
              Hi {name.length ? name : "there"}!
            </Text>
            <Text className="text-lg text-gray-600">Joined us Aug, 2024</Text>
          </View>
          <Text className="text-lg font-psemibold">Details</Text>
          {/* Mobile Number */}
          <View style={styles.inputRow}>
            <FontAwesome
              name="phone"
              size={24}
              color="gray"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          {/* Email Address */}
          <View style={styles.inputRow}>
            <MaterialIcons
              name="email"
              size={24}
              color="gray"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Home Address */}
          <View style={styles.inputRow}>
            <Ionicons name="home" size={24} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Home Address"
              value={homeAddress}
              onChangeText={setHomeAddress}
            />
          </View>

          {/* Gender */}
          <View style={styles.inputRow}>
            <FontAwesome
              name="venus-mars"
              size={24}
              color="gray"
              style={styles.icon}
            />
            <CustomDropdownSelect
              options={GENDEROPTIONS}
              placeholder="select gender"
              onSelect={(option) => setGender(option)}
              selectedValue={gender}
              setSelectedValue={setGender}
              containerStyles="absolute bottom-0 right-0"
              dropdownStyle=""
            />
          </View>

          {/* Date of Birth */}
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            style={styles.inputRow}
          >
            <Entypo
              name="calendar"
              size={24}
              color="gray"
              style={styles.icon}
            />
            <Text
              // className={`${dob.length ? "text-black-100" : "text-gray-300"}`}
              style={styles.input}
            >
              {dob
                ? dob.toLocaleDateString("en-US", options)
                : "Date of Birth (YYYY-MM-DD)"}
            </Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={(e, selectedDate) =>
                onDateChange(e, selectedDate, "Education", "From")
              }
            />
          )}

          {/* Save Button */}
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Feather name="save" size={24} color="white" />
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ProfileEdit;
