import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Button,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const PatientTab = () => {
  const [patients, setPatients] = useState(null);
  const [isActiveTab, setIsActiveTab] = useState(true);
  const [isvisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState(0);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  useEffect(() => {
    setPatients([
      { name: "John Doe", age: 32, contact: "123456789", isActive: true },
      { name: "Jane Smith", age: 45, contact: "987654321", isActive: false },
    ]);
  }, []);

  const addPatient = () => {
    router.push("/patient-profile-form");
    // setPatients([...patients, patientData]);
  };

  const activePatients = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Sam Williams" },
    { id: 4, name: "John Doe" },
    { id: 5, name: "Jane Smith" },
    { id: 6, name: "Sam Williams" },
    { id: 7, name: "John Doe" },
    { id: 8, name: "Jane Smith" },
    { id: 9, name: "Sam Williams" },
    { id: 10, name: "John Doe" },
    { id: 12, name: "Jane Smith" },
    { id: 13, name: "Sam Williams" },
  ];

  const inactivePatients = [
    { id: 14, name: "Emily Brown" },
    { id: 15, name: "Michael Davis" },
  ];

  const toggleTab = (tab) => {
    setIsActiveTab(tab === "active");
  };

  // Function to render each patient in the list
  const renderActivePatientItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/view-patient-profile",
          params: {
            patientId: item.id,
          },
        })
      }
      style={styles.patientItem}
    >
      <Text style={styles.patientName}>{item?.name}</Text>
    </TouchableOpacity>
  );

  // Function to render each patient in the list
  const renderInactivePatientItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => sendOTP(item?.id)}
      style={styles.patientItem}
    >
      <Text style={styles.patientName}>{item?.name}</Text>
    </TouchableOpacity>
  );

  const sendOTP = (patientId) => {
    setIsVisible(true);
    setSelectedPatient(patientId);
  };

  const verify = () => {
    if (otp === "1234" || otp === 1234) {
      setIsVisible(false);
      router.push({
        pathname: "/view-patient-profile",
        params: {
          patientId: selectedPatient,
        },
      });
      setOtp(0);
      setError("");
    } else {
      setError("OTP is not correct, re-enter");
    }
  };

  return (
    <View className="h-full w-full justify-center px-4 my-6">
      <Text className="text-2xl font-pbold mt-4 ">Patients</Text>
      <CustomButton
        title={"Add a Patient"}
        handlePress={addPatient}
        containerStyles="mt-7"
      />
      <View className="mt-3 rounded-lg" style={styles.container}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              isActiveTab ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => toggleTab("active")}
          >
            <Text
              style={[
                styles.tabText,
                isActiveTab ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              Active Patients
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              !isActiveTab ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => toggleTab("inactive")}
          >
            <Text
              style={[
                styles.tabText,
                !isActiveTab ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              Inactive Patients
            </Text>
          </TouchableOpacity>
        </View>

        {/* Patient List */}
        <FlatList
          data={isActiveTab ? activePatients : inactivePatients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={
            isActiveTab ? renderActivePatientItem : renderInactivePatientItem
          }
          style={styles.list}
        />
      </View>

      <Modal
        className="bg-gray-100"
        animationType="slide"
        transparent={true}
        visible={isvisible}
        onRequestClose={() => {
          setIsVisible(false);
          setOtp(0);
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
                onPress={() => {
                  setIsVisible(false);
                  setOtp(0);
                  setError("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activeTab: {
    backgroundColor: "#FFA500", // Orange for the selected tab
  },
  inactiveTab: {
    backgroundColor: "#f0f0f0", // Light gray for the non-selected tab
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff", // White text for the active tab
  },
  inactiveTabText: {
    color: "#000", // Black text for the inactive tab
  },
  list: {
    paddingHorizontal: 20,
  },
  patientItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  patientName: {
    fontSize: 16,
  },
});

export default PatientTab;
