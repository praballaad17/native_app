import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";

const ViewPatientProfile = ({ patientId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProfile({
      name: "John Doe",
      age: 35,
      gender: "Male",
      contact: "+1 234 567 8901",
      address: "123, Baker Street, London asdfa sdfasdf",
      photo: "https://via.placeholder.com/100",
    });
    setLoading(false);
  }, []);

  // Example data
  const prescriptions = [
    { id: "1", name: "Prescription 1", date: "2024-09-13" },
    { id: "2", name: "Prescription 2", date: "2024-08-10" },
  ];

  const medicalRecords = [
    { id: "1", record: "Blood Test Report - 2024-09-01" },
    { id: "2", record: "X-ray Report - 2024-08-15" },
  ];

  const handleEditProfile = () => {
    // Navigate to profile edit screen
    // navigation.navigate("EditPatientProfile", { profile });
  };

  const handleViewPrescription = (prescription) => {
    // Navigate to prescription details
    // navigation.navigate("ViewPrescription", { prescription });
  };

  if (loading && profile == null) {
    return (
      <View>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: profile?.photo }} style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{profile?.name}</Text>
          <Text style={styles.profileInfo}>Age: {profile?.age}</Text>
          <Text style={styles.profileInfo}>Gender: {profile?.gender}</Text>
          <Text style={styles.profileInfo}>Contact: {profile?.contact}</Text>
          <Text style={styles.profileInfo}>Contact: {profile?.address}</Text>
          <Button title="Edit Profile" style={styles.editProfileButton} />
        </View>
      </View>

      {/* Medical Records Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Medical Records</Text>
        <FlatList
          data={medicalRecords}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.medicalRecordItem}>
              <Text>{item.record}</Text>
            </View>
          )}
        />
      </View>

      {/* Prescription List Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Prescription List</Text>
        <FlatList
          data={prescriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.prescriptionItem}>
              <View>
                <Text>{item.name}</Text>
                <Text style={styles.prescriptionDate}>Date: {item.date}</Text>
              </View>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => handleViewPrescription(item)}
                  style={styles.editButton}
                >
                  <Text style={styles.viewButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleViewPrescription(item)}
                  style={styles.viewButton}
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ViewPatientProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginVertical: 30,
    backgroundColor: "#f5f5f5",
  },
  profileContainer: {
    width: "auto",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileDetails: {
    justifyContent: "center",
    width: "100%",
    flexShrink: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileInfo: {
    fontSize: 16,
    marginTop: 4,
  },
  editProfileButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  medicalRecordItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  prescriptionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  prescriptionDate: {
    color: "#555",
  },
  viewButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  editButton: {
    backgroundColor: "gray",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  viewButtonText: {
    color: "#fff",
  },
});
