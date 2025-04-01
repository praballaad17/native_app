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
import { useLocalSearchParams } from "expo-router";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getPatientProfile } from "../../services/comonService";
import { calculateAge } from "../../utils/utils";
import { FILETYPE, images } from "../../constants";
import { generateURLView } from "../../services/awsServices";

const ViewPatientProfile = ({ patientId }) => {
  const params = useLocalSearchParams();
  const [profile, setProfile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);

  const sepratePrescriptionAndMedicalRecords = (filelist) => {
    filelist.map((file) => {
      if (file.reportType === FILETYPE.PRESCRIPTION) {
        setPrescriptions((prev) => [...prev, file]);
      } else if (file.reportType === FILETYPE.MEDICALRECORD) {
        setMedicalRecords((prev) => [...prev, file]);
      }
    });
  };
  console.log("Patient ID: ", params);
  const fetchPatientProfile = async () => {
    try {
      const profile = await getPatientProfile(patientId);
      console.log("Profile: ", profile);
      setProfile(profile.patient);
      sepratePrescriptionAndMedicalRecords(profile.fileList);
      fetchPatientProfilePhoto(profile.patient.profilePhoto);
    } catch (err) {
      console.error("Error fetching patient profile:", err);
    }
  };

  const fetchPatientProfilePhoto = async (profilePhoto) => {
    try {
      const { url } = await generateURLView(profilePhoto);
      setProfilePhoto(url);
    } catch (error) {
      console.log("error getting profile image from s3: ", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    patientId = params?.patientId || patientId;

    fetchPatientProfile();
    setLoading(false);
  }, []);

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

  console.log("Profile: ", profile);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {profilePhoto && profilePhoto.length ? (
          <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
        ) : (
          <Image source={images.profile} style={styles.profileImage} />
        )}
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{profile?.name}</Text>
          <Text style={styles.profileInfo}>
            Age: {calculateAge(profile?.dob)}
          </Text>
          <Text style={styles.profileInfo}>Gender: {profile?.gender}</Text>
          <Text style={styles.profileInfo}>Height: {profile?.height} cm</Text>
          <Text style={styles.profileInfo}>Weight: {profile?.weight} kg</Text>
          <Text style={styles.profileInfo}>
            Blood Group: {profile?.bloodGrp}
          </Text>
          <Text style={styles.profileInfo}>Address: {profile?.address}</Text>
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
          ListEmptyComponent={<Text>No medical records available.</Text>}
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
          ListEmptyComponent={<Text>No prescriptions available.</Text>}
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
